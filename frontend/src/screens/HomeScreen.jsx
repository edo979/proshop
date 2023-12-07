import { useParams, Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productsApiSlice.js'
import Meta from '../components/Meta.jsx'
import Product from '../components/Product'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import Paginate from './Paginate.jsx'
import ProductCarousel from '../components/ProductCarousel.jsx'

function HomeScreen() {
  const { pageNumber, keyword } = useParams()
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  })

  let content

  if (isLoading) {
    content = <Loader />
  } else if (error) {
    content = (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    )
  } else if (data.products.length > 0) {
    content = (
      <>
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Link to="/" className="btn btn-light mb-4">
            Go Back
          </Link>
        )}
        <Meta />
        <h1>Latest Products</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5 g-md-3 mb-3">
          {data.products.map((product) => (
            <Col key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </div>
        <Paginate
          pages={data.pages}
          page={data.page}
          keyword={keyword ? keyword : ''}
        />
      </>
    )
  } else {
    content = <Message variant="info">No Products Found</Message>
  }

  return content
}

export default HomeScreen
