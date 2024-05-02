import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/admin/Layout.jsx';
import Dashboard from './components/admin/Dashboard.jsx';
import Blogs from './components/admin/Blogs.jsx';
import AddBlog from './components/admin/AddBlog.jsx';
import EditBlog from './components/admin/EditBlog.jsx';
import Home from './components/Home.jsx';
import Blog from './components/Blog.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';

const router = (
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/admin" element={<App />} />
      <Route path="/admin" element={<Layout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/blogs" element={<Blogs />} />
        <Route path="/admin/add-blog" element={<AddBlog />} />
        <Route path="/admin/edit-blog/:slug" element={<EditBlog />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>{router}</Provider>
  </React.StrictMode>
);
