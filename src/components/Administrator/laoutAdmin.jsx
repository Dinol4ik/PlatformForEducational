import React from 'react';
import LeftBarInProfile from "../Navigation/LeftBar";
import PostList from "../postList";

const LaoutAdmin = ({children}) => {
    return (
        <div>
            <div style={{display: "flex"}}>
                <div><LeftBarInProfile select_one={'Курсы'} select_two={'что то еще'}/></div>
                <div style={{width:"100%"}}>{children}</div>
            </div>
        </div>
    );
};

export default LaoutAdmin;