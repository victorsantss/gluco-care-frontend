import axiosInstance from '@/modules/axios'
import Cookies from 'js-cookie'

interface PostData {
  valueGlucose: number
  mealType: string
  proteinAmount: number
  carbohydrateAmount: number
  calorieAmount: number
  idTypeInsulin: number
}

const glucoseReadingServices = (): any => {
  const userToken = Cookies.get('userToken')

  const calculateSuggestedDose = async ({
    valueGlucose,
    mealType,
    proteinAmount,
    carbohydrateAmount,
    calorieAmount,
    idTypeInsulin
  }: PostData): Promise<any> => {
    return await axiosInstance.post('api/v1/GlucoseReading/CalculateSuggestedDose', {
      valueGlucose,
      mealType,
      proteinAmount,
      carbohydrateAmount,
      calorieAmount,
      idTypeInsulin
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
  }

  return {
    calculateSuggestedDose
  }
}

export default glucoseReadingServices
