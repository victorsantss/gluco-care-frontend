import InsulinForm from '@/components/InsulinForm'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Insulin {
  id: number
  nameInsulin: string
  individualApplication: boolean
  typesInsulin: number
}

export default function EditInsulin (): React.ReactElement {
  const router = useRouter()
  const { id } = router.query
  const [insulinData, setInsulinData] = useState({})

  const fetchData = async (): Promise<void> => {
    try {
      if (id !== '' && typeof id === 'string') {
        const response = await fetch(`https://localhost:7041/api/v1/Insulin/${id}`)
        const data: Insulin = await response.json()
        setInsulinData(data)
      }
    } catch (error) {
      console.error('Error fetching insulin data:', error)
    }
  }

  useEffect(() => {
    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [id])

  return (
    <InsulinForm initialValues={insulinData} />
  )
}
