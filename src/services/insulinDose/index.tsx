import axiosInstance from '@/modules/axios'

interface PostData {
  amount: number
  correction: number
  idTypeInsulin: number
  userToken: string
}

interface PutData {
  id: number
  amount: number
  correction: number
  idTypeInsulin: number
  userToken: string
}

const insulinDoseServices = (): any => {
  const getInsulinDose = async (id: number): Promise<any> => {
    return await axiosInstance.get(`api/v1/InsulinDose/${id}`)
  }

  const getInsulinDoses = async (userToken: string): Promise<any> => {
    return await axiosInstance.get('api/v1/InsulinDose', {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const createInsulinDose = async ({
    amount,
    correction,
    idTypeInsulin,
    userToken
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
    idTypeInsulin,
    userToken
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
