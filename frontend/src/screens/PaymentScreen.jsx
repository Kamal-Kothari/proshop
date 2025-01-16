import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer1'
import CheckoutSteps from '../components/CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import { addPaymentMethod } from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'

const PaymentScreen = () => {

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  // const [fav_language, setFav_language] = useState('HTML');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { shippingAddress, cartItems } = cart;
  // console.log("shippingAddress is ",shippingAddress);

  // if(shippingAddress?.address){
  //   console.log("shippingAddress is ",shippingAddress);
  // }else{
  //   console.log("no shipping address");
  // }
  // if(Object.keys(shippingAddress).length > 0){
  //   console.log("shippingAddress is ",shippingAddress);
  // }else{
  //   console.log("no shipping address");
  // }
  

  useEffect(() => {
    if (!cartItems.length) {
      navigate('/cart');
    }

    if (!shippingAddress?.address) {
      console.log("no shipping address");
      
      navigate('/shipping');
    }
  }, [shippingAddress, navigate,cartItems]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addPaymentMethod(paymentMethod));
    console.log(paymentMethod);
    // console.log(fav_language);
    
    

    navigate('/placeorder');
  }

  

  return (
    <FormContainer >
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method </h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
            </Form.Check>


          </Col>
        </Form.Group>



        <Button type='submit' variant='primary' className='my-3'>Continue</Button>
        {/* <br />
        <input type="radio" id="html" name="fav_language" value="HTML" checked={fav_language === 'HTML'} onChange={(e) => setFav_language(e.target.value)} />
        <label htmlFor="html">HTML</label><br />
        <input type="radio" id="css" name="fav_language" value="CSS" checked={fav_language === 'CSS'} onChange={(e) => setFav_language(e.target.value)} />
        <label htmlFor="css">CSS</label><br />
        <input type="radio" id="javascript" name="fav_language" value="JavaScript" checked={fav_language === 'JavaScript'} onChange={(e) => setFav_language(e.target.value)} />
        <label htmlFor="javascript">JavaScript</label> */}

      </Form>
    </FormContainer>



  )
}

export default PaymentScreen