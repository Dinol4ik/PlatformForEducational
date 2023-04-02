import React from 'react';
import {Link, Outlet} from 'react-router-dom'
import NavBar from "./NavBar";
import Footer from "./Footer";
function Layout(props) {
    return (
        <div>
            <NavBar/>

            <Outlet/>

            <Footer/>
        </div>
    );
}

export default Layout;