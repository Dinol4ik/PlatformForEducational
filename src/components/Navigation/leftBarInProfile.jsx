import React from 'react';
import {Flex, GridItem, Link, useColorModeValue} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";

const LeftBarInProfile = () => {
     const borderColor = useColorModeValue('black', 'white')
        const LinkItem = ({title, ...props}) => {
    return (
        <Link
            as={ReactLink}
            to={'/'}
            p={4}
            _hover={{bg: '#0399E9', color: 'white'}}
            {...props}
        >
            {title}
        </Link>
    )
}
    return (
        <div>
                    <GridItem minH={'100%'} borderRight={'1px solid ' + borderColor.toString()}>
                        <Flex
                            flexDir={'column'}
                            align={'left'}
                        >
                            <LinkItem as={ReactLink} to={'/'} title={'Видео уроки'}/>
                            <LinkItem as={ReactLink} to={'/'} title={'Домашние задания'}/>
                            <LinkItem as={ReactLink} to={'/'} title={'Каталог задач'}/>
                        </Flex>
                    </GridItem>
        </div>
    );
};

export default LeftBarInProfile;