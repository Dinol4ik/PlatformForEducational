import React from 'react';
import {Container, Flex, Grid, GridItem, HStack, Link, Text} from "@chakra-ui/react";
import {Link as ReactLink} from 'react-router-dom'

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

const Subject = () => {
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
                    <Text fontSize={'md'}>Предмет: Математика</Text>
                    <Text fontSize={'3xl'}>Тут какой-то текст</Text>
                </GridItem>
            </Grid>
        </Container>
    );
};

export default Subject;