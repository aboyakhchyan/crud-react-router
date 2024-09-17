import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import './user.css'
import { useEffect, useState } from 'react'
import { IForm, IUser } from '../../lib/types'
import { getUserData } from '../../lib/api'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'

interface LayoutContext {
    onChangeUser: (id: string | undefined, data: IForm) => void
}

const userSchema = yup.object({
    name: yup.string().required('The field is empty, please fill it out'),
    surname: yup.string().required('The field is empty, please fill it out'),
    age: yup.number().required('The field is empty, please fill it out').min(18, 'age must be over 18').max(100, 'age must be below 100'),
    salary: yup.number().required('The field is empty, please fill it out').min(50000, 'minimum salary starts from 50000')
}).required()

export const User = () => {

    const {onChangeUser} = useOutletContext<LayoutContext>()

    const [user, setUser] = useState<IUser>({
        id: '',
        name: '',
        surname: '',
        age: '',
        salary: ''
    })

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(() => {
        getUserData(id)
        .then(response => setUser(response))
        .catch(() => navigate('/'))
    }, [])

    const {register, handleSubmit, formState: {errors}, reset} = useForm<IForm>({
        resolver: yupResolver(userSchema)
    })

    const handleChangeUserData = (data: IForm) => {
        onChangeUser(id, data)
        toast('User changed!')
        reset()
        navigate('/')
    }

    const {name, surname, age, salary} = user

    return (
        <>
            <form onSubmit={handleSubmit(handleChangeUserData)}>
                <input 
                    type="text"
                    placeholder='Change name'
                    defaultValue={name}
                    {...register('name')}
                    />

                    {errors.name && <p style={{color: 'red'}}>{errors.name.message}</p>}

                <input 
                    type="text"
                    placeholder='Change surname'
                    defaultValue={surname}
                    {...register('surname')}
                    />

                    {errors.surname && <p style={{color: 'red'}}>{errors.surname.message}</p>}    

                <input 
                    type="text"
                    placeholder='Change age'
                    defaultValue={age + ''}
                    {...register('age')}
                    />

                    {errors.age && <p style={{color: 'red'}}>{errors.age.message}</p>}        

                <input 
                    type="text"
                    placeholder='Change salary'
                    defaultValue={salary + ''}
                    {...register('salary')}
                    />

                    {errors.salary && <p style={{color: 'red'}}>{errors.salary.message}</p>}

                <button>Edit</button>
                <button onClick={() => navigate('/')}>Back</button>
            </form>
        </>
    )
}