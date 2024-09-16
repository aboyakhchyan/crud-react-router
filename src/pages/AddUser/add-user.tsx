import { useForm } from 'react-hook-form'
import './add-user.css'
import { IForm } from '../../lib/types'
import { useNavigate, useOutletContext } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify';

interface LayoutContext {
    onAddUser: (data: IForm) => void
}

const userSchema = yup.object({
    name: yup.string().required('The field is empty, please fill it out'),
    surname: yup.string().required('The field is empty, please fill it out'),
    age: yup.number().required('The field is empty, please fill it out').min(18, 'age must be over 18').max(100, 'age must be below 100'),
    salary: yup.number().required('The field is empty, please fill it out').min(50000, 'minimum salary starts from 50000')
}).required()

export const AddUser = () => {

    const navigate = useNavigate()

    const {onAddUser} = useOutletContext<LayoutContext>()

    const {register, handleSubmit, formState: {errors}, reset} = useForm<IForm>({
        resolver: yupResolver(userSchema)
    })

    const handleSaveUser = (data: IForm): void => {
        onAddUser(data)
        toast('User added!')
        reset()
        navigate('/')
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleSaveUser)}>
                <input 
                    type="text" 
                    placeholder='Input name'
                    {...register('name')}
                    />

                    {errors.name && <p style={{color: 'red'}}>{errors.name.message}</p>}

               <input 
                    type="text" 
                    placeholder='Input surname'
                    {...register('surname')}
                    />

                    {errors.surname && <p style={{color: 'red'}}>{errors.surname.message}</p>}

                    <input 
                    type="text" 
                    placeholder='Input age'
                    {...register('age')}
                    />

                    {errors.age && <p style={{color: 'red'}}>{errors.age.message}</p>}

                    <input 
                    type="text" 
                    placeholder='Input salary'
                    {...register('salary')}
                    />

                    {errors.salary && <p style={{color: 'red'}}>{errors.salary.message}</p>}

                    <button>Save</button>
            </form>
        </>
    )
}