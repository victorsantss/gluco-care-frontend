import axiosInstance from '@/modules/axios'

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
  const getInsulin = async (id: number): Promise<any> => {
    return await axiosInstance.get(`api/v1/Insulin/${id}`)
  }

  const getInsulins = async (): Promise<any> => {
    return await axiosInstance.get('api/v1/Insulin')
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
    })
  }

  const deleteInsulin = async (id: number): Promise<any> => {
    return await axiosInstance.delete(`api/v1/Insulin/${id}`)
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
