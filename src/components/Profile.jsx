import React, {useEffect, useState} from 'react';
import {Box, Container, Flex, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import {Link as ReactLink} from 'react-router-dom'
import CurseInProfile from "../API/CurseInProfile";
import AnimationLayout from "./AnimationLayout";
import {SpinnerIcon} from "@chakra-ui/icons";
import LoadingIcon from "./LoadingIcon";

const Profile = (props) => {
    const bgSubject = useColorModeValue('blackAlpha.700', '#383838')
    const [profileInCurse, setProfileInCurse] = useState()

    useEffect(() => {
        fetchProfileCurse()
    }, [])

    function fetchProfileCurse() {
        const result = CurseInProfile.getInfoAboutCurseInProfiel()
        let filter = new Map()
        result.then((value) => {
            value.curses.map((e) => {
                filter.set(e.subject.id, e.subject.title)
            })
            const filtr = Array.from(filter)
            setProfileInCurse(filtr)
        })
        // eslint-disable-next-line array-callback-return
        // result.curse.map((e)=>{setProfileInCurse([...profileInCurse,e.subject.title])})
    } /// получение всех курсов у пользователя

    return (
        <AnimationLayout>
            <Container minW={'container.xl'} mt={20}>
                {profileInCurse
                    ?
                    <>
                        <Text fontSize={'4xl'} fontWeight={'semi-bold'}>Мои предметы</Text>
                        <Flex gap={5}>
                            {profileInCurse.map((e, id) => {
                                return (
                                    <Flex key={id + 1000}>
                                        <Link key={id + 800} as={ReactLink} to={'subject/' + e[0]}>
                                            <Flex key={id + 123}
                                                  align={'center'}
                                                  w={'300px'}
                                                  paddingX={10}
                                                  paddingY={6}
                                                  justify={'space-between'}
                                                  borderRadius={'1em'}
                                                  bg={bgSubject}
                                                  color={'white'}
                                            >
                                                <Text key={id + 111} fontSize={'xl'} m={0}>
                                                    {e[1]}
                                                </Text>
                                                <Image key={id + 666}
                                                       ml={8}
                                                       src="https://2.shkolkovo.online/images/subjects/1-white.svg"
                                                       alt={'тут была картинка'}></Image>
                                            </Flex>
                                        </Link>
                                    </Flex>
                                )
                            })}
                        </Flex>
                    </>
                    :
                    <>
                        <LoadingIcon/>
                        <Text>У вас нет купленных курсов, вернитесь на главную и приобретите курс</Text>
                        <Link as={ReactLink} to={'/'}>На главную</Link>
                    </>
                }
            </Container>
        </AnimationLayout>
    );
};

export default Profile;