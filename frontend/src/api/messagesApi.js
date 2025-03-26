import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../utils/apiHelpers';
import { getAuthApiRoute } from '../utils/routes';

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getAuthApiRoute('MESSAGES'),
    prepareHeaders: (headers) => prepareHeaders(headers),
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
      pollInterval: 2000, // Автоматическое обновление каждые 2 сек
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: '',
        method: 'POST',
        body: message,
      }),
      async onQueryStarted(message, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(messagesApi.util.invalidateTags(['Messages'])); // Принудительное обновление
        } catch (error) {
          console.error('Ошибка при отправке сообщения:', error);
        }
      },
    }),
  }),
});

export default messagesApi;
export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;

