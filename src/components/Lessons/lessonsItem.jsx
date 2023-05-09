import React from 'react';
import {Link as ReactLink, useLocation, useParams} from "react-router-dom";
import LeftBarInProfile from "../Navigation/leftBarInProfile";
import {Box, Container, Grid, GridItem, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import Loader from "../Loader";
import AnimationLayout from "../AnimationLayout";

const LessonsItem = () => {
    const idLesson = useLocation()
    const from = idLesson.state.from
    const borderColor = useColorModeValue('black', 'white')
    const date = new Date(from.dateTime)
    const month = date.toLocaleString('ru', {month: 'long', day: 'numeric'});
    const hour = date.toLocaleString('ru',{hour: '2-digit',minute:'2-digit'})
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
                        {from
                            ? <>
                                <Text fontSize={'md'}>
                                    Тема урока:
                                    <Box as={'span'} ml={'1em'} fontWeight={'semibold'}>
                                        {from.title}
                                    </Box>
                                    <div>
                                        Дата урока:
                                        <Box as={'span'} ml={'1em'} fontWeight={'semibold'}>
                                            {month}
                                        </Box>
                                    </div>
                                    <div>
                                       Время урока:
                                        <Box as={'span'} ml={'1em'} fontWeight={'semibold'}>
                                            {hour}
                                        </Box>
                                    </div>
                                </Text>
                                <Grid
                                    templateColumns={'repeat(auto-fit, minmax(300px, 1fr))'}
                                    gap={20}
                                    mr={50}
                                    ml={10}
                                    mb={25}
                                >
                                    <video width="400" height="300" controls="controls">
                                        <source src={from.video}/>
                                    </video>
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

export default LessonsItem;