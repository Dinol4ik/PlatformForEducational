import React, {useEffect, useState} from 'react';
import axios from "axios";
import SectionApi from "../../API/TaskApi/SectionApi";
import {Link} from "react-router-dom";
import AnimationLayout from "../AnimationLayout";
import Loader from "../Loader";
import {Box, Container, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import Title from "../Title";

const TaskList = () => {
    const [section, setSection] = useState()
    const bgColor = useColorModeValue('rgba(0, 0, 0, .2)', 'rgba(255, 255, 255, .2)')

    useEffect(() => {
        fetchSection()
    }, [])

    async function fetchSection() {
        const result = await SectionApi.getAllSection()

        setSection(result)
    }

    return (
        <AnimationLayout>
            {section
                ? <>
                    <Title>Задачи</Title>
                    {section.map(value =>
                        <Box key={value.id}>
                            <Text m={0}>{value.title}</Text>
                            <>
                                {value.section.map(theme =>
                                    <Box
                                        w={'max-content'} paddingX={3} ml={'30px'} mb={1} key={theme.id}
                                        _hover={{backgroundColor: bgColor, borderRadius: '4px'}}
                                    >
                                        <Link to={'theme/' + theme.id} key={theme.id}>
                                            {theme.title}
                                        </Link>
                                    </Box>)
                                }
                            </>
                        </Box>)}
                </>
                :
                <Flex w={'100%'} h={'400px'} aligh={'center'} justify={'center'}>
                    <Loader/>
                </Flex>
            }
        </AnimationLayout>
    );
};

export default TaskList;