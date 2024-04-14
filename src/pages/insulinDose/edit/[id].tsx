import InsulinDoseForm from '@/components/InsulinDoseForm'
import insulinDoseServices from '@/services/insulinDose'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface InsulinDose {
  id: number
  amount: number
  correction: number
  idTypeInsulin: number
}

export default function EditInsulin(): React.ReactElement {
  const router = useRouter()
  const { id } = router.query
  const [insulinData, setInsulinData] = useState({})

  const fetchData = async (): Promise<void> => {
    try {
      if (id !== '' && typeof id === 'string') {
        const { data } = await insulinDoseServices().getInsulinDose(id)
        setInsulinData(data as InsulinDose)
      }
    } catch (error) {
      console.error('Error fetching insulin dose data:', error)
    }
  }

  useEffect(() => {
    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [id])

  return (
    <InsulinDoseForm initialValues={insulinData} />
  )
}
