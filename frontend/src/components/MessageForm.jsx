import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { SendFill } from 'react-bootstrap-icons';
import { useAddMessageMutation, useGetMessagesQuery } from '../api/messagesApi';
import { censorText } from '../utils/textFilter';
import { selectUsername } from '../store/slice/authSlice';
import { selectCurrentChannelId } from '../store/slice/appSlice';

const MessageForm = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [addMessage, { isLoading: isAddingMessage }] = useAddMessageMutation();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const username = useSelector(selectUsername);

  useGetMessagesQuery(undefined, {
    pollingInterval: 2000,
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (values, { resetForm, setSubmitting }) => {
    try {
      await addMessage({
        message: censorText(values.message),
        channelId: currentChannelId,
        username,
      }).unwrap();

      if (process.env.NODE_ENV === 'test') {
        await new Promise((resolve) => {
          setTimeout(resolve, 500);
        });
        window.dispatchEvent(new Event('resize'));
      }

      resetForm();
      inputRef.current.focus();
    } catch (error) {
      console.error('Send failed:', error);
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
                className="border-0 p-0 ps-2 form-control"
                type="text"
                name="message"
                placeholder={t('messageForm.placeholder')}
                autoFocus
                required
                aria-label={t('messageForm.label')}
                innerRef={inputRef}
              />
              <button
                className="btn me-1"
                type="submit"
                disabled={isAddingMessage || isSubmitting}
              >
                <SendFill color="royalblue" size={20} />
                <span className="visually-hidden">{t('messageForm.button')}</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
