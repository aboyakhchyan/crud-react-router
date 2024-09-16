import axios from "axios";
import { IForm, IUser, IUsers } from "./types";

export const getUsersData = async (): Promise<IUsers[]> => {
    const response = await axios.get(`http://localhost:3004/users`)
    
    return response.data
}

export const getUserData = async (id: string| undefined ): Promise<IUser> => {
    const response = await axios.get(`http://localhost:3004/users/${id}`)

    return response.data
}

export const addUserData = async (data: IForm): Promise<IUsers> => {
    const response = await axios.post(`http://localhost:3004/users`, data)

    return response.data
}

export const removeUserData = async (id: number | string): Promise<IUsers> => {
    const response = await axios.delete(`http://localhost:3004/users/${id}`)

    return response.data
}

export const changeUserData = async (id: string | undefined, data: IForm): Promise<IUsers> => {
    const response = await axios.put(`http://localhost:3004/users/${id}`, data)

    return response.data
}