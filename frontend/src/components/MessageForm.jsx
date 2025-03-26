import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { SendFill } from 'react-bootstrap-icons';
import { useAddMessageMutation } from '../api/messagesApi';
import { censorText } from '../utils/textFilter';
import { selectUsername } from '../store/slice/authSlice';
import { selectCurrentChannelId } from '../store/slice/appSlice';

const MessageForm = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [addMessage] = useAddMessageMutation();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const username = useSelector(selectUsername);

  const sendMessage = async (values, { setSubmitting, resetForm }) => {
    const { message } = values;
    const data = {
      message: censorText(message),
      channelId: currentChannelId,
      username,
    };

    try {
      await addMessage(data).unwrap();
      
      if (process.env.NODE_ENV === 'test') {
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      resetForm();
      inputRef.current.focus();
    } catch (error) {
      console.error('Message send error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ message: '' }}
        onSubmit={sendMessage}
      >
        {({ isSubmitting }) => (
          <Form className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <Field
                name="message"
                className="border-0 p-0 ps-2 form-control"
                placeholder={t('chat.messagePlaceholder')}
                aria-label={t('chat.newMessage')}
                disabled={isSubmitting}
                innerRef={inputRef}
              />
              <button
                type="submit"
                className="btn btn-group-vertical"
                disabled={isSubmitting}
              >
                <SendFill size={20} />
                <span className="visually-hidden">{t('chat.send')}</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
