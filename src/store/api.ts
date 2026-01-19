import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Auction, Bid } from '../db/schema';

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
});

export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Auction', 'Bid', 'Item'],
    endpoints: (builder) => ({
        getActiveItems: builder.query<any[], void>({
            query: () => '/items/active',
            providesTags: ['Auction'],
        }),
        getItem: builder.query<any, number>({
            query: (id) => `/items/${id}`,
            providesTags: (result, error, id) => [{ type: 'Item', id }],
        }),
        getItemImages: builder.query<string[], number>({
            query: (id) => `/items/${id}/images`,
        }),
        getAuctionByItemId: builder.query<Auction, number>({
            query: (itemId) => `/auctions/item/${itemId}`,
            providesTags: (result, error, itemId) => [{ type: 'Auction', id: itemId }],
        }),
        getBidsByAuctionId: builder.query<Bid[], number>({
            query: (auctionId) => `/bids/auction/${auctionId}`,
            providesTags: (result, error, auctionId) => [{ type: 'Bid', id: auctionId }],
        }),
        createBid: builder.mutation<Bid, { auctionId: number; userId: string; amount: number }>({
            query: ({ auctionId, userId, amount }) => ({
                url: '/bids',
                method: 'POST',
                body: { auctionId, userId, amount },
            }),
            invalidatesTags: (result, error, { auctionId }) => [
                { type: 'Bid', id: auctionId },
                { type: 'Auction', id: auctionId },
            ],
        }),
    }),
});

export const {
    useGetActiveItemsQuery,
    useGetItemQuery,
    useGetItemImagesQuery,
    useGetAuctionByItemIdQuery,
    useGetBidsByAuctionIdQuery,
    useCreateBidMutation,
} = api;
