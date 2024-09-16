import { Link, Outlet } from 'react-router-dom'
import './layout.css'
import { useEffect, useState } from 'react'
import { IForm, IUsers } from '../../lib/types'
import { addUserData, changeUserData, getUsersData, removeUserData } from '../../lib/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Layout = () => {

    const [users, setUsers] = useState<IUsers[]>([])

    useEffect(() => {
        getUsersData()
        .then(response => setUsers(response))
    }, [])

    const handleAddUser = (data: IForm): void => {
        addUserData(data)
        .then(response => setUsers([...users, response]))
    }

    const handleRemoveUser = (id: number | string): void => {
        removeUserData(id)
        .then(response => setUsers(users.filter(user => user.id != response.id)))
        toast('User removed!')
    }

    const handleChnageUser = (id: string | undefined, data: IForm): void => {
        changeUserData(id, data)
        .then(response => {
            users.map(user => 
                user.id == response.id ? [...users, response] : user
            )
        })
    }

    return (
        <>
            <nav>
                <Link to='/'>Users</Link>
                <Link to='/add'>AddUser</Link>
            </nav>
            <div className='main'>
                <Outlet context={{users, 
                                  onAddUser: handleAddUser, 
                                  onRemoveUser: handleRemoveUser,
                                  onChangeUser: handleChnageUser
                                  }} />
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

            />
        </>
    )
}