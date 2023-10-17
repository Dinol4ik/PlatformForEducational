import React from "react";
import {Link as ReactLink, Outlet, useParams} from 'react-router-dom'
import {Box, Flex, Link, List, ListItem, Text, useColorModeValue} from "@chakra-ui/react";
import NavigationLink from "../../UI/NavigationLink";

const MyListItem = ({title, href}) => {
    const hoverBgColor = useColorModeValue('rgba(0, 0, 0, .1)', 'rgba(255, 255, 255, .3)')
    const hoverColor = useColorModeValue('', '')

    return (
        <ListItem
            _hover={{backgroundColor: hoverBgColor, color: hoverColor,}}
            borderRadius={'.7em'}
            bgColor={'rgba(0, 0, 0, .05)'}
        >
            <Link as={ReactLink} href={href} _hover={{textDecoration: 'none'}}>
                <Text p={2} m={0} ml={{base: 0, md: 5}} w={{base: 'fit-content', md: '150px'}}>
                    {title}
                </Text>
            </Link>
        </ListItem>
    )
}

export default function SubjectLayout() {
    const params = useParams()
    const navigate = {
        one: {
            href: '/profile',
            title: 'Мои предметы'
        },
        two: {
            href: '/profile/subject/' + params?.idSubject,
            title: 'Курсы'
        },
        three: {
            href: '/profile/subject/' + params?.idSubject + "/" + params?.idCourse,
            title: 'К выбору уроков'
        },
    }

    const bgColor = useColorModeValue('rgba(0, 0, 0, .05)', '#0c131c')
    const boxShadow = useColorModeValue('0 0 2px', '0 0 2px whitesmoke')

    const location = window.location.href.toString()
    let res = location.match("^https?\\:\\/\\/[a-zA-Z:0-9]+\\/profile\\/subject\\/([0-9]+)(\\/([0-9]+))?(\\/([0-9]+))?")
    let setNavigate

    if(res[5] !== undefined){
        setNavigate = navigate.three
    } else if(res[3] !== undefined){
        setNavigate = navigate.two
    } else
        setNavigate = navigate.one

    return (
        <Flex
            mt={'6em'}
            gap={10}
            direction={{base: 'column', sm: 'row'}}
        >
            <Flex
                alignItems={'start'}
                justify={'center'}
                minH={'100%'}
                bgColor={bgColor}
                borderRightRadius={'1em'}
                boxShadow={boxShadow}
                display={{base: 'none', sm: 'flex'}}
            >
                <List pos={'sticky'} top={'6em'} spacing={3} p={2} m={0}>
                    <MyListItem href={'#'} title={'Какая-то ссылка'}/>
                    <MyListItem href={'#'} title={'Другая ссылка'}/>
                    <MyListItem href={'#'} title={'Третья для примера'}/>
                    <MyListItem href={'#'} title={'...'}/>
                </List>
            </Flex>
            <Box w={'100%'} mr={7}>
                <NavigationLink to={setNavigate.href} type={'back'}>{setNavigate.title}</NavigationLink>

                {/* Остальной контент */}
                <Outlet/>

            </Box>
        </Flex>
    );
};