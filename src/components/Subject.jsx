import React, {useCallback, useEffect, useState} from 'react';
import {Badge, Box, Container, Flex, Grid, GridItem, HStack, Image, Link, Text} from "@chakra-ui/react";
import {Link as ReactLink, useParams} from 'react-router-dom'
import CurseInProfile from "../API/CurseInProfile";
import SubectInProfile from "../API/SubjectInProfile";

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

const Subject = (props) => {
    const [curseInProfile, setCurseInProfie] = useState()
    const params = useParams()
    useEffect(() => {
        fetchProfileCurse()
    }, [])

    async function fetchProfileCurse() {
        const result = await SubectInProfile.getCurseInSubject(params.id)
        setCurseInProfie(result)
    }

    return (
        <Container
            mt={20}
            minW={'100%'}
            minH={'100%'}
        >

            <Grid
                h={'100%'}
                minH={'600px'}
                templateColumns='250px 1fr'
                gap={10}
            >
                <GridItem minH={'100%'}>
                    <Flex
                        flexDir={'column'}
                        align={'left'}
                        borderRight={'1px solid white'}
                    >
                        <LinkItem as={ReactLink} to={'/'} title={'Видео уроки'}/>
                        <LinkItem as={ReactLink} to={'/'} title={'Домашние задания'}/>
                        <LinkItem as={ReactLink} to={'/'} title={'Каталог задач'}/>
                    </Flex>
                </GridItem>

                <GridItem>
                    {curseInProfile
                        ? <>
                            <Text fontSize={'md'}>
                                Предмет:
                                <Box as={'span'} ml={'1em'} fontWeight={'semibold'}>
                                    {curseInProfile.title}
                                </Box>
                            </Text>
                            <Grid
                                templateColumns={'repeat(auto-fit, minmax(300px, 1fr))'}
                                gap={20}
                                mr={50}
                                ml={10}
                                mb={25}
                            >
                                {curseInProfile.curses.map((curses, id) => {
                                    return (
                                        <GridItem
                                            key={id}
                                            boxSize={'100%'}
                                            maxW={'300px'}
                                        >
                                            <Link
                                                as={ReactLink}
                                                to={'/'}
                                                _hover={{
                                                    textDecoration: 'none',
                                                    borderColor: 'white',
                                                }}>
                                                <Image
                                                    src={process.env.PUBLIC_URL + "/no-folder-dark-transformed.png"}
                                                    alt={'Тут была папка'}
                                                />
                                                <Text fontSize={'16px'} textAlign={'justify'}>
                                                    {curses}
                                                </Text>
                                            </Link>
                                        </GridItem>
                                    )
                                })}
                            </Grid>
                        </>
                        : <Text fontSize={'3xl'}>Ничего нету</Text>
                    }
                </GridItem>
            </Grid>
        </Container>
    );
};

export default Subject;