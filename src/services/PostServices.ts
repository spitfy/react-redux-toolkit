import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPost} from "../models/IPost";


export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com'
    }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        fetchAllPosts: builder.query<IPost[], number>({
            query(limit: number = 5) {
                return {
                    url: '/posts',
                    params: {
                        _limit: limit
                    }
                }
            }
        }),
        getAllPosts: builder.query<IPost[], void>({
            query() {
                return {
                    url: `/posts`,
                    credentials: 'include',
                };
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({
                            type: 'Posts' as const,
                            id,
                        })),
                        { type: 'Posts', id: 'LIST' },
                    ]
                    : [{ type: 'Posts', id: 'LIST' }],
            transformResponse: (results: { data: { posts: IPost[] } }) =>
                results.data.posts,
        }),
    })
});

export const {useFetchAllPostsQuery, useGetAllPostsQuery} = postAPI;