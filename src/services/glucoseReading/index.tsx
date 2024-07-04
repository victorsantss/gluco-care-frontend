import axiosInstance from '@/modules/axios'
import Cookies from 'js-cookie'

interface CalculateSuggestedDoseData {
  valueGlucose: number
  mealType: string
  proteinAmount: number
  carbohydrateAmount: number
  calorieAmount: number
  idInsulinDose: number
}

interface PostData {
  valueGlucose: number
  readingDateTime: string
  mealType: string
  proteinAmount: number
  carbohydrateAmount: number
  calorieAmount: number
  idTypeInsulin: number
  insulinDose: number
  idTypeInsulinSecond: number
  insulinDoseSecond: number
  timeOnly: string
}

interface PutData extends PostData {
  id: number
}

const glucoseReadingServices = (): any => {
  const userToken = Cookies.get('userToken')

  const getGlucoseReading = async (id: number): Promise<any> => {
    return await axiosInstance.get(`api/v1/GlucoseReading/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const getGlucoseReadings = async (): Promise<any> => {
    return await axiosInstance.get('api/v1/GlucoseReading', {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const calculateSuggestedDose = async ({
    valueGlucose,
    mealType,
    proteinAmount,
    carbohydrateAmount,
    calorieAmount,
    idInsulinDose
  }: CalculateSuggestedDoseData): Promise<any> => {
    return await axiosInstance.post('api/v1/GlucoseReading/CalculateSuggestedDose', {
      valueGlucose,
      mealType,
      proteinAmount,
      carbohydrateAmount,
      calorieAmount,
      idInsulinDose
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const createGlucoseReading = async ({
    valueGlucose,
    readingDateTime,
    mealType,
    proteinAmount,
    carbohydrateAmount,
    calorieAmount,
    idTypeInsulin,
    insulinDose,
    idTypeInsulinSecond,
    insulinDoseSecond,
    timeOnly
  }: PostData): Promise<any> => {
    return await axiosInstance.post('api/v1/GlucoseReading', {
      valueGlucose,
      readingDateTime,
      mealType,
      proteinAmount,
      carbohydrateAmount,
      calorieAmount,
      idTypeInsulin,
      insulinDose,
      idTypeInsulinSecond,
      insulinDoseSecond,
      timeOnly
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const editGlucoseReading = async ({
    id,
    valueGlucose,
    readingDateTime,
    mealType,
    proteinAmount,
    carbohydrateAmount,
    calorieAmount,
    idTypeInsulin,
    insulinDose,
    idTypeInsulinSecond,
    insulinDoseSecond,
    timeOnly
  }: PutData): Promise<any> => {
    return await axiosInstance.put(`api/v1/GlucoseReading/${id}`, {
      id,
      valueGlucose,
      readingDateTime,
      mealType,
      proteinAmount,
      carbohydrateAmount,
      calorieAmount,
      idTypeInsulin,
      insulinDose,
      idTypeInsulinSecond,
      insulinDoseSecond,
      timeOnly
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  const deleteGlucoseReading = async (id: number): Promise<any> => {
    return await axiosInstance.delete(`api/v1/GlucoseReading/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  return {
    getGlucoseReading,
    getGlucoseReadings,
    calculateSuggestedDose,
    createGlucoseReading,
    editGlucoseReading,
    deleteGlucoseReading
  }
}

export default glucoseReadingServices
