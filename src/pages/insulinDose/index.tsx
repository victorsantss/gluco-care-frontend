import Image from 'next/image'
import { type GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Header } from '@/components/Header'
import { NewRegisterButton, StyledDataGrid, TableAddButton, TableContainer } from '../../styles/InsulinDoseStyles'
import ActionsModal from '@/components/DeleteModal'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Main } from '../../styles/HomeStyles'
import insulinDoseServices from '@/services/insulinDose'
import insulinServices from '@/services/insulin'
import ContentHeader from '@/components/ContentHeader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import addIcon from '../../assets/add_icon.png'
import HeadContent from '@/components/Head'

interface InsulinDose {
  id: number
  amount: number
  correction: number
  idTypeInsulin: number
}

interface Insulin {
  id: number
  nameInsulin: string
  individualApplication: boolean
  typesInsulin: number
}

export default function Home(): React.ReactElement {
  const router = useRouter()

  const [insulinDoseData, setInsulinDoseData] = useState<InsulinDose[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [insulinDoseId, setInsulinDoseId] = useState<number | null>(null)
  const [insulinNamesData, setInsulinNamesData] = useState<Insulin[]>([])

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
    setInsulinDoseId(null)
  }

  const fetchData = async (): Promise<void> => {
    try {
      const { data } = await insulinDoseServices().getInsulinDoses()
      const { data: insulinTypes } = await insulinServices().getInsulins()

      const insulinNames = insulinTypes.map((insulin: Insulin) => {
        return {
          id: insulin.id,
          nameInsulin: insulin.nameInsulin
        }
      })

      setInsulinNamesData(insulinNames as Insulin[])
      setInsulinDoseData(data as InsulinDose[])
    } catch (error) {
      console.error('Error fetching insulin dose data:', error)
    }
  }

  useEffect(() => {
    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [])

  const handleEdit = async (insulinDose: InsulinDose): Promise<void> => {
    await router.push(`/insulinDose/edit/${insulinDose.id}`)
  }

  const handleDeleteWrapper = (id: number | null): void => {
    handleDelete(id).catch((error) => {
      toast.error('Erro ao deletar a dose de insulina')
      console.error('Error deleting insulin dose:', error)
    })
  }

  const handleDelete = async (id: number | null): Promise<void> => {
    try {
      await insulinDoseServices().deleteInsulinDose(id)

      setIsModalOpen(false)
      setInsulinDoseData(insulinDoseData.filter((insulinDose) => insulinDose.id !== id))
    } catch (error) {
      console.error('Error deleting insulin dose:', error)
    }
  }

  const columns: Array<GridColDef<(typeof rows)[number]>> = [
    {
      field: 'idTypeInsulin',
      headerName: 'Tipo de Insulina',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => insulinNamesData.find((insulin) => insulin.id === params.value)?.nameInsulin
    },
    {
      field: 'amount',
      headerName: 'Quantidade',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'correction',
      headerName: 'Correção',
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
            setInsulinDoseId(params.row.id)
          }}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ]

  const rows = insulinDoseData.map((insulinDose) => {
    return {
      id: insulinDose.id,
      amount: insulinDose.amount,
      correction: insulinDose.correction,
      idTypeInsulin: insulinDose.idTypeInsulin
    }
  })

  return (
    <>
      <ToastContainer />
      <HeadContent title="Doses de Insulina" />
      <Header />
      <Main>
        <Container>
          <ContentHeader goBackUrl='/' title='Doses de Insulina' />
          <TableContainer>
            <TableAddButton>
              <Link href="/insulinDose/create">
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
              id={insulinDoseId}
              onClose={handleCloseModal}
              onConfirmDelete={(id) => { handleDeleteWrapper(id) }}
            />
          </TableContainer>
        </Container>
      </Main>
    </>
  )
}
