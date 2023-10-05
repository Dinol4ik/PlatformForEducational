import React, {useState} from 'react';
import MyModal from "../UI/ModalWindow/MyModal";
import {
    Box,
Divider,
    Flex,
    ListItem,
    Text, UnorderedList,
    useColorModeValue
} from "@chakra-ui/react";
import AllUsersInCourse from "../API/Lessons/homeWork/AllUsersInCourse";

const PostItem = (props) => {
    const [active, setActive] = useState(false)
    const subjectTitle = props.post.subject.title
    const courseTitle = props.post.title
    const courseAbout = props.post.about
    const courseInf = [...props.post.information.split('/')]
    const coursePrice = props.post.price
    const adress = window.location.href.indexOf('admin')
    const bgGradient = useColorModeValue('white', '#383838')

    function modalView() {
        setActive(true)
    }

///////////////////////// admin panel
    function foo() {
        if (adress !== -1) {
              function fetchUsersForHomeWork() {
                const result = AllUsersInCourse.getUsersInCurse(props.post.id)
                return result
            }
            const userInCourse = fetchUsersForHomeWork()

             return <MyModal showModal={active} user={userInCourse} post={props.post} onClick={() => {
                setActive(false)
            }}/>
        } else return <MyModal showModal={active} post={props.post} onClick={() => {
                setActive(false)
            }}/>
    }
//////////////////////////////////

    return (
        <Box pos={'relative'}>
            <Box
                display={active ? 'none' : 'block'}
                overflowY={'hidden'}
                maxW={'280px'}
                marginX={'auto'}
                p={5}
                onClick={modalView}
                h={'450px'}
                bgColor={useColorModeValue('white', '#383838')}
                borderRadius={10}
                pos={'relative'}
            >
                <Flex
                    flexDir={'column'}
                    align={'center'}
                    minH={'100%'}
                >
                    <Box textAlign={'left'} w={'100%'}>
                        <Text fontSize={'sm'} w={'max-content'} paddingX={1.5} borderRadius={'1em'}
                              bgColor={'#888888'} color={'white'}>
                            {subjectTitle}
                        </Text>
                    </Box>
                    <Box textAlign={'left'} w={'100%'}>
                        <Text fontSize={'xl'} fontWeight={'bold'}>
                            {courseTitle}
                        </Text>
                    </Box>
                    <Divider/>
                    <UnorderedList fontSize={'sm'} w={'100%'} textAlign={'left'} m={0} paddingX={5} maxH={'150px'}
                                   overflowY={'hidden'} pos={'relative'} minH={'150px'} h={'100%'} display={'flex'}
                                   flexDir={'column'}>
                        {courseInf.map((value, index) =>
                            (value !== "") &&
                            <ListItem key={index}>{value}</ListItem>
                        )}
                        <Box pos={'absolute'} bottom={0} left={0} right={0} w={'100%'} minH={'60px'} flex={1}
                             bg={'linear-gradient(to top, ' + bgGradient + ', transparent)'}
                             zIndex={10}
                        />
                    </UnorderedList>
                    <Box flex={1} w={'100%'} display={'flex'} alignItems={'flex-end'}>
                        {adress !== -1
                            ? <Text textAlign={'center'} w={'100%'} _hover={{cursor: 'pointer'}}>открыть</Text>
                            : <Text textAlign={'center'} w={'100%'} _hover={{cursor: 'pointer'}}>Купить</Text>
                        }
                    </Box>
                </Flex>
            </Box>
            {/*                */}
            {/* Модальное окно */}
            {foo()}
        </Box>
    )
};

export default PostItem;