import React, { useState, useEffect } from "react";
import "styles/posts.css";
import { Post, PostsProps } from "interfaces/Post";
import { User } from "interfaces/User";

const initialPostState: Post = {
  userId: 1,
  id: 0,
  title: "",
  body: "",
};

const Posts = ({ posts, setPosts, users }: PostsProps) => {

  const [newPost, setNewPost] = useState<Post>(initialPostState);

  const maxId = Math.max(...posts.map(post => post.id));

  useEffect(() => {
    setNewPost(prevNewPost => ({
      ...prevNewPost,
      id: maxId + 1,
    }));
  }, [maxId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPost = () => {
    setPosts([newPost, ...posts]);
    setNewPost(initialPostState);
  };

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
       <div className="add-post">
        <input
          type="text"
          name="title"
          placeholder="Enter post title"
          value={newPost.title}
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          placeholder="Enter post text"
          value={newPost.body}
          onChange={handleInputChange}
        ></textarea>
        <button onClick={handleAddPost}>Add Post</button>
      </div>
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