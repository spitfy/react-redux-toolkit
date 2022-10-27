import React from 'react';
import {
    useCreatePostMutation,
    useDeletePostMutation,
    useFetchAllPostsQuery,
    useUpdatePostMutation
} from "../services/PostServices";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer = () => {
    const {data: posts, error, isLoading} = useFetchAllPostsQuery(100);

    const [createPost, {error: createError, isLoading: isCreateLoading}] = useCreatePostMutation();
    const [updatePost, {error: updateError, isLoading: isUpdateLoading}] = useUpdatePostMutation();
    const [deletePost, {}] = useDeletePostMutation();

    const handleCreate = async () => {
        const title = prompt();
        await createPost({title, body: title} as IPost)
    }

    const handleUpdate = async (post: IPost) => {
        const title = prompt(post.title);
        await updatePost({...post, title, body: title} as IPost);
    }

    const handleDelete = (post: IPost) => {
        deletePost(post);
    }

    return (
        <div>
            <button onClick={() => handleCreate()}>Добавить пост</button>
            <div className="post__list">
                {isLoading && <h1>Loading</h1>}
                {error && <h1>Произошла ошибка при загрузке</h1>}
                {posts && posts.map(post =>
                    <PostItem
                        post={post}
                        key={post.id}
                        remove={() => handleDelete(post)}
                        update={() => handleUpdate(post)}
                    />
                )}
            </div>
        </div>
    );
};

export default PostContainer;