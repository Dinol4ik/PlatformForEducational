import React, {useEffect, useState} from 'react';
import {Link as ReactLink, useParams} from "react-router-dom";
import LessonsApi from "../../API/Lessons/LessonsApi";
import {Box, Container, Flex, Grid, GridItem, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import Loader from "../Loader";
import AnimationLayout from "../AnimationLayout";
import LeftBarInProfile from "../Navigation/leftBarInProfile";

const LessonsList = () => {
     const borderColor = useColorModeValue('black', 'white')
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
                    <LeftBarInProfile/>

                    <GridItem mt={4}>
                        {lessons
                            ? <>
                                <Text fontSize={'md'}>
                                    Предмет:
                                    <Box as={'span'} ml={'1em'} fontWeight={'semibold'}>
                                        Уроки
                                    </Box>
                                </Text>
                                <Grid
                                    templateColumns={'repeat(auto-fit, minmax(300px, 1fr))'}
                                    gap={20}
                                    mr={50}
                                    ml={10}
                                    mb={25}
                                >
                                    {lessons.lessons.map((lesson, id) => {
                                        return (
                                            <GridItem
                                                key={id}
                                                boxSize={'100%'}
                                                maxW={'300px'}
                                            >
                                                <Link
                                                    as={ReactLink}
                                                    to={''+lesson.id}
                                                    state={{ from: lesson }}
                                                    _hover={{
                                                        textDecoration: 'none',
                                                        borderColor: 'white',
                                                    }}>
                                                    <Image
                                                        src={process.env.PUBLIC_URL + "/no-folder-dark-transformed.png"}
                                                        alt={'Тут была папка'}
                                                    />
                                                    <Text fontSize={'16px'} textAlign={'justify'}>
                                                        {lesson.title}
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
        // <div>
        //     {lessons
        //         ? <>{lessons.lessons.map(t => {
        //             return <div key={t.id}>
        //                <div>{t.title}</div>
        //                 <video width="400" height="300" controls="controls">
        //                     <source src={t.video}/>
        //                 </video>
        //             </div>
        //         })}</>
        //         : <>Подгрузка</>
        //     }
        // </div>
    );
};

export default LessonsList;