import React, {useEffect, useState} from 'react';
import {Box, Container, Flex, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import {Link as ReactLink} from 'react-router-dom'
import CurseInProfile from "../../API/CurseInProfile";
import AnimationLayout from "../AnimationLayout";
import {SpinnerIcon} from "@chakra-ui/icons";
import Loader from "../Loader";
import StatisticApi from "../../API/TaskApi/StatisticApi";

const Profile = (props) => {
    const bgSubject = useColorModeValue('blackAlpha.700', '#383838')
    const [profileInCurse, setProfileInCurse] = useState()
    const [profileStatistic, setProfileStatistic] = useState()

    useEffect(() => {
        fetchProfileCurse()
        fetchProfileStatistic()
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

    async function fetchProfileStatistic() {
        const result = await StatisticApi.getStatisticsUser(localStorage.getItem('UserProfileId'))
        setProfileStatistic(result)
    }

    return (
        <AnimationLayout>
            <Container minW={'container.xl'} mt={20}>
                {profileInCurse &&
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
                }
                 {profileStatistic
                                            ?<ReactLink to={'statistic'}><div style={{textAlign:'center', marginTop:'30%'}}>РЕШЕНО ЗАДАЧ - {profileStatistic.statistic}%</div></ReactLink>
                                            :<div>Подгрузка</div>
                                        }
            </Container>
        </AnimationLayout>
    )
        ;
};

export default Profile;