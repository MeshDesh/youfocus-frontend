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
import React, { useState } from "react"
import { useHistory } from "react-router"
import { useAuth } from "../../hooks/useAuth"
import "./Onboarding.scss"

const OnboardingComponent: React.FC = () => {
    const [form, setForm] = useState({ profession: "", isLearning: true })
    const [formError, setFormError] = useState("")
    const history = useHistory()
    const auth = useAuth()
    const { user } = auth!
    const theme = {
        bg: useColorModeValue("#E2E8F0", "#171923"),
        text: useColorModeValue("black", "white"),
    }

    const toast = useToast()

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (form.profession === "") {
            setFormError("Please provide a profession")
            return false
        }
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
                history.push('/user')
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
                width="auto"
                padding={10}
                rounded="md"
                background={theme.bg}
                color={theme.text}
            >
                <form onSubmit={handleSubmit}>
                    <Stack spacing="5" justifyContent="flex-end" alignItems='flex-end'>
                        <div>
                            <label htmlFor="profession">
                                What is your profession?
                            </label>
                            <Input
                                margin="10px 0px"
                                display='block'
                                width="lg"
                                padding="10px"
                                className="form_input"
                                size="lg"
                                variant="filled"
                                onChange={(e) => {
                                    setFormError("")
                                    setForm({ ...form, profession: e.target.value })
                                }}
                                type="text"
                                name="profession"
                                placeholder="ex: Frontend Developer, Student etc."
                            ></Input>
                            {formError !== "" && (
                                <Text className="error" fontSize="lg">
                                    {formError}
                                </Text>
                            )}
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
                                <option defaultValue='yes' value="yes">
                                    Yes
                                </option>
                                <option value="no">No</option>
                            </Select>
                        </div>
                        <Button
                            type="submit"
                            width="100px"
                            size="lg"
                            colorScheme="blue"
                        >
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>
        </div>
    )
}

export default OnboardingComponent
