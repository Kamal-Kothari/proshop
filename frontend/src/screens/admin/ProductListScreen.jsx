import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
import { useEffect } from 'react';

const ProductListScreen = () => {
    let { pageNumber } = useParams();
    pageNumber = pageNumber || 1;
    const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });
    // console.log(data.products); // gives error as data is undefined
    // console.log(data?.products); // works fine as it checks if data is undefined

    useEffect(() => {
        if (data) {
            console.log("API Response:", data?.products);
        }
    }, [data]);  // Runs when `data` is updated
    

    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        console.log(id);
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            refetch();
        }
    };

    const [createProduct, { isLoading: loadingCreate }] =
        useCreateProductMutation();
    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct();
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <>
            <Row>
                <Col>
                    <h1>ProductListScreen</h1>
                </Col >

                <Col className='text-end'>
                    <Button className='mx-3' onClick={createProductHandler}>
                        Create Product <FaEdit />
                    </Button>
                </Col>

            </Row>
            {loadingCreate && <Loader />}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            <FaTrash style={{ color: 'white' }} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* PAGINATE PLACEHOLDER */}
                    {data.pages > 1 && <Paginate pages={data.pages} page={data.page} isAdmin={true} /> }
                </>
            )}
        </>
    )
}

export default ProductListScreen