
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Spinner, Form, Modal } from 'react-bootstrap';

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(10);
  const [filters, setFilters] = useState({ category: '', priceRange: [0, 1000], rating: 0 });
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const API_URL = 'https://fakestoreapi.com/products';

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [products, filters, sortOrder]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSorting = () => {
    let updatedProducts = [...products];

    // Apply filters
    if (filters.category) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.priceRange) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1]
      );
    }

    if (filters.rating) {
      updatedProducts = updatedProducts.filter(
        (product) => product.rating && product.rating.rate >= filters.rating
      );
    }

    // Apply sorting
    if (sortOrder === 'lowToHigh') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: name === 'rating' ? parseFloat(value) : value }));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 10);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">E-commerce Product Dashboard</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Select name="category" onChange={handleFilterChange}>
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select name="sortOrder" onChange={handleSortChange}>
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Control
            type="number"
            name="rating"
            placeholder="Minimum Rating"
            onChange={handleFilterChange}
          />
        </Col>
      </Row>

      <Row>
        {filteredProducts.slice(0, visibleProducts).map((product, index) => (
          <Col key={product.id} md={3} className="mb-4">
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top lazy"
                alt={product.title}
                loading="lazy"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <Button variant="primary" onClick={() => openModal(product)}>
                  View Details
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {visibleProducts < filteredProducts.length && (
        <div className="text-center">
          <Button onClick={handleLoadMore} variant="secondary">
            Load More
          </Button>
        </div>
      )}

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {selectedProduct && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="img-fluid mb-3 lazy"
              loading="lazy"
            />
            <p>{selectedProduct.description}</p>
            <p>Price: ${selectedProduct.price}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ProductDashboard;