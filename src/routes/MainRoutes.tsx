import { Navigate, Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import Posts from "pages/Posts";
import Albums from "pages/Albums";
import Photos from "pages/Photos";
import Users from "pages/Users";
import Login from "pages/Login";

import { useEffect, useState } from "react";
import { User } from "interfaces/User";
import { Post } from "interfaces/Post";
import { Photo } from "interfaces/Photo";
import { Album } from "interfaces/Albums";
import { MainRoutesProps } from "interfaces/MainRoutes";
import { Comment } from "interfaces/Comment";

const MainRoutes = ({ currentUser, setCurrentUser }: MainRoutesProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((data: User[]) => {
        setUsers(data);
      });

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json();
      })
      .then((data: Post[]) => {
        setPosts(data);
      });

    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => {
        return res.json();
      })
      .then((data: Photo[]) => {
        let shorterData = data.slice(0, 100);
        setPhotos(shorterData);
      });

    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => {
        return res.json();
      })
      .then((data: Album[]) => {
        setAlbums(data);
      });

    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data: Comment[]) => {
        setComments(data);
      });
  }, []);

  return (
    <>
      <Routes>
        {!currentUser ? (
          <>
            <Route
              path="/login"
              element={
                currentUser ? (
                  <Navigate to="/" />
                ) : (
                  <Login users={users} setCurrentUser={setCurrentUser} />
                )
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home posts={posts} users={users} />} />
            <Route
              path="/posts"
              element={
                <Posts
                  posts={posts}
                  setPosts={setPosts}
                  users={users}
                  comments={comments}
                  setComments={setComments}
                  currentUser={currentUser}
                />
              }
            />
            <Route
              path="/albums"
              element={<Albums albums={albums} users={users} />}
            />
            <Route path="/photos" element={<Photos photos={photos} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default MainRoutes;
