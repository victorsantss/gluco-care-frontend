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
import insulinDoseServices from '@/services/insulinDose'
import insulinServices from '@/services/insulin'

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
  const [userToken, setUserToken] = useState<string | null>(null)

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
      const { data } = await insulinDoseServices().getInsulinDoses(userToken)
      const { data: insulinTypes } = await insulinServices().getInsulins(userToken)

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
    setUserToken(localStorage.getItem('token'))

    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [userToken])

  const handleEdit = async (insulinDose: InsulinDose): Promise<void> => {
    await router.push(`/insulinDose/edit/${insulinDose.id}`)
  }

  const handleDelete = async (id: number | null): Promise<void> => {
    try {
      await insulinDoseServices().deleteInsulinDose(id, userToken)

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
      headerAlign: 'center'
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
          <IconButton onClick={() => { handleEdit(params.row) }}>
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
    const insulinName = insulinNamesData.find((insulin) => insulin.id === insulinDose.idTypeInsulin)?.nameInsulin

    return {
      id: insulinDose.id,
      amount: insulinDose.amount,
      correction: insulinDose.correction,
      idTypeInsulin: insulinName
    }
  })

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>
        <Container>
          <TableContainer>
            <TableAddButton>
              <Link href="/insulinDose/create">
                <NewRegisterButton type="button">
                  Novo Registro
                  <Image src="/add_icon.png" alt="Logo" width={26} height={26} />
                </NewRegisterButton>
              </Link>
            </TableAddButton>
            <StyledDataGrid
              rows={rows}
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
              id={insulinDoseId}
              onClose={handleCloseModal}
              onConfirmDelete={handleDelete}
            />
          </TableContainer>
        </Container>
      </Main>
    </>
  )
}
