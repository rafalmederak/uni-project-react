import "assets/css/global.css";
import Layout from "common/Layout";
import { User } from "interfaces/User";
import { useState } from "react";
import MainRoutes from "routes/MainRoutes";

function App() {
  const [currentUser, setCurrentUser] = useState<User>();

  return (
    <Layout currentUser={currentUser}>
      <MainRoutes currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </Layout>
  );
}

export default App;
