import { Navigate, Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import Posts from "pages/Posts";
import Albums from "pages/Albums";
import Photos from "pages/Photos";
import Users from "pages/Users";
import NotFound from "pages/NotFound";
import Login from "pages/Login";

import { useEffect, useState } from "react";
import { User } from "interfaces/User";
import { Post } from "interfaces/Post";
import { Photo } from "interfaces/Photo";
import { MainRoutesProps } from "interfaces/MainRoutes";

const MainRoutes = ({ currentUser, setCurrentUser }: MainRoutesProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

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
            <Route path="/" element={<Home />} />
            <Route
              path="/posts"
              element={
                <Posts posts={posts} setPosts={setPosts} users={users} />
              }
            />
            <Route path="/albums" element={<Albums />} />
            <Route path="/photos" element={<Photos photos={photos} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default MainRoutes;
