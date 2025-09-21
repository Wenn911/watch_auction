import { apiSlice } from "./api"

export const apiTest = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    test: builder.mutation<void, void>({
      query: () => ({ url: '/', method: 'POST' })
    })
  })
})

export const { useTestMutation } = apiTest;