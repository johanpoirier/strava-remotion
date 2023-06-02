import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Cabin from '@remotion/google-fonts/Cabin';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';

Cabin.loadFont('normal', { weights: ['400', '700'] });
Cabin.loadFont('italic', { weights: ['400'] });

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<RouterProvider router={router} />);
