import React from 'react';
import {postAPI, useFetchAllPostsQuery} from "../services/PostServices";
import PostItem from "./PostItem";

const PostContainer = () => {
    const {data: posts} = useFetchAllPostsQuery(5);
    return (
        <div>
            <div className="post__list">
                {posts && posts.map(post =>
                    <PostItem post={post} />
                )}
            </div>
        </div>
    );
};

export default PostContainer;