import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer1'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const RegisterScreen = () => {

    const [name , setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {search} = useLocation()
    const sp=new URLSearchParams(search);
    const redirect=sp.get('redirect') || '/'

    const [register, { isLoading, error }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        // console.log('submit');
        if(password !== confirmPassword){
            toast.error('Passwords do not match');
            return;
        }
        try {
            const res =  await register({ name, email, password }).unwrap();
            // login sends api to backend with body as email and password , and returns the user info as promise and we unwrap it. unwrap is a function that returns the value of a fulfilled promise or throws an error if the promise was rejected.
            dispatch(setCredentials({ ...res }));
            //res object is set on userInfo in authSlice
            navigate(redirect); 

        } catch (err) {
            toast.error(err?.data?.message || err.error );
        }
        
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange= {(e)=> setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange= {(e)=> setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={ (e)=> setPassword(e.target.value) }
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword' className='my-3'>
                    <Form.Label>confirmPassword</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password Again'
                        value={confirmPassword}
                        onChange={ (e)=> setConfirmPassword(e.target.value) }
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' onClick={submitHandler} className='my-3' disabled={isLoading}>
                    Sign Up
                </Button>

                {isLoading && <Loader />}

                <Row className='py-3'>
                    <Col>
                        Already have an account ?{' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            Login
                        </Link>
                    </Col>
                </Row>
            </Form>

        </FormContainer>
    )
}

export default RegisterScreen