import React from 'react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const SearchBox = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword ||'')

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            setKeyword(''); // clear the search box in next render
            navigate(`/search/${keyword.trim()}`);
        } else {
            navigate('/')
        }
    };

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
                className='mr-sm-2 ml-sm-5'
                value={keyword}
            ></Form.Control>
            <Button type='submit' variant='outline-light' className='p-2 mx-1'>
                <FaSearch></FaSearch>
            </Button>
        </Form>
    )
}

export default SearchBox