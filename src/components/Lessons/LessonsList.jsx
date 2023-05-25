import React, {useEffect, useState} from 'react';
import {Link as ReactLink, useParams} from "react-router-dom";
import LessonsApi from "../../API/Lessons/LessonsApi";
import {
    AspectRatio,
    Box,
    Container,
    Flex,
    Grid,
    GridItem,
    Image,
    Link,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import Loader from "../Loader";
import AnimationLayout from "../AnimationLayout";
import LinkItem from "../Navigation/LinkItem";

const LessonsList = () => {
    const bgColor = useColorModeValue('rgba(0, 0, 0, .05)', '#0c131c')
    const bgColorGridItem = useColorModeValue('rgba(0, 0, 0, .1)', 'rgba(255, 255, 255, .2)')
    const boxShadow = useColorModeValue('', '0 0 2px whitesmoke')
    const folderName = useColorModeValue('no-folder-light.png', 'no-folder-dark-transformed.png')
    const idCourse = useParams()
    const [lessons, setLessons] = useState()
    useEffect(() => {
        fetchLessonsInCurse()
    }, [])

    async function fetchLessonsInCurse() {
        const result = await LessonsApi.getLessonsInCurse(idCourse.id)
        setLessons(result)
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
                    {lessons
                        ? <Box
                            p={4}
                            borderRadius={'1em'}
                            bgColor={bgColor}
                            boxShadow={boxShadow}
                            minH={'70vh'}
                        >
                            <Text fontSize={'xl'}>Уроки по выбранному курсу</Text>
                            <Grid templateColumns={'repeat(4, 1fr)'} gap={6}>
                                {lessons.lessons.map((lesson, id) => {
                                    return (
                                        <GridItem
                                            _hover={{backgroundColor: bgColorGridItem}}
                                            borderRadius={'10px'}
                                            key={id}
                                            paddingX={4}
                                            h={'max-content'}
                                            display={'flex'}
                                            justifyContent={'center'}
                                            marginX={'auto'}
                                        >
                                            <Link as={ReactLink} to={'' + lesson.id}
                                                  _hover={{textDecoration: 'none'}}>
                                                <AspectRatio ratio={1} w={'150px'} marginX={'auto'}>
                                                    <Image
                                                        src={process.env.PUBLIC_URL + `/${folderName}`}
                                                        alt={'Тут была папка'}
                                                    />
                                                </AspectRatio>
                                                <Text fontSize={'md'} textAlign={'justify'} marginX={2}>
                                                    {lesson.title}
                                                </Text>
                                            </Link>
                                        </GridItem>
                                    )
                                })}
                            </Grid>
                        </Box>
                        :
                        <Loader/>
                    }
                </GridItem>
            </Grid>
        </AnimationLayout>
    );
};

export default LessonsList;