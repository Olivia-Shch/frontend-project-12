import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../utils/apiHelpers';
import { getAuthApiRoute } from '../utils/routes';

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getAuthApiRoute('MESSAGES'),
    prepareHeaders: (headers) => prepareHeaders(headers),
  }),
  tagTypes: ['Message'], // Упрощаем теги (важно использовать 'Message' вместо 'Messages')
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: (result) => 
        result
          ? [...result.map(({ id }) => ({ type: 'Message', id })), 'Message']
          : ['Message'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Message', channelId: arg.channelId } // Точечная инвалидация
      ],
      async onQueryStarted(message, { dispatch, queryFulfilled }) {
        // Оптимистичное обновление
        const patchResult = dispatch(
          messagesApi.util.updateQueryData('getMessages', '', (draft) => {
            draft.push({
              ...message,
              id: Date.now().toString(), // Временный ID
            });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // Откат при ошибке
        }
      },
    }),
  }),
});

export default messagesApi;
export const { 
  useGetMessagesQuery, 
  useAddMessageMutation 
} = messagesApi;
