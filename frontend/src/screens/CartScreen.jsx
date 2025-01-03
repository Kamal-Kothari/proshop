import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import Message from '../components/Message';
import { FaTrash } from 'react-icons/fa';

const CartScreen = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems, totalItems, totalPrice, itemsPrice } = cart;

    const addToCartHandler = (item, qty) => {
        dispatch(addToCart({ ...item, qty }));
    }

    return (
        <>
            <h1>CartScreen</h1>
            <Link className='btn btn-light my-3' to='/'>
                Go Back to Homescreen
            </Link>

            {cartItems.length === 0 ? (
                <Message variant='info'>
                    Your cart is empty <Link to='/'>Go Back</Link>
                </Message>
            ) : (
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item._id}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            ${item.price}
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as='select'
                                                value={item.qty}
                                                onChange={(e)=>{addToCartHandler(item, Number(e.target.value))}}
                                            >
                                                {[...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type='button' variant='light' >
                                                <FaTrash />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>
                                        Subtotal ({totalItems}) items
                                    </h2>
                                    <p>Item Price : ${itemsPrice} </p>
                                    <p>
                                    Total Price : ${totalPrice}
                                    </p>
                                </ListGroup.Item>
                            </ListGroup>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cartItems.length === 0} style={{margin: '10px auto', display: 'block'}}>
                                    Proceed to Checkout
                                </Button>
                            </ListGroup.Item>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default CartScreen