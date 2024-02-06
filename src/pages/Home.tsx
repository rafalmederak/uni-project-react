import React from "react";
import "styles/home.css";
import logo from "assets/images/logo.png";
import { HomeProps } from "interfaces/Home";

const Home = ({ posts, users }: HomeProps) => {
  const post = posts[0];

  const getUserName = (userId: number) => {
    const user = users?.find((user) => user?.id === userId);
    return user?.name;
  };

  return (
    <div className="home-container">
      <div className="home-main-logo">
        <img src={logo} alt="logo" />
        <h1>React Project Uni</h1>
      </div>

      <div className="home-main-post">
        <h2>Latest Post</h2>
        <div className="post">
          <div className="user-info">
            <img
              src={`https://pic.onlinewebfonts.com/thumbnails/icons_504591.svg`}
              alt={`${getUserName(post?.userId)}'s profile`}
            />
            <p>{getUserName(post?.userId)}</p>
          </div>
          <h2>{post?.title}</h2>
          <p className="post-text">{post?.body}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
