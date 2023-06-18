import React, {useEffect, useState} from 'react';
import LaoutAdmin from "./laoutAdmin";
import {Badge, Box, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import MostHaveCourseApi from "../../API/AdminApi/MostHaveCourseApi";
import SubjectApi from "../../API/subjectApi";
import login from "../login";
import Loader from "../Loader";
import AnimationLayout from "../AnimationLayout";

const InformationAboutAllCourses = () => {
    const [idCourse, setIdCourse] = useState()
    const [allMoney, setAllMoney] = useState(0)
    let mon = 0;
    const [course, setCourse] = useState()
    const [money, setMoney] = useState()
    useEffect(() => {
        fetchMastHaveIdCourse()
        fetchMoney()
        if (idCourse) {
            fetchMastHaveCourse(idCourse)
        }
    }, [idCourse])

    function fetchMastHaveIdCourse() {
        const result = MostHaveCourseApi.TakeIdCourse()
        result.then((e) => setIdCourse(e[0].curse_id))
        // setIdCourse(result[0].curse_id)
    }

    function fetchMastHaveCourse(id) {
        const result = MostHaveCourseApi.TakeMostCourse(id)
        result.then(e => setCourse(e))
    }

    async function fetchMoney() {
        const result = await MostHaveCourseApi.MoneyTaked()
        setMoney(result)
    }

    if (money && mon === 0 && allMoney === 0) {
        money.map(val => {
            mon = mon + val.curse.price
        });
        setAllMoney(mon)
    }
    // if(idCourse){
    //       fetchMastHaveCourse(idCourse)
    //       console.log(course)
    // }
    // if (idCourse) {
    //     id = idCourse
    //     console.log(id)
    //     fetchMastHaveCourse()
    //     console.log(course)
    //     // fetchMastHaveCourse(idCourse[0].curse_id)
    // }
    return (
        <AnimationLayout>
            <LaoutAdmin>
                {course && allMoney
                    ?
                    <Flex
                        w={{base: 'max-content', md: '100%'}}
                        flexDir={{base: 'column', md: 'row'}}
                        justify={{md: 'space-around'}}
                        gap={5}
                        paddingX={5}
                    >
                        <Box>
                            <Text fontWeight={'semibold'} fontSize={'md'}>Часто покупаемый курс:</Text>
                            <Box border={'2px solid lime'} p={5} borderRadius={'1em'}>
                                <Text fontSize={'xl'}>{course.title}</Text>
                                <Text fontSize={'xs'} fontWeight={'semibold'}>
                                    Предмет: &nbsp;
                                    <Box display={'inline'}>{course.subject.title}</Box>
                                </Text>
                                <Text mb={0}>Цена: {course.price}</Text>
                            </Box>
                        </Box>
                        <Box>
                            <Text fontWeight={'semibold'} fontSize={'md'}>Всего заработано денег: </Text>
                            <Badge colorScheme={'green'} fontSize={'md'}>
                                <Box as={'span'} fontSize={'xl'}>{allMoney}</Box>
                                &nbsp;руб.
                            </Badge>
                        </Box>
                    </Flex>
                    : <Loader/>
                }
            </LaoutAdmin>
        </AnimationLayout>
    );
};

export default InformationAboutAllCourses;