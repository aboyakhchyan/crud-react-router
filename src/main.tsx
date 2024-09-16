import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './pages/Layout/layout.tsx'
import { UserList } from './pages/UserList/user-list.tsx'
import { AddUser } from './pages/AddUser/add-user.tsx'
import { User } from './pages/User/user .tsx'

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {path: '', element: <UserList />},
      {path: '/add', element: <AddUser />},
      {path: '/user/:id', element: <User />}
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
