import React, { useEffect, useState } from "react"
import {
    Input,
    Flex,
    Box,
    Stack,
    Text,
    Textarea,
    Button,
    useToast,
    Alert,
    AlertIcon,
} from "@chakra-ui/react"
import "./feeback-form.scss"
import axios from "axios"

const FeedbackForm: React.FC = () => {
    const [rating, setRating] = useState(0)
    const [formError, setFormError] = useState('')
    const [hover, setHover] = useState(0)
    const [form, setForm] = useState({ email: "", rating: 1, feedbackMessage: "" })
    const toast  = useToast()

    useEffect(() => {
        setForm({ ...form, rating })
    }, [rating])

    const handleFeedbackSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if(rating === 0){
            setFormError('Please Provide A Rating')
            return false
        }
        axios
            .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/feedback`, form)
            .then(() => {
                toast({
                    duration: 2000,
                    position: 'top',
                    render: () => (
                        <Alert variant='solid' size='md' status='success'>
                            <AlertIcon />
                            <Text fontSize='xl' fontWeight='medium' fontFamily='Inter, sans-serif'>Thank you for the feedback! ❤</Text>
                        </Alert>
                    ),
                    isClosable: true
                })
            })
            .catch((error) => {
                toast({
                    duration: 2000,
                    position: 'top',
                    render: () => (
                        <Alert variant='solid' size='md' status='error'>
                            <AlertIcon />
                            <Text fontSize='xl' fontWeight='medium' fontFamily='Inter, sans-serif'>{error.message}</Text>
                        </Alert>
                    ),
                    isClosable: true
                })
            })
    }

    return (
        <form className="feedback_form" onSubmit={handleFeedbackSubmit}>
            <Stack spacing={4}>
                <Flex>
                    <label htmlFor="email">Email</label>
                    <Input
                        name="email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        size="lg"
                        margin='0px 10px'
                        type="text"
                        id="email"
                    ></Input>
                </Flex>
                <Flex margin="10px 0px">
                    <label htmlFor="rating">Rating</label>
                    <Box className="rating">
                        {[...Array(5)].map((rate, i) => {
                            i += 1
                            return (
                                <button
                                    type="button"
                                    key={i}
                                    className={
                                        i <= (hover || rating) ? "rated" : "unrated"
                                    }
                                    onClick={() => setRating(i)}
                                    onMouseEnter={() =>{ setHover(i); setFormError('')}}
                                    onMouseLeave={() => setHover(rating)}
                                >
                                    <span className="heart">&#10084;</span>
                                </button>
                            )
                        })}
                    </Box>
                </Flex>
                {formError && <p className='error'>{formError}</p>}
                <Stack spacing={2} direction="column">
                    <label htmlFor="feedback">Feedback Message</label>
                    <Textarea
                        onChange={(e) =>
                            setForm({ ...form, feedbackMessage: e.target.value })
                        }
                        name="feedback"
                        fontSize="12px"
                    ></Textarea>
                </Stack>
                <Button
                    colorScheme="blue"
                    type="submit"
                    size="lg"
                    fontSize="14px"
                    fontWeight="medium"
                >
                    Submit
                </Button>
            </Stack>
        </form>
    )
}

export default FeedbackForm
