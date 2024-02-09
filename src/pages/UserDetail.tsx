import React from "react";
import "styles/userdetail.css";
import { UserDetailProps } from "interfaces/UserDetail";

const UserDetail = ({ currentUser, posts }: UserDetailProps) => {
  const userPosts = posts.filter((post) => post.userId === currentUser.id);

  return (
    <div className="user-detail">
      <img
        src={`https://pic.onlinewebfonts.com/thumbnails/icons_504591.svg`}
        alt="user"
      />
      <h2>{currentUser.name}</h2>
      <p>Email: {currentUser.email}</p>
      <p>Company: {currentUser.company.name}</p>
      <h3>Posts</h3>
      {userPosts.map((post) => (
        <div className="user-detail-post" key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default UserDetail;
