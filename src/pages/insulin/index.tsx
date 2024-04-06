import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { type GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Header } from '@/components/Header'
import { StyledDataGrid, TableContainer } from './styles'
import ActionsModal from '@/components/DeleteModal'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Insulin {
  id: number
  nameInsulin: string
  individualApplication: boolean
  typesInsulin: number
}

export default function Home (): React.ReactElement {
  const router = useRouter()
  const [insulinData, setInsulinData] = useState<Insulin[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [insulinId, setInsulinId] = useState<number | null>(null)

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
    setInsulinId(null)
  }

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch('https://localhost:7041/api/v1/Insulin')
      const data: Insulin[] = await response.json()
      setInsulinData(data)
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

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await fetch(`https://localhost:7041/api/v1/Insulin/${id}`, {
        method: 'DELETE'
      })

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
      headerAlign: 'center'
    },
    {
      field: 'typesInsulin',
      headerName: 'Tipo de Insulina',
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
          <IconButton onClick={() => { handleEdit(params.row) }}>
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
      individualApplication: insulin.individualApplication ? 'Sim' : 'Não',
      typesInsulin: insulin.typesInsulin
    }
  })

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <TableContainer>
            <div className={styles.tableAdd}>
              <Link href="/insulin/create">
                <button className={styles.newRegister} type="button">
                  Novo Registro
                  <Image src="/add_icon.png" alt="Logo" width={26} height={26} />
                </button>
              </Link>
            </div>
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
              insulinId={insulinId}
              onClose={handleCloseModal}
              onConfirmDelete={handleDelete}
            />
          </TableContainer>
        </div>
      </main>
    </>
  )
}
