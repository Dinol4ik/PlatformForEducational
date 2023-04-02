import React, {useState} from 'react';
import PostItem from "./PostItem";
import {Box, Container, Flex, Grid, Text, useColorModeValue} from "@chakra-ui/react";

const PostList = (post) => {
    const [curseArray, setCurseArray] = useState([])
    const courseBgColor = useColorModeValue('lightgray', 'gray')
    const courseColor = useColorModeValue('#6A6A6A', 'white')

    function hand(e){
        const a = document.querySelector('.items')
        let testovii = []
        for (let i = 0; i < a.children.length; i++) {
            a.children.item(i).id=''
        }
        if( e.target.id !== 'active'){
            (post.post.map(ed=> {
                if(ed.subject.title === e.target.outerText){
                    testovii.push(ed)
                }
            }))
            e.target.id='active'
            setCurseArray(testovii)
            testovii = []
        }
        else e.target.id=''
    }

    return (
        <Container
            w={'100%'}
            maxW={'container.xl'}
            display={'flex'}
            flexDir={'column'}
            mt={10}
            marginX={'auto'}
        >
            <Box display={'flex'} justifyContent={'center'}>
                <Text fontSize={'5xl'}>
                    Тут будут новости!
                </Text>
            </Box>
            <Flex
                mt={4}
                w={'100%'}
                justify={'center'}
            >
                {post.subject.map(el =>
                    <Box
                        className={'items'}
                        p={'.5em 1em'}
                        borderRadius={'1em'}
                        marginX={'.5em'}
                        bg={courseBgColor}
                        color={courseColor}
                        key={el.title}
                        _hover={{cursor: 'pointer', bg: '#0399E9', color: 'white'}}
                        onClick={hand}
                    >
                        {el.title}
                    </Box>
                )}
            </Flex>
            <Grid>
                {curseArray.map(posts => <PostItem post={posts} key={posts.id} />)}
            </Grid>
        </Container>
    );
};

export default PostList;