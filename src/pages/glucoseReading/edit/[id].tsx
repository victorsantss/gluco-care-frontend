import GlucoseReadingForm from '@/components/GlucoseReadingForm'
import glucoseReadingServices from '@/services/glucoseReading'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface GlucoseReading {
  id: number
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

export default function EditGlucoseReading(): React.ReactElement {
  const router = useRouter()
  const { id } = router.query
  const [glucoseReadingData, setGlucoseReadingDataData] = useState<GlucoseReading>()

  const fetchData = async (): Promise<void> => {
    try {
      if (id !== '' && typeof id === 'string') {
        const { data } = await glucoseReadingServices().getGlucoseReading(id)
        setGlucoseReadingDataData(data as GlucoseReading)
      }
    } catch (error) {
      console.error('Error fetching glucose reading data:', error)
    }
  }

  useEffect(() => {
    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [id])

  return (
    <GlucoseReadingForm initialValues={glucoseReadingData} />
  )
}
