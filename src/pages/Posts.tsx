import React, { useState, useEffect } from "react";
import "styles/posts.css";
import { Post, PostsProps } from "interfaces/Post";
import { User } from "interfaces/User";
import Comments from "components/Comments";

const initialPostState: Post = {
  userId: 0,
  id: 0,
  title: "",
  body: "",
};

const Posts = ({ posts, setPosts, users, comments, setComments, currentUser }: PostsProps) => {
  const [newPost, setNewPost] = useState<Post>(initialPostState);
  const [showComments, setShowComments] = useState<number | null>(null);
 
  const maxId = Math.max(...posts.map(post => post.id));

  useEffect(() => {
    setNewPost(prevNewPost => ({
      ...prevNewPost,
      id: maxId
    }));
  }, [maxId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPost = () => {
    const AddNewPost = { ...newPost, id: maxId + 1, userId: currentUser?.id || 0 };
    if (newPost.title.trim() === "" || newPost.body.trim() === "") {
      alert("Title and body are required!");
      return;
    }
    setPosts([AddNewPost, ...posts]);
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

  const handleShowComments = (postId: number) => {
    setShowComments((prevId) => (prevId === postId ? null : postId));
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
          <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
          <div className="comment-section">
          <button onClick={() => handleShowComments(post.id)}>Show/Hide Comments</button>
          {showComments === post.id && (
               <Comments
               postId={post.id}
               visible={true}
               comments={comments}      
               setComments={setComments} 
               currentUser={currentUser}/>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;