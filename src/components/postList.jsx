import React, {useEffect, useState} from 'react';
import PostItem from "./postItem";
import {Box, Flex, Grid, Text, useColorModeValue} from "@chakra-ui/react";
import AnimationLayout from "./AnimationLayout";
import Loader from "./Loader";

const PostList = (post) => {
    const [courseArray, setCourseArray] = useState([...post.post])

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
                <Flex className="items" gap={'1em'} color={useColorModeValue('white', '')}>
                    {post.subject.map(test => (
                        <Box
                            key={test.title}
                            onClick={hand}
                            className='name-items'
                            id=''
                            p={3}
                        >
                            {test.title}
                        </Box>
                    ))}
                </Flex>
            </Flex>
            {(courseArray.length > 0) ?
                (<Grid
                    templateColumns={'repeat(auto-fit, minmax(200px, 1fr))'}
                    marginX={10}
                    mt={7}
                    gap={10}
                >
                    {courseArray.map(posts => <PostItem post={posts} key={posts.id}/>)}
                </Grid>)
                :
                (<Flex align={'center'} justify={'center'} h={'300px'} w={'100%'}>
                    <Text>Вы не авторизованы</Text>
                </Flex>)
            }
        </AnimationLayout>
    )
};

export default PostList;