import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import queryKeys from '@app/constants/queryKeys';
import {API_URL} from '@env';

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: headers => {
      return headers;
    },
  }),
  tagTypes: [queryKeys.PLANT_QUESTIONS, queryKeys.PLANT_CATEGORIES],
  endpoints: () => ({}),
});

export default apiService;
