import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context";
import ProfileId from "../API/profileAPI";
import {Box, Flex, Link} from "@chakra-ui/react";
import AnimationLayout from "./AnimationLayout";
import {motion} from "framer-motion";

const Login = () => {
    const {setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const pathVariants = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            fill: "#fff",
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            fill: "#0399E9",
            transition: {
                fill: {
                  delay: 4,
                },
                duration: 1.5,
                delay: 0.5,
                ease: "easeInOut",
            }
        }
    }
    const textVariants = {
        hidden: {
            x: -30,
            opacity: 0,
        },
        visible: {
            x: [-30, -30, -30, -30, 0],
            opacity: 1,
            animate: {
                duration: 5,
                ease: "easeOut",
            }
        }
    }

    useEffect(() => {
        const strGET = window.location.search.replace('?token=', '');
        if (strGET !== "") {
            setIsAuth('true')
            localStorage.setItem('auth', 'true')
            localStorage.setItem('token', strGET)
            fetchProfileId()
            setTimeout(() => {
                navigate("/")
            }, 2000)
        }
    }, [])

    async function fetchProfileId() {
        const profile = await ProfileId.getProfileId();
        localStorage.setItem('profileId', profile.id)
    }

    return (
        <AnimationLayout>
            <Flex align={'center'} justify={'center'} h={500}>
                <motion.div
                    style={{borderRadius: '1em', border: '1px solid #0399E9'}}
                    whileHover={{
                        boxShadow: '0 0 25px #0399E9',
                    }}
                >
                    <Link
                        display={'flex'}
                        alignItems={'center'}
                        gap={2}
                        border={'1px solid #0399E9'}
                        borderRadius={'10px'}
                        p={'1.75em 4em'}
                        fontSize={'28px'}
                        href='https://oauth.vk.com/authorize?client_id=51587230&display=page&redirect_uri=http://127.0.0.1:8000/token&scope=friends,email&response_type=code&v=5.131'
                        _hover={{textDecoration: 'none'}}>
                        <motion.svg width="40" height="23" viewBox="0 0 38 23" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                            <motion.path fill-rule="evenodd" clip-rule="evenodd"
                                         d="M36.976 1.558c.292-.89 0-1.558-1.243-1.558h-4.165c-1.023 0-1.535.594-1.827 1.187 0 0-2.119 5.194-5.115 8.607-.95.964-1.388 1.26-1.9 1.26-.292 0-.658-.296-.658-1.186v-8.31C22.068.52 21.776 0 20.9 0h-6.503a.99.99 0 00-1.023.965c0 1.038 1.461 1.26 1.68 4.08v6.232c0 1.336-.219 1.633-.804 1.633-1.388 0-4.822-5.268-6.869-11.204C7.015.52 6.577.074 5.554.074H1.388C.22.074 0 .668 0 1.261 0 2.374 1.388 7.94 6.577 15.21c3.434 4.97 8.257 7.716 12.641 7.716 2.631 0 2.997-.594 2.997-1.632V17.51c0-1.187.219-1.41 1.096-1.41.584 0 1.68.297 4.165 2.745C30.253 21.665 30.764 23 32.299 23h4.165c1.17 0 1.754-.593 1.462-1.78-.366-1.188-1.681-2.894-3.508-4.897-.95-1.188-2.411-2.375-2.85-3.042-.585-.817-.438-1.188 0-1.855-.146-.223 4.896-7.42 5.408-9.868z"
                                         fill="#fff" fill-opacity="0" stroke="#0399E9" stroke-linecap="butt"
                                         stroke-width="1.5" variants={pathVariants} initial="hidden" animate="visible"
                            />
                        </motion.svg>
                        <motion.div
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Box fontWeight={'bold'} color={'#0399E9'}>
                                Войти
                            </Box>
                        </motion.div>
                    </Link>
                </motion.div>
            </Flex>
        </AnimationLayout>
    );
};

export default Login;