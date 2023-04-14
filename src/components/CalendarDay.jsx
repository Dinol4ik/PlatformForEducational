import React, {useState} from 'react';
import {
    Badge,
    Box,
    Card,
    CardBody,
    CardHeader,
    Flex,
    GridItem,
    Text,
    useColorModeValue
} from "@chakra-ui/react";

const CalendarDay = (props) => {

    let sovpadenie = 0
    const dateDay = new Date(`${props.year}.${props.month}.${props.date}`)
    let testing = []
    props.lessons.map((value) => {
            let a = new Map()
            const test = new Date(value.dateTime)
            const test3 = (test.toLocaleDateString('ko-KR'))
            const test5 = (test.toLocaleString('ru', {
                hour: '2-digit',
                minute: '2-digit',
            }))
            const test2 = new Date(test3)
            a.set('date', test2.getTime())
            a.set('time', test5)
            a.set('title', value.title)
            a.set('subject', value.curse.subject.title)
            a.set('curse', value.curse.title)
            if (a.get('date') === dateDay.getTime()) {
                sovpadenie = 1
                testing.push(a)
            }
        }
    )
    return (

        <>
            {sovpadenie
                ?
                <GridItem position={'relative'} minH={70} pb={2} boxShadow={'base'}
                    // bg={useColorModeValue('blackAlpha.200', 'whiteAlpha.400')}
                          {...props}>
                    <Box
                        as={'span'}
                        position={'absolute'} top={1} left={1}
                        fontSize={'12px'}
                        fontWeight={'semibold'}
                        // color={useColorModeValue('light', 'dark')}
                    >
                        {props.date}
                    </Box>

                    <Card marginX={3} ml={5} mt={2}>
                        {React.Children.toArray(testing.map((value) => {
                            return <><CardHeader  marginX={2} mt={1} p={0}>
                                <Flex  fontSize={'12px'} fontWeight={'500'} align={'base-line'}>
                                    <Badge  colorScheme='green' mr={1}>
                                        {value.get('time')}
                                    </Badge>
                                    {value.get('subject')}

                                </Flex>
                            </CardHeader>
                                <CardBody  paddingX={2} paddingY={1}>
                                    <Text  fontSize='12px'>
                                        {value.get('title')}->
                                        {value.get('curse')}
                                    </Text>
                                </CardBody>
                            </>
                        }))}

                    </Card>

                </GridItem>
                : <GridItem position={'relative'} minH={70} pb={2} boxShadow={'base'}
                    // bg={useColorModeValue('blackAlpha.200', 'whiteAlpha.400')}
                            {...props}>
                    <Box
                        as={'span'}
                        position={'absolute'} top={1} left={1}
                        fontSize={'12px'}
                        fontWeight={'semibold'}
                        // color={useColorModeValue('light', 'dark')}
                    >
                        {props.date}
                    </Box>
                    <Card marginX={3} ml={5} mt={2}>
                        <CardHeader marginX={2} mt={1} p={0}>
                            <Flex fontSize={'12px'} fontWeight={'500'} align={'base-line'}>
                                <Badge colorScheme='green' mr={1}>

                                </Badge>

                            </Flex>
                        </CardHeader>
                        <CardBody paddingX={2} paddingY={1}>
                            <Text fontSize='12px'>


                            </Text>
                        </CardBody>
                    </Card>
                </GridItem>

            }

        </>

    );
};

export default CalendarDay;