import queryKeys from '@app/constants/queryKeys';
import apiService from './apiService';

export const plantsApi = apiService.injectEndpoints({
  endpoints: builder => ({
    getPlantCategories: builder.query<
      APIPaginatedResponse<PlantCategory>,
      void
    >({
      query: () => '/getCategories',
      providesTags: [queryKeys.PLANT_CATEGORIES],
    }),
    getPlantQuestions: builder.query<PlantQuestion[], void>({
      query: () => '/getQuestions',
      providesTags: [queryKeys.PLANT_QUESTIONS],
    }),
  }),
});

export default plantsApi;
