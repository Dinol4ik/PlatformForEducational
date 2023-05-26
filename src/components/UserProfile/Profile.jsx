import React, {useEffect, useState} from 'react';
import {
    AspectRatio,
    Box,
    Container,
    Flex,
    Grid,
    Image,
    Link,
    Progress,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {Link as ReactLink} from 'react-router-dom'
import CurseInProfile from "../../API/CurseInProfile";
import AnimationLayout from "../AnimationLayout";
import StatisticApi from "../../API/TaskApi/StatisticApi";
import Title from "../Title";
import NavigationLink from "../../UI/NavigationLink";

const SvgImage = ({name, ...props}) => {
    return (
        <Box h={'30px'}>
            <Image alt={'image'} src={process.env.PUBLIC_URL + name.toString()} {...props}/>
        </Box>
    )
}

const Profile = (props) => {
    const bgSubject = useColorModeValue('rgba(0, 0, 0, .09)', '#383838')
    const bgColorForProgress = useColorModeValue('rgba(0, 0, 0, .2)', 'rgba(255, 255, 255, .2)')
    const colorSubject = useColorModeValue('black', 'white')
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
            <Text fontSize={'4xl'} fontWeight={'semi-bold'}>Мои предметы</Text>
            {profileInCurse &&
                <Grid templateColumns={'repeat(auto-fill, minmax(300px, 1fr))'} gap={3}>
                    {profileInCurse.map((subject, id) => {
                        return (
                            <Link key={id + 800} as={ReactLink} to={'subject/' + subject[0]}>
                                <Flex key={id + 123}
                                      align={'center'}
                                      w={'minmax(250px, 320px)'}
                                      paddingX={10} paddingY={6}
                                      justify={'space-between'}
                                      borderRadius={'1em'}
                                      bg={bgSubject} color={colorSubject}
                                >
                                    <Text key={id + 111} fontSize={'xl'} m={0}>
                                        {subject[1]}
                                    </Text>
                                    {(subject[1] === "Математика") &&
                                        <SvgImage name={'1-white.svg'} w={'100%'}/>
                                    }
                                    {(subject[1] === "Русский язык") &&
                                        <SvgImage name={'2-white.svg'} w={'35px'}/>
                                    }
                                    {(subject[1] === "Химия") &&
                                        <SvgImage name={'11-white.svg'} w={'35px'}/>
                                    }
                                    {(subject[1] === "Физика") &&
                                        <SvgImage name={'4-white.svg'} w={'32px'}/>
                                    }
                                </Flex>
                            </Link>
                        )
                    })}
                </Grid>
            }
            <Text fontSize={'4xl'} fontWeight={'semi-bold'} mt={10}>Моя статистика</Text>
            {profileStatistic &&
                <>
                    <Flex justify={'space-between'}>
                        <Text m={0} p={0}>
                            РЕШЕНО ЗАДАЧ - {Math.round(profileStatistic.statistic, 2)}%
                        </Text>
                        <NavigationLink mb={2} p={0} type={'forward'} to={'statistic'}>Подробнее</NavigationLink>
                    </Flex>
                    <Progress
                        value={Math.round(profileStatistic.statistic, 2)}
                        colorScheme={'green'}
                        bgColor={bgColorForProgress}/>
                </>
            }
        </AnimationLayout>
    );
};

export default Profile;