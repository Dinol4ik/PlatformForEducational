import React from 'react';
import {Flex, GridItem, Link, useColorModeValue} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";

const LeftBarInProfile = (props) => {
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
                    <LinkItem to={'/admin'} title={props.select_one}/>
                    <LinkItem to={'/admin/information'} title={props.select_two}/>
                    <LinkItem to={'hz'} title={'Каталог задач'}/>
                </Flex>
            </GridItem>
        </div>
    );
};

export default LeftBarInProfile;