import React from 'react';
import LeftBarInProfile from "../Navigation/LeftBar";
import PostList from "../postList";
import {Box, Flex} from "@chakra-ui/react";

const LaoutAdmin = ({children}) => {
    return (
        <Flex gap={10}>
            <LeftBarInProfile select_one={'Главная'} select_two={'Статистика'} select_three={'Обновить чаты уроков'}/>
            <div style={{width: "100%"}}>{children}</div>
        </Flex>
    );
};

export default LaoutAdmin;