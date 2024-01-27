import Footer from "components/Footer";
import Nav from "components/Nav";
import { ILayoutProps } from "interfaces/Layout";
import "styles/layout.css";

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Nav />
      <main className="pages-layout">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
