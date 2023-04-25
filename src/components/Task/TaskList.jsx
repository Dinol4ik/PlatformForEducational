import React, {useEffect, useState} from 'react';
import axios from "axios";
import SectionApi from "../../API/TaskApi/SectionApi";
import {Link} from "react-router-dom";
import AnimationLayout from "../AnimationLayout";
import Loader from "../Loader";
import {Box, Container, Flex, useColorModeValue} from "@chakra-ui/react";

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
                ?
                <Container maxW={'container.xl'} mt={10}>
                    {/*{console.log(section)}*/}
                    {section.map(value =>
                        <Box key={value.id} mb={1}>
                            {value.title}
                            <Box>
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
                            </Box>
                        </Box>)}
                </Container>
                :
                <Flex w={'100%'} h={'400px'} aligh={'center'} justify={'center'}>
                    <Loader/>
                </Flex>
            }
        </AnimationLayout>
    );
};

export default TaskList;