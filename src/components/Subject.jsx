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

const Subject = (props) => {
    const [curseInProfile, setCurseInProfie] = useState()
    const params = useParams()
    const borderColor = useColorModeValue('black', 'white')
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
            <Container
                mt={10}
                minW={'100%'}
                minH={'100%'}
            >
                <Grid
                    h={'100%'}
                    minH={'600px'}
                    templateColumns='250px 1fr'
                    gap={10}
                    mt={4}
                    borderTop={'1px solid ' + borderColor.toString()}
                >
                    <GridItem minH={'100%'} borderRight={'1px solid ' + borderColor.toString()}>
                        <Flex
                            flexDir={'column'}
                            align={'left'}
                        >
                            <LinkItem as={ReactLink} to={'/'} title={'Видео уроки'}/>
                            <LinkItem as={ReactLink} to={'/'} title={'Домашние задания'}/>
                            <LinkItem as={ReactLink} to={'/taskList'} title={'Каталог задач'}/>
                        </Flex>
                    </GridItem>

                    <GridItem mt={4}>
                        {curseInProfile
                            ? <>
                                {console.log(curseInProfile)}
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
                                                    to={''+curses.id}
                                                    _hover={{
                                                        textDecoration: 'none',
                                                        borderColor: 'white',
                                                    }}>
                                                    <Image
                                                        src={process.env.PUBLIC_URL + `/${folderName}`}
                                                        alt={'Тут была папка'}
                                                    />
                                                    <Text fontSize={'16px'} textAlign={'justify'}>
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
            </Container>
        </AnimationLayout>
    );
};

export default Subject;