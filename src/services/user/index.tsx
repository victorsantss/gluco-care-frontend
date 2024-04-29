import axiosInstance from '@/modules/axios'
import Cookies from 'js-cookie'

interface PostData {
  name?: string
  email: string
  password: string
}

const userServices = (): any => {
  const userToken = Cookies.get('userToken')

  const createUser = async ({
    name,
    email,
    password
  }: PostData): Promise<any> => {
    return await axiosInstance.post('api/v1/User', {
      name,
      email,
      password
    })
  }

  const loginUser = async ({
    email,
    password
  }: PostData): Promise<any> => {
    return await axiosInstance.post('api/v1/User/login', {
      email,
      password
    })
  }

  const editUser = async ({
    email,
    name
  }: PostData): Promise<any> => {
    return await axiosInstance.put('api/v1/User', {
      email,
      name
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const getUser = async (): Promise<any> => {
    return await axiosInstance.get('api/v1/User', {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  return {
    createUser,
    loginUser,
    editUser,
    getUser
  }
}

export default userServices
