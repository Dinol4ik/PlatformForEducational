import React, {useCallback, useEffect, useState} from 'react';
import {Container, Flex, Grid, GridItem, HStack, Link, Text} from "@chakra-ui/react";
import {Link as ReactLink, useParams} from 'react-router-dom'
import CurseInProfile from "../API/CurseInProfile";
import SubectInProfile from "../API/SubjectInProfile";
const LinkItem = ({title, ...props}) => {
    return(
        <Link
            as={ReactLink}
            to={'/'}
            p={4}
            _hover={{bg: '#0399E9', color: 'white'}}
            {...props}
        >
            {title}
        </Link>
    )
}

const Subject = (props) => {
    const [curseInProfile, setCurseInProfie] = useState()
    const params = useParams()
useEffect(()=>{
    fetchProfileCurse()
},[])
    async function  fetchProfileCurse(){
            const result = await SubectInProfile.getCurseInSubject(params.id)
              setCurseInProfie(result)
              }
    return (
        <Container
            mt={20}
            minW={'100%'}
            minH={'100%'}
        >

            <Grid
                h={'100%'}
                minH={'600px'}
                templateColumns='250px 1fr'
                gap={10}
            >
                <GridItem minH={'100%'}>
                    <Flex
                        flexDir={'column'}
                        align={'left'}
                        borderRight={'1px solid white'}
                    >
                        <LinkItem as={ReactLink} to={'/'} title={'Видео уроки'} />
                        <LinkItem as={ReactLink} to={'/'} title={'Домашние задания'} />
                        <LinkItem as={ReactLink} to={'/'} title={'Каталог задач'} />
                    </Flex>
                </GridItem>

                <GridItem>
                    {curseInProfile

                        ?<>
                        <Text fontSize={'md'}>Предмет: {curseInProfile.title} </Text>
                            {curseInProfile.curses.map((curses,id)=>{ return <div key={id}>{curses}</div>})}
                        </>
                            :<Text fontSize={'3xl'}>Ничего нету</Text>
                        }
                </GridItem>
            </Grid>
        </Container>
    );
};

export default Subject;