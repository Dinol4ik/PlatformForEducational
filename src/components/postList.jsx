import React, {useEffect, useState} from 'react';
import PostItem from "./postItem";
import {Box, Button, Flex, Grid, Text, useColorModeValue} from "@chakra-ui/react";
import AnimationLayout from "./AnimationLayout";
import {CloseIcon} from "@chakra-ui/icons";

const PostList = (post) => {

    const bgTitle = useColorModeValue('purple.400', 'orange.200')
    const colorTitle = useColorModeValue('white', 'black')

    const colorScheme = useColorModeValue('purple', 'orange')
    const [courseArray, setCourseArray] = useState([...post.post])

    useEffect(() => {
        setCourseArray([...post.post])
    }, [post])

    function hand(e) {
        const a = document.querySelector('.items')
        let courses = []
        for (let i = 0; i < a.children.length; i++) {
            a.children.item(i).id = ''
        }
        if (e.target.id !== 'active') {
            (post.post.map(ed => {
                    if (ed.subject.title === e.target.outerText) {
                        courses.push(ed)
                    }
                }
            ))
            e.target.id = 'active'
            setCourseArray(courses)
            courses = []
        } else e.target.id = ''
    }

    function reset(e) {
        const a = document.querySelector('.items')
        for (let i = 0; i < a.children.length; i++) {
            e.target.id = ''
        }
        setCourseArray([...post.post])
    }

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
            >
                {post.subject.map(subject => {
                    return <Button
                        key={subject.id}
                        onClick={hand}
                        bgColor={bgTitle}
                        color={colorTitle}
                        mx={{base: 10, sm: 0}}
                        id=''
                    >
                        {subject.title}
                    </Button>
                })}
                <Flex justifyContent={'center'}>
                    <Button
                        leftIcon={<CloseIcon/>}
                        aria-label={'Reset filter'}
                        colorScheme={colorScheme}
                        onClick={reset}
                        maxW={'max-content'}
                    >
                        Сброс фильтров
                    </Button>
                </Flex>
            </Flex>
            {(courseArray.length > 0) ?
                (<Box>
                    <Grid
                        paddingX={2}
                        maxW={'container.xl'}
                        marginX={{base: 8, md: 4, lg: 0}}
                        templateColumns={'repeat(auto-fit, minmax(200px, 1fr))'}
                        mt={7}
                        gap={10}
                    >
                        {courseArray.map(posts => <PostItem post={posts} key={posts.id}/>)}
                    </Grid>
                </Box>)
                :
                (<Flex align={'center'} justify={'center'} mt={10} w={'100%'}>
                    <Text>Нет курсов по этому предмету</Text>
                </Flex>)
            }
        </AnimationLayout>
    )
}

export default PostList;