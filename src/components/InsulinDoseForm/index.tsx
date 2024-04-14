import Head from 'next/head'
import { type ChangeEvent, useCallback, useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { useRouter } from 'next/router'
import { Container, Main, Title } from '@/pages/styles'
import { InsulinFormInput, InsulinFormLabel, InsulinFormLabelText, InsulinFormSaveButton, InsulinFormSelect, InsulinFormStyle } from './styles'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import insulinDoseServices from '@/services/insulinDose'
import insulinServices from '@/services/insulin'

interface FormData {
  id?: number
  amount?: number
  correction?: number
  idTypeInsulin?: number
}

interface InsulinFormProps {
  initialValues?: FormData
}

interface Insulin {
  id: number
  nameInsulin: string
  individualApplication: boolean
  typesInsulin: number
}

export default function InsulinDoseForm({ initialValues }: InsulinFormProps): React.ReactElement {
  const router = useRouter()
  const [userToken, setUserToken] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    amount: 0,
    correction: 0,
    idTypeInsulin: 0
  })
  const [insulinTypes, setInsulinTypes] = useState<Insulin[]>([])

  const fetchData = async (): Promise<void> => {
    try {
      const { data } = await insulinServices().getInsulins(userToken)

      setInsulinTypes(data as Insulin[])
    } catch (error) {
      console.error('Error fetching insulin data:', error)
    }
  }

  useEffect(() => {
    setUserToken(localStorage.getItem('token'))
    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [userToken])

  useEffect(() => {
    if (initialValues?.id != null) {
      setFormData({
        amount: initialValues?.amount,
        correction: initialValues?.correction,
        idTypeInsulin: initialValues?.idTypeInsulin
      })
    }
  }, [initialValues])

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prevData) => {
        return {
          ...prevData,
          [target.name]: target.value
        }
      })
    },
    [setFormData]
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (formData.amount === 0 || formData.correction === 0 || formData.idTypeInsulin === 0) {
        toast.error('Por favor preencha todos os campos.')
        return
      }

      if (initialValues?.id != null) {
        // Edit Insulin Dose
        await insulinDoseServices().editInsulinDose({ ...formData, id: initialValues.id, userToken })
      } else {
        // Create Insulin Dose
        await insulinDoseServices().createInsulinDose({ ...formData, userToken })
      }

      await router.push('/insulinDose')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Um erro ocorreu ao criar/editar a dose de insulina.')
    }
  }

  return (
    <>
      <ToastContainer />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>
        <Container>
          <Title>
            {(initialValues != null) ? 'Editar Dose de Insulina' : 'Cadastrar Dose de Insulina'}
          </Title>
          <InsulinFormStyle
            onSubmit={(event) => {
              event.preventDefault()
              handleSubmit(event).catch((error) => {
                console.error('Error in handleSubmit:', error)
              })
            }}
          >
            <InsulinFormLabel htmlFor="idTypeInsulin">
              <InsulinFormLabelText>Tipo de Insulina</InsulinFormLabelText>
              <InsulinFormSelect
                id="idTypeInsulin"
                name="idTypeInsulin"
                value={formData.idTypeInsulin}
                onChange={handleChange}
                required
              >
                <option value={0}>-</option>
                {insulinTypes.map((insulin) => (
                  <option key={insulin.id} value={insulin.id}>
                    {insulin.nameInsulin}
                  </option>
                ))}
              </InsulinFormSelect>
            </InsulinFormLabel>

            <InsulinFormLabel htmlFor="amount">
              <InsulinFormLabelText>Quantidade</InsulinFormLabelText>
              <InsulinFormInput
                onChange={handleChange}
                name="amount"
                value={formData.amount}
                type="number"
                required
              />
            </InsulinFormLabel>

            <InsulinFormLabel htmlFor="correction">
              <InsulinFormLabelText>Correção</InsulinFormLabelText>
              <InsulinFormInput
                onChange={handleChange}
                name="correction"
                value={formData.correction}
                type="number"
                required
              />
            </InsulinFormLabel>

            <InsulinFormSaveButton type="submit">Salvar</InsulinFormSaveButton>
          </InsulinFormStyle>
        </Container>
      </Main>
    </>
  )
}
