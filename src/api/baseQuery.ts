import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import {
  fetchBaseQuery,
  retry
} from '@reduxjs/toolkit/query/react';

interface ResponseSuccess {
  success: boolean;
  body: unknown;
}

interface ResponseError {
  success: boolean;
  error: string & {
    attempts: number;
  }
}

type ResponseResult = ResponseSuccess | ResponseError

const validateStatus = (response: Response, result: ResponseResult) => response.status === 200 && result.success;

let attempts = 0;

export type BaseQueryError = FetchBaseQueryError & {
  attemps: number;
}

const customBaseQuery = fetchBaseQuery({
  baseUrl: '',
  validateStatus,
  prepareHeaders: (headers) => {
    headers.set('rest-id', crypto.randomUUID())

    return headers
  }
}) as BaseQueryFn<string | FetchArgs, ResponseSuccess, FetchBaseQueryError>;

export const baseQuery = retry(
  async (args, api, extraOptions) => {
    const result = await customBaseQuery(args, api, extraOptions);

    if (result.error) {
      Object.assign(result.error, { data: (result.error.data as ResponseError).error })

      attempts += 1;

      return {
        ...result,
        error: {
          ...result.error,
          attempts
        }
      }
    }

    attempts = 1;

    return {
      ...result,
      data: result.data.body
    };
  },
  {
    maxRetries: 0
  }
)