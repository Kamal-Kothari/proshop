import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer1';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
    useGetUserDetailsQuery,
    useUpdateUserMutation,
} from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
// import { useDispatch } from 'react-redux';


const UserEditScreen = () => {
    const { id: userId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const {
        data: user,
        isLoading,
        error,
        refetch,
    } = useGetUserDetailsQuery(userId);
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res= await updateUser({ _id: userId, name, email, isAdmin });
            toast.success('user updated successfully');
            // dispatch(setCredentials({ ...res }));

            refetch();
            navigate('/admin/userList');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <Link to='/admin/userList' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>
                        {error?.data?.message || error.error}
                    </Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-2' controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlId='isAdmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>
                        <Button type='submit' variant='primary' disabled={loadingUpdate} className='my-3' >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};
export default UserEditScreen;