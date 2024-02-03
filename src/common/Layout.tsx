import Footer from "components/Footer";
import Nav from "components/Nav";
import { ILayoutProps } from "interfaces/Layout";
import "styles/layout.css";

const Layout = ({ children, currentUser }: ILayoutProps) => {
  return (
    <>
      {currentUser ? (
        <>
          <Nav />
          <main className="pages-layout">{children}</main>
          <Footer />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Layout;
