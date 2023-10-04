import {motion, AnimatePresence} from "framer-motion";
import React, {useState} from "react";
import {
    Box, Collapse,
    Flex,
    Grid,
    GridItem,
    IconButton,
    useColorModeValue, useDisclosure
} from "@chakra-ui/react";
import LinkItem from "../Navigation/LinkItem";
import {Link as ReactLink} from "react-router-dom";
import {ChevronRightIcon} from "@chakra-ui/icons";

export default function SubjectLayout({children, ...props}) {
    // const bgColor = useColorModeValue('rgba(0, 0, 0, .05)', '#0c131c')
    // const {isOpen, onToggle} = useDisclosure(true)

    return (
        <Grid templateColumns={'1fr'} gap={{base: 2, md: 6}}>
            {/*<Box*/}
            {/*    h={'max-content'}*/}
            {/*    pos={'fixed'}*/}
            {/*    top={'10rem'}*/}
            {/*    left={'-0.5rem'}*/}
            {/*    zIndex={10}*/}
            {/*    overflow={'hidden'}*/}
            {/*>*/}
            {/*    <IconButton*/}
            {/*        colorScheme='blue'*/}
            {/*        display={{base: 'flex', md: 'none'}}*/}
            {/*        aria-label={'show menu'}*/}
            {/*        borderRightRadius={'5rem'}*/}
            {/*        icon={<ChevronRightIcon/>}*/}
            {/*        onClick={onToggle}*/}
            {/*    />*/}
            {/*    <Collapse in={isOpen} animateOpacity >*/}
            {/*        <Flex*/}
            {/*            flexDir={'column'}*/}
            {/*            align={'left'}*/}
            {/*            bgColor={{base: '#dce3e699', md: bgColor}}*/}
            {/*            w={'max-content'}*/}
            {/*        >*/}
            {/*            <LinkItem as={ReactLink} to={'/'} title={'Видео уроки'}/>*/}
            {/*            <LinkItem as={ReactLink} to={'/profile/homework'} title={'Домашние задания'}/>*/}
            {/*            <LinkItem as={ReactLink} to={'/taskList'} title={'Каталог задач'}/>*/}
            {/*        </Flex>*/}
            {/*    </Collapse>*/}
            {/*</Box>*/}
            <GridItem>
                {children}
            </GridItem>
        </Grid>
    );
};