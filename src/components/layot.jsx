import React from 'react';
import {Link, Outlet} from 'react-router-dom'
function Layot(props) {
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
                    <li><Link to={"/account"}> Войти</Link></li>
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
                        Кнопка выпадающего списка
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Действие</a></li>
                        <li><a className="dropdown-item" href="#">Другое действие</a></li>
                        <li><a className="dropdown-item" href="#">Что-то еще здесь</a></li>
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