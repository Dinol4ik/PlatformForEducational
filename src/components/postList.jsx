import React, {useEffect, useState} from 'react';
import PostItem from "./postItem";
import {Box, Flex, Grid, Text, useRadioGroup} from "@chakra-ui/react";
import AnimationLayout from "./AnimationLayout";
import RadioButton from "./Courses/radioButton";

const PostList = (post) => {

    const [courseArray, setCourseArray] = useState([...post.post])
    const [currentCourse, setCurrentCourse] = useState('Сброс фильтров')

    let options = []
    post.subject.map((subject) => {
        options.push(subject.title)
    });
    options = [...options, 'Сброс фильтров']

    const {getRootProps, getRadioProps} = useRadioGroup({
        name: 'subjects',
        onChange: setCurrentCourse,
    })

    const group = getRootProps()

    useEffect(() => {
        setCourseArray([...post.post])
    }, [post])

    useEffect(() => {
        const newCourseArr = []
        if (currentCourse === 'Сброс фильтров') {
            return setCourseArray([...post.post])
        }
        post.post.map(course => {
            if (course.subject.title === currentCourse) {
                newCourseArr.push(course)
            }
        })
        setCourseArray(newCourseArr)
    }, [currentCourse]);

    return (
        <AnimationLayout>
            <Text fontSize={'4xl'} display={'flex'} align={'center'} justifyContent={'center'}>
                Выберите направление и курс
            </Text>
            <Flex
                className="items"
                flexDir={{base: 'column', sm: 'row'}}
                justify={{base: 'none', sm: 'center'}}
                wrap={'wrap'}
                gap={'1em'}
                {...group}
            >
                {options.map((value) => {
                    const radio = getRadioProps({value})
                    const isReset = value === 'Сброс фильтров'
                    return (
                        <RadioButton key={value} isReset={isReset} {...radio}>
                            {value}
                        </RadioButton>
                    )
                })}
            </Flex>
            {(courseArray.length > 0)
                ?
                <Grid
                    maxW={'container.xl'}
                    marginX={{base: 4, md: 2, lg: 0}}
                    templateColumns={'repeat(auto-fit, minmax(240px, 1fr))'}
                    mt={7}
                    gap={10}
                >
                    {courseArray.map(posts => <PostItem post={posts} key={posts.id}/>)}
                </Grid>
                :
                <Flex align={'center'} justify={'center'} mt={10} w={'100%'}>
                    <Text>Нет курсов по этому предмету</Text>
                </Flex>
            }
        </AnimationLayout>
    )
}

export default PostList;