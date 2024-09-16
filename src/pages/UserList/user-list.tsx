import { Link, useOutletContext } from 'react-router-dom'
import './user-list.css'
import { IUsers } from '../../lib/types'


interface LayoutContext {
    users: IUsers[]
    onRemoveUser: (id: number | string) => void
}

export const UserList = () => {

    const {users, onRemoveUser} = useOutletContext<LayoutContext>()

    return (
        <div className='user-list'>
            {
                users.map(user => {

                    // applied distructuring
                    const {id, name, surname, age, salary} = user

                    return (
                        <div key={id} className='user-item'>
                            <p>name : {name}</p>
                            <p>surname : {surname}</p>
                            <p>age : {age}</p>
                            <p>salary : {salary}</p>
                            <button onClick={() => onRemoveUser(id)}>Delete</button>
                            <Link to={'/user/' + id}>Edit</Link>
                        </div>
                    )
                }
                )
            }
        </div>
    )
}