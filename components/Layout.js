import Navbar from "./navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <div className="content">
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </ div>
    );
}

export default Layout;