import React, {useContext} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom'
import {AuthContext} from "../context";
import NavBar from "./NavBar";
function Layot(props) {
    const {isAuth,setIsAuth}= useContext(AuthContext)
    const navigate = useNavigate();
    const {token,setToken}= useContext(AuthContext)
    const {profileName,setProfileName}= useContext(AuthContext)
    const {profileId, setProfileId} = useContext(AuthContext)
    console.log(localStorage.getItem('profileId'))
    function disconect(){
        setIsAuth(false)
        setToken(false)
        localStorage.clear()
        navigate("")
    }
        function menuAuth(){
        if(isAuth)
            return [<li key='1' onClick={disconect}> <a className="dropdown-item" href=''>Выйти</a></li>,
                <li key='2'> <Link to={'/account'} className="dropdown-item">личный кабинет</Link></li>]
        else return <li key='3'><Link to={'/login'} className="dropdown-item" >Войти</Link></li>
        }
    return (
        <div className="">
            <div className="header">
            <div className="logo">
                <Link to={'/'}><i className="fa fa-house-user"></i></Link>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to={"/buy"}> Купить курсы< /Link></li>
                    <li><Link to={"/feedback"}> Отзывы</Link></li>
                    <li><Link to={"/personalActions"}> Акции</Link></li>
                    <li><Link to={"/AboutUs"}> Контакты</Link></li>
                </ul>
            </nav>
            <div className="about-person">
                <div className="dark-light-switch">
                    <div className="background">
                        <div className="switcher"></div>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        <span>{localStorage.getItem('profileName')}</span>
                        <span>{localStorage.getItem('profileSecondName')}</span>
                    </button>
                    <ul className="dropdown-menu">
                        {
                           menuAuth()
                        }
                    <li><Link className="dropdown-item" to={"/sheldue"}> Календарь</Link></li>
                    </ul>
                </div>
            </div>
            </div>
            <Outlet/>
            <footer>2021</footer>
        </div>
    );
}

export default Layot;