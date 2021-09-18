import {
    Box,
    Stack,
    useColorModeValue,
    Select,
    Input,
    Alert,
    AlertIcon,
    Text,
    Button,
    useToast,
} from "@chakra-ui/react"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useAuth } from "../../hooks/useAuth"
import "./Onboarding.scss"

const FieldOptions = [
    "Developer",
    "Designer",
    "Marketing",
    "Sales",
    "Student",
    "Other",
]

const OnboardingComponent: React.FC = () => {
    const [form, setForm] = useState({ fieldOfWork: FieldOptions[0], isLearning: true })
    const history = useHistory()
    const auth = useAuth()
    const { user } = auth!

    useEffect(() => {
        if(user === null){
            history.push('/')
        }
    },[user])

    useEffect(() => {
        console.log(form)
    }, [form])

    const theme = {
        bg: useColorModeValue("#E2E8F0", "#171923"),
        text: useColorModeValue("black", "white"),
    }

    const toast = useToast()

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        axios
            .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/onboarding`, {
                form,
                user,
            })
            .then(() => {
                toast({
                    duration: 2000,
                    position: "top",
                    render: () => (
                        <Alert variant="solid" size="md" status="success">
                            <AlertIcon />
                            <Text
                                fontSize="xl"
                                fontWeight="medium"
                                fontFamily="Inter, sans-serif"
                            >
                                Onboarding Successful
                            </Text>
                        </Alert>
                    ),
                    isClosable: true,
                })
                history.push("/playlists")
            })
            .catch((error) => {
                toast({
                    duration: 2000,
                    position: "top",
                    render: () => (
                        <Alert variant="solid" size="md" status="error">
                            <AlertIcon />
                            <Text
                                fontSize="xl"
                                fontWeight="medium"
                                fontFamily="Inter, sans-serif"
                            >
                                {error.message}
                            </Text>
                        </Alert>
                    ),
                    isClosable: true,
                })
            })
    }

    return (
        <div className="onboarding_base">
            <Box
                maxWidth="800px"
                padding={10}
                rounded="md"
                height="auto"
                background={theme.bg}
                color={theme.text}
            >
                <form onSubmit={handleSubmit}>
                    <Stack
                        spacing="5"
                        margin="10px 0px"
                        justifyContent="flex-end"
                        alignItems="flex-start"
                    >
                        <Box margin="10px 0px">
                            <Text as="h1" fontSize="24px">
                                Welcome to Playfocus
                            </Text>
                            <Text as="h4" fontSize="lg">
                                Please provide few details
                            </Text>
                        </Box>
                        <div>
                            <label htmlFor="profession">
                                What is your field of work?
                            </label>
                            <Select
                                cursor="pointer"
                                margin="10px 0px"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        fieldOfWork: e.target.value,
                                    })
                                }
                                size="lg"
                                variant="filled"
                                width="lg"
                            >
                                {FieldOptions.map((option, i) => (
                                    <option
                                        key={i}
                                        defaultValue={FieldOptions[0]}
                                        value={option}
                                    >
                                        {option}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="learning">
                                Would you use this for learning?
                            </label>
                            <Select
                                cursor="pointer"
                                margin="10px 0px"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        isLearning:
                                            e.target.value === "yes" ? true : false,
                                    })
                                }
                                size="lg"
                                variant="filled"
                                width="lg"
                            >
                                <option defaultValue="yes" value="yes">
                                    Yes
                                </option>
                                <option value="no">No</option>
                            </Select>
                        </div>
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            width="100%"
                        >
                            <Button
                                type="submit"
                                width="100px"
                                size="lg"
                                colorScheme="blue"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Box>
        </div>
    )
}

export default OnboardingComponent
