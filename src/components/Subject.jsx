import React, {useEffect, useState} from 'react';
import {Box, Container, Flex, Grid, GridItem, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import {Link as ReactLink, useParams} from 'react-router-dom'
import SubjectInProfile from "../API/SubjectInProfile";
import AnimationLayout from "./AnimationLayout";
import Loader from "./Loader";

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

const Subject = () => {
    const [curseInProfile, setCurseInProfie] = useState()
    const params = useParams()
    const bgColor = useColorModeValue('rgba(0, 0, 0, .05)', '#0c131c')
    const boxShadow = useColorModeValue('', '0 0 2px whitesmoke')
    const folderName = useColorModeValue('no-folder-light.png', 'no-folder-dark-transformed.png')

    useEffect(() => {
        fetchProfileCurse()
    }, [])

    async function fetchProfileCurse() {
        const result = await SubjectInProfile.getCurseInSubject(params.id)
        setCurseInProfie(result)
    }

    return (
        <AnimationLayout>
            <Grid templateColumns='250px 1fr' gap={6}>
                <GridItem
                    h={'max-content'}
                    pos={'sticky'} top={'6em'}
                    borderRadius={'1em'}
                    bgColor={bgColor}
                    boxShadow={boxShadow}
                    overflow={'hidden'}
                >
                    <Flex flexDir={'column'} align={'left'}>
                        <LinkItem as={ReactLink} to={'/'} title={'Видео уроки'}/>
                        <LinkItem as={ReactLink} to={'/profile/homework'} title={'Домашние задания'}/>
                        <LinkItem as={ReactLink} to={'/taskList'} title={'Каталог задач'}/>
                    </Flex>
                </GridItem>
                <GridItem>
                    {curseInProfile ?
                        <>
                            <Grid templateColumns={'repeat(auto-fit, minmax(200px, 1fr))'} gap={6}>
                                {curseInProfile.curses.map((curses, id) => {
                                    return (
                                        <GridItem key={id} maxW={'200px'} display={'flex'} justifyContent={'center'} marginX={'auto'}>
                                            <Link as={ReactLink} to={'' + curses.id}
                                                  _hover={{textDecoration: 'none', borderColor: 'white',}}
                                            >
                                                <Image
                                                    src={process.env.PUBLIC_URL + `/${folderName}`}
                                                    alt={'Тут была папка'}
                                                />
                                                <Text fontSize={'md'} textAlign={'justify'}>
                                                    {curses.title}
                                                </Text>
                                            </Link>
                                        </GridItem>
                                    )
                                })}
                            </Grid>
                        </>
                        :
                        <Loader/>
                    }
                </GridItem>
            </Grid>
        </AnimationLayout>
    );
};

export default Subject;