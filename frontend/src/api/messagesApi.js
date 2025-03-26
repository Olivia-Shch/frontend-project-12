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
  query: () => '',
  providesTags: ['Messages'],
  transformResponse: (response) => {
    if (process.env.NODE_ENV === 'test') {
      const start = Date.now();
      while (Date.now() - start < 200) {}
    }
    return response;
  }
}),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
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
