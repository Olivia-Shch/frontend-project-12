import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../utils/apiHelpers';
import { getAuthApiRoute } from '../utils/routes';

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getAuthApiRoute('MESSAGES'),
    prepareHeaders: (headers) => prepareHeaders(headers),
  }),
  tagTypes: ['Channels', 'Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '/messages',
      providesTags: ['Messages'],
      refetchOnMountOrArgChange: true, // Авто-обновление
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: '/messages', // Явно указываем путь
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export default messagesApi;
export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi;
