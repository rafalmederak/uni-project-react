import { Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import Posts from "pages/Posts";
import Albums from "pages/Albums";
import Photos from "pages/Photos";
import Users from "pages/Users";
import NotFound from "pages/NotFound";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
