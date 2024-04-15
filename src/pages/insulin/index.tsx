import Head from 'next/head'
import Image from 'next/image'
import { type GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Header } from '@/components/Header'
import { NewRegisterButton, StyledDataGrid, TableAddButton, TableContainer } from './styles'
import ActionsModal from '@/components/DeleteModal'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Main } from '../styles'
import insulinServices from '@/services/insulin'
import ContentHeader from '@/components/ContentHeader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Insulin {
  id: number
  nameInsulin: string
  individualApplication: boolean
  typesInsulin: number
}

export default function Home(): React.ReactElement {
  const router = useRouter()

  const [insulinData, setInsulinData] = useState<Insulin[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [insulinId, setInsulinId] = useState<number | null>(null)
  const insulinTypes = ['Ultra-rápida', 'Rápida', 'Intermediária', 'Lenta']

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
    setInsulinId(null)
  }

  const fetchData = async (): Promise<void> => {
    try {
      const { data } = await insulinServices().getInsulins()

      setInsulinData(data as Insulin[])
    } catch (error) {
      console.error('Error fetching insulin data:', error)
    }
  }

  useEffect(() => {
    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [])

  const handleEdit = async (insulin: Insulin): Promise<void> => {
    await router.push(`/insulin/edit/${insulin.id}`)
  }

  const handleDeleteWrapper = (id: number | null): void => {
    handleDelete(id).catch((error) => {
      toast.error('Erro ao deletar insulina')
      console.error('Error deleting insulin:', error)
    })
  }

  const handleDelete = async (id: number | null): Promise<void> => {
    try {
      await insulinServices().deleteInsulin(id)

      setIsModalOpen(false)
      setInsulinData(insulinData.filter((insulin) => insulin.id !== id))
    } catch (error) {
      console.error('Error deleting insulin:', error)
    }
  }

  const columns: Array<GridColDef<(typeof rows)[number]>> = [
    {
      field: 'nameInsulin',
      headerName: 'Nome',
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'individualApplication',
      headerName: 'Aplicação Individual',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => ((params.value as boolean) ? 'Sim' : 'Não')
    },
    {
      field: 'typesInsulin',
      headerName: 'Tipo de Insulina',
      type: 'number',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => insulinTypes[params.value - 1]
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
            setInsulinId(params.row.id)
          }}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ]

  const rows = insulinData.map((insulin) => {
    return {
      id: insulin.id,
      nameInsulin: insulin.nameInsulin,
      individualApplication: insulin.individualApplication,
      typesInsulin: insulin.typesInsulin
    }
  })

  return (
    <>
      <ToastContainer />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>
        <Container>
          <ContentHeader goBackUrl='/' title='Insulinas' />
          <TableContainer>
            <TableAddButton>
              <Link href="/insulin/create">
                <NewRegisterButton type="button">
                  Novo Registro
                  <Image src="/add_icon.png" alt="Logo" width={26} height={26} />
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
              id={insulinId}
              onClose={handleCloseModal}
              onConfirmDelete={(id) => { handleDeleteWrapper(id) }}
            />
          </TableContainer>
        </Container>
      </Main>
    </>
  )
}
