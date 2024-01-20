import Footer from "components/Footer";
import Nav from "components/Nav";
import { ILayoutProps } from "interfaces/Layout.interfaces";

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
