import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!isAuthenticated) {
      setError('Please log in to view orders');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get (`${import.meta.env.VITE_BACKEND_URL}/api/payments/all`, {
        withCredentials: true
      });

      const data = response.data;

      if (data.success) {
        setOrders(data.data);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error fetching orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const isWithinDateRange = (orderDate, filter) => {
    const date = new Date(orderDate);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const orderDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    switch (filter) {
      case 'today':
        return orderDay.toDateString() === today.toDateString();
      case 'week':
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);
        return orderDay >= sevenDaysAgo && orderDay <= today;
      case 'month':
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 29);
        return orderDay >= thirtyDaysAgo && orderDay <= today;
      default:
        return true;
    }
  };

  const matchesSearch = (order) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    if (order.reference?.toLowerCase().includes(query)) return true;
    if (order.customer?.firstName?.toLowerCase().includes(query)) return true;
    if (order.customer?.lastName?.toLowerCase().includes(query)) return true;
    if (order.items?.some(item => item.productName?.productName?.toLowerCase().includes(query))) return true;
    <option value="processing">Processing</option>
    return false;
  };

  const filteredOrders = orders.filter(order => {
    return (
      (statusFilter === 'all' || order.status === statusFilter) &&
      (dateFilter === 'all' || isWithinDateRange(order.createdAt, dateFilter)) &&
      matchesSearch(order)
    );
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-success text-white';
      case 'pending':
        return 'bg-warning text-dark';
      case 'processing':
        return 'bg-info text-white';
      case 'failed':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  if (loading) {
    return (
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center mt-5 py-5">
        <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="card-body text-center p-5">
            <div className="spinner-border" style={{ color: '#91443f' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center mt-5 py-5">
        <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="card-body text-center p-5">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 py-5">
      <div className="row">
        <div className="col-12">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3 mb-1" style={{ color: '#91443f' }}>My Orders</h2>
            <Link to="/" className="btn" style={{ backgroundColor: '#91443f', color: 'white' }}>
              <FaHome className="me-2" />
              Back to Home
            </Link>
          </div>

          {/* Filters */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label small text-muted mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-select">
                    <option value="all">All Status</option>
                    <option value="success">Success</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label small text-muted mb-1">Date Range</label>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="form-select"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label small text-muted mb-1">Search</label>
                  <input
                    type="text"
                    placeholder="Search by reference or product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="card shadow-sm">
            <div className="card-body">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-0">
                    {searchQuery
                      ? "No orders found matching your search"
                      : "No orders found"}
                  </p>
                </div>
              ) : (
                <>
                  <div className="row g-4">
                    {currentOrders.map((order) => (
                      <div key={order._id} className="border-bottom p-4">
                        <div className="row">
                          {/* Left Labels */}
                          <div className="col-3">
                            <div className="d-flex flex-column gap-3">
                              <p className="text-muted small mb-0">Customer</p>
                              <p className="text-muted small mb-0">Products</p>
                              <p className="text-muted small mb-0">Amount</p>
                              <p className="text-muted small mb-0">Order Reference</p>
                              <p className="text-muted small mb-0">Date</p>
                            </div>
                          </div>

                          {/* Right Values */}
                          <div className="col-6">
                            <div className="d-flex flex-column gap-3 text-dark">
                              <p className="mb-0 fw-medium">
                                {order.customer?.firstName
                                  ? `${order.customer.firstName} ${order.customer.lastName || ''}`
                                  : 'N/A'}
                              </p>
                              <div>
                                {order.items && order.items.length > 0 ? (
                                  order.items.map((item, index) => (
                                    <div key={`${item.productId}-${index}`} className="d-flex justify-content-start align-items-center">
                                      <span className="fw-medium me-2">{item.productName || 'Unnamed Item'}</span>
                                      <span className="text-muted small">x{item.quantity}</span>
                                    </div>
                                  ))
                                ) : (
                                  <p className="mb-0 fw-medium">N/A</p>
                                )}
                              </div>
                              <p className="mb-0 fw-medium">₦{(order.totalAmount || 0).toLocaleString()}</p>
                              <p className="mb-0 fw-medium">{order.reference || 'N/A'}</p>
                              <p className="mb-0 fw-medium">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="col-3 text-end">
                            <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="mt-4">
                      <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                        </li>
                        {[...Array(totalPages).keys()].map(number => (
                          <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(number + 1)}>
                              {number + 1}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
