import React from "react";
import "styles/posts.css";
import { Post, PostsProps } from "interfaces/Post";
import { User } from "interfaces/User";

const Posts = ({ posts, setPosts, users }: PostsProps) => {
  const handleDeletePost = (postId: number) => {
    const updatedPosts = posts.filter((post: Post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const getUserName = (userId: number) => {
    const user = users.find((user: User) => user.id === userId);
    return user?.name;
  };

  return (
    <div className="posts-container">
      {posts.map((post: Post) => (
        <div key={post.id} className="post">
          <div className="user-info">
            <img
              src={`https://pic.onlinewebfonts.com/thumbnails/icons_504591.svg`}
              alt={`${getUserName(post.userId)}'s profile`}
            />
            <p>{getUserName(post.userId)}</p>
          </div>
          <h2>{post.title}</h2>
          <p className="post-text">{post.body}</p>
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Posts;
