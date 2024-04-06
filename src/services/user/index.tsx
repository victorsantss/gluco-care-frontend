import axiosInstance from '@/modules/axios'

interface PostData {
  name?: string
  email: string
  password: string
}

const userServices = (): any => {
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

  return {
    createUser,
    loginUser
  }
}

export default userServices
