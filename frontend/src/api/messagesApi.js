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
      query: () => '/messages', // Указываем корректный эндпоинт
      providesTags: ['Messages'],
      refetchOnMountOrArgChange: true, // Автообновление сообщений
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'], // Гарантированное обновление списка сообщений
    }),
  }),
});

export default messagesApi;
export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
