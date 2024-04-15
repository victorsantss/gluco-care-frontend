import axiosInstance from '@/modules/axios'
import Cookies from 'js-cookie'

interface PostData {
  nameInsulin: string
  individualApplication: boolean
  typesInsulin: number
}

interface PutData {
  id: number
  nameInsulin: string
  individualApplication: boolean
  typesInsulin: number
}

const insulinServices = (): any => {
  const userToken = Cookies.get('userToken')

  const getInsulin = async (id: number): Promise<any> => {
    return await axiosInstance.get(`api/v1/Insulin/${id}`)
  }

  const getInsulins = async (): Promise<any> => {
    return await axiosInstance.get('api/v1/Insulin', {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const createInsulin = async ({
    nameInsulin,
    individualApplication,
    typesInsulin
  }: PostData): Promise<any> => {
    return await axiosInstance.post('api/v1/Insulin', {
      nameInsulin,
      individualApplication,
      typesInsulin
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const editInsulin = async ({
    id,
    individualApplication,
    nameInsulin,
    typesInsulin
  }: PutData): Promise<any> => {
    return await axiosInstance.put(`api/v1/Insulin/${id}`, {
      id,
      nameInsulin,
      individualApplication,
      typesInsulin
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const deleteInsulin = async (id: number): Promise<any> => {
    return await axiosInstance.delete(`api/v1/Insulin/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  return {
    getInsulin,
    getInsulins,
    createInsulin,
    editInsulin,
    deleteInsulin
  }
}

export default insulinServices
