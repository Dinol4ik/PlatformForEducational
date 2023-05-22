import React, {useEffect, useState} from 'react';
import PostItem from "./postItem";
import {Box, Flex, Grid, Text, useColorModeValue} from "@chakra-ui/react";
import AnimationLayout from "./AnimationLayout";
import Loader from "./Loader";

const PostList = (post) => {
    const [courseArray, setCourseArray] = useState([...post.post])
    const bgTitle = useColorModeValue('purple.400', 'orange.200')
    const colorTitle = useColorModeValue('white', 'black')

    useEffect(() => {
        setCourseArray([...post.post])
    }, [post])

    function hand(e) {
        const a = document.querySelector('.items')
        let testovii = []
        for (let i = 0; i < a.children.length; i++) {
            a.children.item(i).id = ''
        }
        if (e.target.id !== 'active') {
            (post.post.map(ed => {
                    if (ed.subject.title === e.target.outerText) {
                        testovii.push(ed)
                    }
                }
            ))
            e.target.id = 'active'
            setCourseArray(testovii)
            testovii = []
        } else e.target.id = ''
    }

    return (
        <AnimationLayout>
            <Flex align={'center'} justify={'center'} mt={10}>
                <Text fontSize={'4xl'}>
                    Выберите направление и курс
                </Text>
            </Flex>
            <Flex justify={'center'}>
                <Flex className="items" gap={'1em'}>
                    {post.subject.map(test => (
                        <Box
                            key={test.title}
                            onClick={hand}
                            cursor={'pointer'}
                            borderRadius={'10px'}
                            bgColor={bgTitle}
                            color={colorTitle}
                            id=''
                            p={3}
                        >
                            {test.title}
                        </Box>
                    ))}
                </Flex>
            </Flex>
            {(courseArray.length > 0) ?
                (<Box marginX={'2.5em'}>
                    <Grid
                        maxW={'container.xl'}
                        marginX={'auto'}
                        templateColumns={'repeat(auto-fit, minmax(250px, 1fr))'}
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
};

export default PostList;