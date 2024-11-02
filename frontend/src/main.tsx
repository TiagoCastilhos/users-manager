import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home.tsx';
import Login from './pages/login.tsx';
import Register from './pages/register.tsx';
import Manage from './pages/manage.tsx';
import App from './app.tsx';
import { ProtectedRoute } from './pages/protected-route.tsx';
import Admin from './pages/admin.tsx';
import { getUsers } from './services/users-service.ts';
import { getAuthenticatedUser } from './services/authentication-service.ts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true, element: <Navigate to="/home" replace />
      },
      {
        path: "/home",
        element: <Home></Home>,

      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/manage",
        element:
          <ProtectedRoute>
            <Manage></Manage>
          </ProtectedRoute>,
      },
      {
        path: "/admin",
        element:
          <ProtectedRoute adminOnly={true}>
            <Admin></Admin>
          </ProtectedRoute>,
        loader: async () => {
          const authenticaton = getAuthenticatedUser()
          return await getUsers(authenticaton!);
        },
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
