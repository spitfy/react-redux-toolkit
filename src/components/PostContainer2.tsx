import React from 'react';
import {useFetchAllPostsQuery} from "../services/PostServices";
import PostItem from "./PostItem";

const PostContainer2 = () => {
    const {data: posts, error, isLoading} = useFetchAllPostsQuery(5);
    return (
        <div>
            {/*<div className="post__list">*/}
            {/*    {isLoading && <h1>Loading</h1>}*/}
            {/*    {error && <h1>Произошла ошибка при загрузке</h1>}*/}
            {/*    {posts && posts.map(post =>*/}
            {/*        <PostItem post={post} key={post.id} />*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};

export default PostContainer2;