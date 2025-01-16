import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer1'
import { addShippingAddress } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId='address' className='my-3'>
                    <Form.Label>enter Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city' className='my-3'>
                    <Form.Label>enter city</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalcode' className='my-3'>
                    <Form.Label>enter postalcode</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postalCode'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='country' className='my-3'>
                    <Form.Label>enter country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer >
    )
}

export default ShippingScreen