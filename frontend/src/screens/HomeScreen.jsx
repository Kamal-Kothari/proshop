import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery, useGetTopProductsQuery } from '../slices/productsApiSlice';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import { Link } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data = [], error, isLoading } = useGetProductsQuery({ pageNumber, keyword });
  const { data: topProducts = [], error: topError, isLoading: topLoading } = useGetTopProductsQuery();


  return (
    <>
      {keyword ? (<Link to='/' className='btn btn-light'>Go Back</Link>)
        : (
          <>
            <h3>Top Rated Products</h3>
            {/* <Row>
              {topProducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row> */}
            <ProductCarousel products={topProducts} />
          </>
        )
      }
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center">
            <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
          </div>
        </>
      )}

    </>
  );
};

export default HomeScreen;
