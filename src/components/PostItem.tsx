import React, {FC} from 'react';
import {IPost} from "../models/IPost";

interface PostItemProps {
    post: IPost;
    remove: (id: number) => void;
    update: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({post, remove, update}) => {
    return (
        <div className="post">
            {post.id} {post.title}
            <div className="post__btns">
                <button onClick={() => update(post)}>Change</button>
                <button onClick={() => remove(post.id)}>Delete</button>
            </div>
        </div>
    );
};

export default PostItem;