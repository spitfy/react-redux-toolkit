import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPost} from "../models/IPost";


export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
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
            },
            providesTags: result => [{ type: 'Posts', id: 'LIST' }]
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
        createPost: builder.mutation<IPost, IPost>({
            query(post) {
                return {
                    url: '/posts',
                    method: 'POST',
                    credentials: 'include',
                    body: post,
                };
            },
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
        }),
        updatePost: builder.mutation<IPost, IPost>({
            query(post) {
                return {
                    url: `/posts/${post.id}`,
                    method: 'PUT',
                    credentials: 'include',
                    body: post,
                };
            },
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
        }),
        deletePost: builder.mutation<IPost, IPost>({
            query(post) {
                return {
                    url: `/posts/${post.id}`,
                    method: 'Delete',
                    credentials: 'include',
                };
            },
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
        }),

    })
});

export const {
    useFetchAllPostsQuery,
    useGetAllPostsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postAPI;