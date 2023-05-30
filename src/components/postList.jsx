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
            <Flex align={'center'} justify={'center'}>
                <Text fontSize={'4xl'}>
                    Выберите направление и курс
                </Text>
            </Flex>
            <Flex justify={'center'} marginX={{base: 0, md: 'auto'}} w={'100%'}>
                <Flex
                    className="items"
                    gap={'1em'}
                    flexDir={{base: 'column', sm: 'row'}}
                    w={{base: '100%', sm: 'max-content'}}
                >
                    {post.subject.map(subject => (
                        <Box
                            key={subject.id}
                            onClick={hand}
                            cursor={'pointer'}
                            borderRadius={'10px'}
                            bgColor={bgTitle}
                            color={colorTitle}
                            id=''
                            p={3}
                            w={{base: '100%', sm: 'max-content'}}
                        >
                            {subject.title}
                        </Box>
                    ))}
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
                        {courseArray.map(posts => <PostItem  post={posts} key={posts.id}/>)}
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