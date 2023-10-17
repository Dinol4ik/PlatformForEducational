import React, {Suspense, useEffect, useState} from 'react';
import {AspectRatio, Box, Flex, Grid, GridItem, Image, Link, Text, useColorModeValue} from "@chakra-ui/react";
import {Link as ReactLink, useParams} from 'react-router-dom'
import SubjectInProfile from "../API/SubjectInProfile";

async function fetchProfileCurse(id) {
    return await SubjectInProfile.getCurseInSubject(id)
}

const Subject = () => {
    const [curseInProfile, setCurseInProfie] = useState([])
    const params = useParams()

    const bgColor = useColorModeValue('rgba(0, 0, 0, .05)', '#0c131c')
    const bgColorGridItem = useColorModeValue('rgba(0, 0, 0, .1)', 'rgba(255, 255, 255, .2)')
    const boxShadow = useColorModeValue('0 0 2px', '0 0 2px whitesmoke')
    const folderName = useColorModeValue('no-folder-light.png', 'no-folder-dark-transformed.png')

    useEffect(() => {
        fetchProfileCurse(params.id)
            .then(res => setCurseInProfie(res))
    }, [])

    return (
        <Box p={4} borderRadius={'1em'} bgColor={bgColor} boxShadow={boxShadow} minH={'70vh'} mx={{base: 4, sm: 0}}>
            <Text as={Flex} justifyContent={'center'} fontWeight={'bold'} fontSize={'xl'}>
                {curseInProfile.title}
            </Text>
            <Grid templateColumns={'repeat(auto-fit, minmax(200px, 1fr))'} mt={4} gap={4}>
                {curseInProfile?.curses?.map((curses, id) => {
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
                            <Link as={ReactLink} to={'' + curses.id} _hover={{textDecoration: 'none'}}>
                                <AspectRatio ratio={1} maxW={'150px'} marginX={'auto'}>
                                    <Image src={process.env.PUBLIC_URL + `/${folderName}`} alt={'папка'}/>
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
    );
};

export default Subject;