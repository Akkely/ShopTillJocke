import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './views/Home.jsx';
import ProductEdit from './views/ProductEdit.jsx';
import Products from './views/Products.jsx';
import ProductDetail from './views/ProductDetail.jsx';
import CartView from './views/CartView.jsx';
import Test from './views/Test.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartDetail from './views/CartDetail'; // Import your component



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/products/new',
        element: <ProductEdit />
      },
      {
        path: '/products/:id/edit',
        element: <ProductEdit />
      },
      {
        path: '/products/',
        element: <Products />
      },
      {
        path: '/carts/:id',
        element: <CartView/>
      },
    
      {
        path: '/products/:id',
        element: <ProductDetail />
      },
      {
        path: '/users/:id/products',
        element: <Products />
      },
      {
        path: '/carts',
        element: <CartView />
      }
    ]
  }
]);
 


    
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);
