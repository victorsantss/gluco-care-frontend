import Image from 'next/image'
import { type GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Header } from '@/components/Header'
import { NewRegisterButton, StyledDataGrid, TableAddButton, TableContainer } from '../../styles/GlucoseReadingStyles'
import ActionsModal from '@/components/DeleteModal'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Main } from '../../styles/HomeStyles'
import ContentHeader from '@/components/ContentHeader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import addIcon from '../../assets/add_icon.png'
import HeadContent from '@/components/Head'
import glucoseReadingServices from '@/services/glucoseReading'

interface GlucoseReading {
  id: number
  readingDateTime: string
  timeOnly: string
  mealType: string
  valueGlucose: number
  insulinDose: number
}

export default function Home(): React.ReactElement {
  const router = useRouter()

  const [glucoseReadingData, setGlucoseReadingData] = useState<GlucoseReading[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [glucoseReadingId, setGlucoseReadingId] = useState<number | null>(null)

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
    setGlucoseReadingId(null)
  }

  const fetchData = async (): Promise<void> => {
    try {
      const { data } = await glucoseReadingServices().getGlucoseReadings()

      setGlucoseReadingData(data as GlucoseReading[])
    } catch (error) {
      console.error('Error fetching glucose reading data:', error)
    }
  }

  useEffect(() => {
    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [])

  const handleEdit = async (glucoseReading: GlucoseReading): Promise<void> => {
    await router.push(`/glucoseReading/edit/${glucoseReading.id}`)
  }

  const handleDeleteWrapper = (id: number | null): void => {
    handleDelete(id).catch((error) => {
      toast.error('Erro ao deletar Leitura de Glicose')
      console.error('Error deleting Glucose Reading:', error)
    })
  }

  const handleDelete = async (id: number | null): Promise<void> => {
    try {
      await glucoseReadingServices().deleteGlucoseReading(id)

      setIsModalOpen(false)
      setGlucoseReadingData(glucoseReadingData.filter((glucoseReading) => glucoseReading.id !== id))
    } catch (error) {
      console.error('Error deleting glucose reading:', error)
    }
  }

  const columns: Array<GridColDef<(typeof rows)[number]>> = [
    {
      field: 'readingDateTime',
      headerName: 'Dia',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'timeOnly',
      headerName: 'Hora',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'mealType',
      headerName: 'Refeição',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'valueGlucose',
      headerName: 'Glicose',
      type: 'number',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'insulinDose',
      headerName: 'Dose Aplicada',
      type: 'number',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          <IconButton onClick={() => { void handleEdit(params.row) }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => {
            setIsModalOpen(true)
            setGlucoseReadingId(params.row.id)
          }}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ]

  const formatUTCDateToBrazilian = (utcDate: string): string => {
    const date = new Date(utcDate)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Months are 0-based
    const year = date.getUTCFullYear()

    return `${day}/${month}/${year}`
  }

  const rows = glucoseReadingData.map((glucoseReading) => {
    return {
      id: glucoseReading.id,
      readingDateTime: formatUTCDateToBrazilian(glucoseReading.readingDateTime),
      timeOnly: glucoseReading.timeOnly,
      mealType: glucoseReading.mealType,
      valueGlucose: glucoseReading.valueGlucose,
      insulinDose: glucoseReading.insulinDose
    }
  })

  return (
    <>
      <ToastContainer />
      <HeadContent title="Registros de Leituras" />
      <Header />
      <Main>
        <Container>
          <ContentHeader title='Registros de Leituras' />
          <TableContainer>
            <TableAddButton>
              <Link href="/glucoseReading/create">
                <NewRegisterButton type="button">
                  Novo Registro
                  <Image src={addIcon} alt="Add" width={26} height={26} />
                </NewRegisterButton>
              </Link>
            </TableAddButton>
            <StyledDataGrid
              rows={rows}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              columns={columns}
              disableRowSelectionOnClick
              autoHeight
              slots={{
                noRowsOverlay: () => (
                  <Box
                    sx={{
                      display: 'flex',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    Sem registros
                  </Box>
                )
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5
                  }
                }
              }}
              pageSizeOptions={[5]}
            />
            <ActionsModal
              isOpen={isModalOpen}
              id={glucoseReadingId}
              onClose={handleCloseModal}
              onConfirmDelete={(id) => { handleDeleteWrapper(id) }}
            />
          </TableContainer>
        </Container>
      </Main>
    </>
  )
}
