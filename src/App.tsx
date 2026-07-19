import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Shop from './pages/Shop/Shop';
import ProductDetails from './pages/Product/ProductDetails';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Wishlist from './pages/Wishlist/Wishlist';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/Error/NotFound';
import Contact from './pages/Contact/Contact';
import LegalPage from './pages/Legal/LegalPage';

// Home Components
import HeroBanner from './components/home/HeroBanner';
import FeaturedCategories from './components/home/FeaturedCategories';
import FeaturedProducts from './components/home/FeaturedProducts';
import Reviews from './components/home/Reviews';
import Newsletter from './components/home/Newsletter';

// Admin Components
import AdminRoute from './routes/AdminRoute';
import AdminLayout from './admin/layout/AdminLayout';
import AdminDashboard from './admin/Dashboard/AdminDashboard';
import ProductsList from './admin/Products/ProductsList';
import AddProduct from './admin/Products/AddProduct';
import EditProduct from './admin/Products/EditProduct';
import OrdersList from './admin/Orders/OrdersList';
import CategoriesList from './admin/Categories/CategoriesList';
import CustomersList from './admin/Customers/CustomersList';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        {/* Global Toast Notification */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#3B0A0A',
              color: '#FFD700',
              fontWeight: '500',
              borderRadius: '8px',
              padding: '16px',
            },
          }}
        />

        <Routes>
          {/* Public Routes with Navbar and Footer */}
          <Route path="/" element={<MainLayout />}>
            {/* Index Route - Homepage */}
            <Route
              index
              element={
                <>
                  <HeroBanner />
                  <FeaturedCategories />
                  <FeaturedProducts />
                  <Reviews />
                  <Newsletter />
                  {/* Additional homepage sections will be added here */}
                </>
              }
            />

            {/* Other routes will be added here as we build them */}
            <Route path="profile" element={<Profile />} />
            <Route path="contact" element={<Contact />} />
            <Route path="legal/:slug" element={<LegalPage />} />
            {/* Shop Page Route */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>

          {/* Auth Routes (Without Main Navbar) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Protected Admin Routes (No Navbar/Footer) */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              {/* Future admin pages (Products, Categories, Orders) will be added here */}
              <Route path="products" element={<ProductsList />} />
              <Route path="products/new" element={<AddProduct />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
              <Route path="orders" element={<OrdersList />} />
              <Route path="categories" element={<CategoriesList />} />
              <Route path="customers" element={<CustomersList />} />
            </Route>
          </Route>
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}