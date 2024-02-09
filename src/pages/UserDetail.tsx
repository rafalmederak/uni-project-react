import React from 'react';
import "styles/userdetail.css";

import { User } from 'interfaces/User';
import { Post } from 'interfaces/Post'; // Załóżmy, że Post jest eksportowany z innego pliku
interface UserDetailProps {
  currentUser: User;
  users: User[];
  posts: Post[];
}

const UserDetail: React.FC<UserDetailProps> = ({ currentUser, users, posts }) => {
  const userPosts = posts.filter(post => post.userId === currentUser.id);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Detail Page for {currentUser.name}</h2>
      <p>Email: {currentUser.email}</p>
      <p>Company: {currentUser.company.name}</p>
      <h3>Posts by {currentUser.name}:</h3>
      {userPosts.map(post => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default UserDetail;
