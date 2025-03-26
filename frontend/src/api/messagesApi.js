import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../utils/apiHelpers';
import { getAuthApiRoute } from '../utils/routes';

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getAuthApiRoute('MESSAGES'),
    prepareHeaders: (headers) => prepareHeaders(headers),
  }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => {
        const timestamp = Date.now();
        return `?timestamp=${timestamp}`;
      },
      providesTags: ['Message'],
      // Жесткий polling для тестов
      ...(process.env.NODE_ENV === 'test' && { pollingInterval: 500 }),
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Message'],
      async onQueryStarted(message, { dispatch, queryFulfilled }) {
        dispatch(
          messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
            draft?.push({
              ...message,
              id: `temp-${Date.now()}`,
            });
          }),
        );
        try {
          await queryFulfilled;
          dispatch(messagesApi.util.invalidateTags(['Message']));
        } catch {
          
        }
      },
    }),
  }),
});

export default messagesApi;
export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
