import React from 'react';
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

    return (
        <GridItem position={'relative'} minH={70} pb={2} boxShadow={'base'}
                  bg={useColorModeValue('blackAlpha.200', 'whiteAlpha.400')}
                  {...props}>
            <Box
                as={'span'}
                position={'absolute'} top={1} left={1}
                fontSize={'12px'}
                fontWeight={'semibold'}
                color={useColorModeValue('light', 'dark')}
            >
                {props.date}
            </Box>
            <Card marginX={3} ml={5} mt={2}>
                <CardHeader marginX={2} mt={1} p={0}>
                    <Flex fontSize={'12px'} fontWeight={'500'} align={'base-line'}>
                        <Badge colorScheme='green' mr={1}>
                            12:00
                        </Badge>
                        Математика
                    </Flex>
                </CardHeader>
                <CardBody paddingX={2} paddingY={1}>
                    <Text fontSize='12px'>

                    </Text>
                </CardBody>
            </Card>
        </GridItem>
    );
};

export default CalendarDay;