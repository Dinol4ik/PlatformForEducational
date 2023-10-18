import React, {Suspense, useEffect, useState} from 'react';
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
import NavigationLink from "../../UI/NavigationLink";
import SubjectLayout from "./SubjectLayout";

async function fetchLessonsInCurse(id) {
    return await LessonsApi.getLessonsInCurse(id)
}

const LessonsList = () => {
    const params = useParams()
    const [lessons, setLessons] = useState()

    const bgColor = useColorModeValue('rgba(0, 0, 0, .05)', '#0c131c')
    const bgColorGridItem = useColorModeValue('rgba(0, 0, 0, .1)', 'rgba(255, 255, 255, .2)')
    const boxShadow = useColorModeValue('0 0 2px', '0 0 2px whitesmoke')
    const folderName = useColorModeValue('no-folder-light.png', 'no-folder-dark-transformed.png')

    useEffect(() => {
        fetchLessonsInCurse(params.id)
            .then(res => setLessons(res))
    }, [])

    return (
        <Box p={4} borderRadius={'1em'} bgColor={bgColor} boxShadow={boxShadow} minH={'70vh'} mx={{base: 4, sm: 0}}>
            <Text fontSize={'xl'}>
                Уроки по выбранному курсу
            </Text>
            <Grid templateColumns={'repeat(auto-fit, minmax(200px, 1fr))'} mt={4} gap={4}>
                <Suspense fallback={<h2>Загрузка...</h2>}>
                    {lessons?.lessons?.map((lesson, id) => {
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
                </Suspense>
            </Grid>
        </Box>
    );
};

export default LessonsList;