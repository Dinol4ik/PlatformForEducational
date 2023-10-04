import React, {useEffect, useState} from 'react';
import {
    AspectRatio,
    Box,
    Flex,
    Grid,
    GridItem,
    Image,
    Link,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {Link as ReactLink, useNavigate, useParams} from 'react-router-dom'
import SubjectInProfile from "../API/SubjectInProfile";
import AnimationLayout from "./AnimationLayout";
import Loader from "./Loader";
import LinkItem from "./Navigation/LinkItem";
import NavigationLink from "../UI/NavigationLink";
import SubjectLayout from "./Lessons/SubjectLayout";

const Subject = () => {
    const [curseInProfile, setCurseInProfie] = useState()
    const params = useParams()
    const bgColor = useColorModeValue('rgba(0, 0, 0, .05)', '#0c131c')
    const bgColorGridItem = useColorModeValue('rgba(0, 0, 0, .1)', 'rgba(255, 255, 255, .2)')
    const boxShadow = useColorModeValue('', '0 0 2px whitesmoke')
    const folderName = useColorModeValue('no-folder-light.png', 'no-folder-dark-transformed.png')

    useEffect(() => {
        fetchProfileCurse()
    }, [])

    async function fetchProfileCurse() {
        const result = await SubjectInProfile.getCurseInSubject(params.id)
        setCurseInProfie(result)
    }

    return (
        <AnimationLayout>
            <NavigationLink to={'/profile'} type={'back'}>Мои предметы</NavigationLink>
            <SubjectLayout>
                {curseInProfile
                    ? <Box
                        p={4}
                        borderRadius={'1em'}
                        bgColor={bgColor}
                        boxShadow={boxShadow}
                        minH={'70vh'}
                    >
                        <Text fontSize={'xl'} display={'inline'}>Курсы по предмету -&nbsp;
                            <Text as={'span'} fontWeight={'bold'} display={'inline'}>{curseInProfile.title}</Text>
                        </Text>
                        <Grid templateColumns={'repeat(auto-fit, minmax(200px, 1fr))'} mt={4} gap={4}>
                            {curseInProfile.curses.map((curses, id) => {
                                return (
                                    <GridItem
                                        _hover={{backgroundColor: bgColorGridItem}}
                                        borderRadius={'10px'}
                                        key={id}
                                        paddingX={'auto'}
                                        h={'max-content'}
                                        display={'flex'}
                                        justifyContent={'center'}
                                        marginX={'auto'}
                                    >
                                        <Link as={ReactLink} to={'' + curses.id}
                                              _hover={{textDecoration: 'none'}}>
                                            <AspectRatio ratio={1} maxW={'150px'} marginX={'auto'}>
                                                <Image
                                                    src={process.env.PUBLIC_URL + `/${folderName}`}
                                                    alt={'Тут была папка'}
                                                />
                                            </AspectRatio>
                                            <Text fontSize={'md'} textAlign={'justify'} marginX={2}>
                                                {curses.title}
                                            </Text>
                                        </Link>
                                    </GridItem>
                                )
                            })}
                        </Grid>
                    </Box>
                    :
                    <Loader/>
                }
            </SubjectLayout>
        </AnimationLayout>
    );
};

export default Subject;