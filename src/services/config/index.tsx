import axiosInstance from '@/modules/axios'
import Cookies from 'js-cookie'

interface PostData {
  applyInsulinSnack?: boolean
  useCarbsCalc?: boolean
}

const configServices = (): any => {
  const userToken = Cookies.get('userToken')

  const editConfig = async (props: PostData): Promise<any> => {
    return await axiosInstance.put('api/v1/Config', {
      ...props
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const getConfig = async (): Promise<any> => {
    return await axiosInstance.get('api/v1/Config', {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  return {
    editConfig,
    getConfig
  }
}

export default configServices
