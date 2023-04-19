import React, {useState, useEffect} from 'react';
import PostItem from "./postItem";
import MyModal from "../UI/ModalWindow/MyModal";
import {Box, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {AnimatePresence, motion} from "framer-motion";
import AnimationLayout from "./AnimationLayout";

const PostList = (post) => {
    const [curseArray, setCurseArray] = useState([])

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
            setCurseArray(testovii)
            testovii = []
        } else e.target.id = ''
    }

    return (
        <AnimationLayout>
            <Flex align={'center'} justify={'center'}>
                <Text fontSize={'6xl'}>
                    Тут будут новости!
                </Text>
            </Flex>
            <Flex justify={'center'}>
                <Box className="items" color={useColorModeValue('white', '')}>
                    {post.subject.map(test =>
                        test.title === "Математика"
                            ? <div
                                key={test.title}
                                onClick={hand}
                                className='name-items' id=''>{test.title}</div>
                            : <div
                                key={test.title}
                                onClick={hand}
                                className='name-items' id=''>{test.title}</div>
                    )}
                </Box>
            </Flex>
            <Box>
                <div className="item-info">
                    <div className="item-info-inside">
                        {curseArray.map(posts => <PostItem post={posts} key={posts.id}/>)}
                    </div>
                </div>
            </Box>
        </AnimationLayout>
    )
};

export default PostList;