import React, { useState } from "react";
import Footer from "./Footer";
import { useAsyncAPI } from "../api/api";
import { Header } from "./Header/Header";
import {
    Text,
    Input,
    Link,
    Heading,
    ThemeProvider,
    CSSReset,
    Checkbox,
    Stack,
    Flex,
    extendTheme,
    Center
} from "@chakra-ui/react"

export const LoginPage = ({ loginUser }) => {
    const [submitted, setSubmitted] = useState(false);
    const [isHandling, setIsHandling] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        remember: false
    });
    const [formErrors, setFormErrors] = useState({
        username: '',
        password: ''
    });
    const { userLogin } = useAsyncAPI();

    const validate = () => {
        let formErrors = {};
        let valid = true;

        if (!formData.username || formData.username.trim() === '') {
            formErrors.username = 'Username required!'
            valid = false;
        }
        if (!formData.password || formData.password.trim() === '') {
            formErrors.password = 'Password required!'
            valid = false;
        }
        setFormErrors(formErrors);
        return valid;
    }

    const handleUpdate = (e) => {
        const { name, value } = e.currentTarget;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const submitForm = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        } else {
            setFormErrors({
                username: '',
                password: ''
            });
            setIsHandling(true)
        }
        if (submitted || isHandling) return;
        setSubmitted(true);
        userLogin(formData.username, formData.password, handleResponse);
    }

    const handleResponse = (response) => {
        setSubmitted(false);
        if (!response) {
            setHasError(true);
            setIsHandling(false);
            return;
        }
        loginUser(response, formData.remember);
    }

    const customTheme = extendTheme({


        breakpoints:
        {
            colors: {},
            fonts: {},
            fontSzes: {},
            sm: "360px", //Galaxy s5
            md: "375px", //I phone X
            dt: "376px",
            lg: "960px",
            xl: "1200px",
        }

    })

    return (
        <Flex
            flexDir={'column'}
            minH={'100vh'}
        >
            <ThemeProvider theme={customTheme}>
                <CSSReset />
                <Header />
                <Heading as="h2" size="4x5" mb="6">
                    <Text fontSize={{ base: "20px", sm: "20px", md: "20px", lg: "35px", xl: "80px" }}> Rowanspace </Text>
                </Heading>
                <Center
                    w={'100%'}
                >
                    <Stack
                        w={{ base: '450px', sm: '350px', md: '350px', lg: '45%' }}
                        maxW={'600px'}
                    >
                        <Text>
                            Username
                        </Text>
                        <Input
                            name="username"
                            type="text"
                            placeholder="username"
                            onChange={handleUpdate} />

                        {formErrors.username && <Text>{formErrors.username}</Text>}

                        <Text>
                            Password
                        </Text>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleUpdate} />
                        {formErrors.password && <Text>{formErrors.password}</Text>}

                        <Checkbox
                            name="remember"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    [e.currentTarget.name]: e.currentTarget.checked
                                })
                            }
                        >
                            Remember me
                        </Checkbox>

                        <Input
                            className='button'
                            onClick={submitForm}
                            type='button'
                            value='Login' />

                        {hasError && <Text>Invalid Username or Password!</Text>}

                        <Link color="teal.500" href="/recover_password">Forgotten Password?</Link>

                        <Text>
                            Don't have an account? <Link color="teal.500" href="/register">Sign up here!</Link>
                        </Text>
                    </Stack>
                </Center>
                <Footer />
            </ThemeProvider>
        </Flex>
    )
}