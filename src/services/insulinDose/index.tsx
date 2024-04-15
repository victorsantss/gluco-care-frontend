import axiosInstance from '@/modules/axios'
import Cookies from 'js-cookie'

interface PostData {
  amount: number
  correction: number
  idTypeInsulin: number
}

interface PutData {
  id: number
  amount: number
  correction: number
  idTypeInsulin: number
}

const insulinDoseServices = (): any => {
  const userToken = Cookies.get('userToken')

  const getInsulinDose = async (id: number): Promise<any> => {
    return await axiosInstance.get(`api/v1/InsulinDose/${id}`)
  }

  const getInsulinDoses = async (): Promise<any> => {
    return await axiosInstance.get('api/v1/InsulinDose', {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const createInsulinDose = async ({
    amount,
    correction,
    idTypeInsulin
  }: PostData): Promise<any> => {
    return await axiosInstance.post('api/v1/InsulinDose', {
      amount,
      correction,
      idTypeInsulin
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const editInsulinDose = async ({
    id,
    amount,
    correction,
    idTypeInsulin
  }: PutData): Promise<any> => {
    return await axiosInstance.put(`api/v1/InsulinDose/${id}`, {
      id,
      amount,
      correction,
      idTypeInsulin
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const deleteInsulinDose = async (id: number, userToken: string): Promise<any> => {
    return await axiosInstance.delete(`api/v1/InsulinDose/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  return {
    getInsulinDose,
    getInsulinDoses,
    createInsulinDose,
    editInsulinDose,
    deleteInsulinDose
  }
}

export default insulinDoseServices
