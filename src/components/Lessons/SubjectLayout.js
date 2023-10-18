import React, {useState} from "react";
import {Link as ReactLink, Outlet, useParams} from 'react-router-dom'
import {
    Box,
    Flex,
    IconButton,
    Link,
    List,
    ListItem,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import NavigationLink from "../../UI/NavigationLink";
import {ArrowLeftIcon, ArrowRightIcon} from "@chakra-ui/icons";

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
                <Text p={{base: 2, md: 3}} m={0}>
                    {title}
                </Text>
            </Link>
        </ListItem>
    )
}

export default function SubjectLayout() {
    const [show, setShow] = useState(true)
    const handleToggle = () => setShow(!show)

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

    if (res[5] !== undefined) {
        setNavigate = navigate.three
    } else if (res[3] !== undefined) {
        setNavigate = navigate.two
    } else
        setNavigate = navigate.one

    return (
        <Flex mt={'6em'} gap={10}>
            <Flex alignItems={'start'} justify={'center'}
                  bgColor={bgColor}
                  borderRightRadius={'1em'}
                  boxShadow={boxShadow}
                  display={{base: 'none', sm: 'flex'}}
                  pos={'relative'}
                  w={{base: '0', sm: show ? '250px' : '50px'}}
                  transition={'width 0.3s ease'}
            >
                <List pos={'sticky'} top={'6em'} spacing={3} p={2} m={0} display={show ? 'block' : 'none'}>
                    <MyListItem href={'#'} title={'Какая-то ссылка'}/>
                    <MyListItem href={'#'} title={'Другая ссылка'}/>
                    <MyListItem href={'#'} title={'Третья для примера'}/>
                    <MyListItem href={'#'} title={'...'}/>
                </List>
                <IconButton isRound={true} colorScheme='blue' aria-label='show' fontSize='10px' variant={'outline'}
                            bgColor={'whitesmoke'}
                            icon={show ? <ArrowLeftIcon/> : <ArrowRightIcon/>}
                            pos={'absolute'} top={'50%'} right={-5}
                            onClick={handleToggle}
                />
            </Flex>
            <Box w={'100%'} mr={{base: 0, sm: 6, md: 7, lg: 8}}>
                <NavigationLink to={setNavigate.href} type={'back'}>{setNavigate.title}</NavigationLink>

                {/* Остальной контент */}
                <Outlet/>
                {/* */}

            </Box>
        </Flex>
    );
};