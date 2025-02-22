import React from 'react'
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const UserListScreen = () => {
    const { data: users, isLoading, error, refetch } = useGetUsersQuery();
    // console.log(users);

    const [deleteUser] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id);
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };
    return (
        <>
            <h1>UserListScreen</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {!user.isAdmin ? (
                                        <FaTimes style={{ color: 'red' }} />
                                    ) : (
                                        <FaCheck style={{ color: 'green' }} />
                                    )}
                                </td>
                                <td>
                                    
                                    <LinkContainer to={`/admin/user/${user._id}/edit`} disabled={user.isAdmin}>
                                        <Button variant='light' className='btn-sm'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <FaTrash style={{ color: 'white' }} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen;