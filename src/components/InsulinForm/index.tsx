import Head from 'next/head'
import { type ChangeEvent, useCallback, useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { useRouter } from 'next/router'
import { Container, Main } from '@/pages/styles'
import { InsulinFormCheckbox, InsulinFormInput, InsulinFormLabel, InsulinFormLabelText, InsulinFormSaveButton, InsulinFormSelect, InsulinFormStyle } from './styles'
import insulinServices from '@/services/insulin'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ContentHeader from '../ContentHeader'

interface FormData {
  id?: number
  nameInsulin?: string
  individualApplication?: boolean
  typesInsulin?: number
}

interface InsulinFormProps {
  initialValues?: FormData
}

export default function InsulinForm({ initialValues }: InsulinFormProps): React.ReactElement {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    nameInsulin: '',
    individualApplication: false,
    typesInsulin: 0
  })

  useEffect(() => {
    if (initialValues?.id != null) {
      setFormData({
        nameInsulin: initialValues?.nameInsulin,
        individualApplication: initialValues?.individualApplication,
        typesInsulin: initialValues?.typesInsulin
      })
    }
  }, [initialValues])

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prevData) => {
        if (target.type === 'checkbox') {
          const checkboxTarget = target as HTMLInputElement
          return {
            ...prevData,
            [checkboxTarget.name]: checkboxTarget.checked
          }
        } else {
          return {
            ...prevData,
            [target.name]: target.value
          }
        }
      })
    },
    [setFormData]
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (formData.nameInsulin === '' || formData.typesInsulin === 0) {
        toast.error('Por favor preencha todos os campos.')
        return
      }

      if (initialValues?.id != null) {
        // Edit Insulin
        await insulinServices().editInsulin({ ...formData, id: initialValues.id })
      } else {
        // Create Insulin
        await insulinServices().createInsulin({ ...formData })
      }

      await router.push('/insulin')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Um erro ocorreu ao criar/editar a insulina.')
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
          <ContentHeader
            goBackUrl='/insulin'
            title={(initialValues != null) ? 'Editar Insulina' : 'Cadastrar Insulina'}
          />
          <InsulinFormStyle
            onSubmit={(event) => {
              event.preventDefault()
              handleSubmit(event).catch((error) => {
                console.error('Error in handleSubmit:', error)
              })
            }}
          >
            <InsulinFormLabel htmlFor="nameInsulin">
              <InsulinFormLabelText>Nome</InsulinFormLabelText>
              <InsulinFormInput
                onChange={handleChange}
                name="nameInsulin"
                value={formData.nameInsulin}
                type="text"
                required
              />
            </InsulinFormLabel>

            <InsulinFormLabel htmlFor="individualApplication">
              <InsulinFormLabelText>Aplicação Individual</InsulinFormLabelText>
              <InsulinFormCheckbox
                onChange={handleChange}
                name="individualApplication"
                checked={formData.individualApplication ?? false}
                type="checkbox"
              />
            </InsulinFormLabel>

            <InsulinFormLabel htmlFor="typesInsulin">
              <InsulinFormLabelText>Tipo de Insulina</InsulinFormLabelText>
              <InsulinFormSelect
                id="typesInsulin"
                name="typesInsulin"
                value={formData.typesInsulin}
                onChange={handleChange}
                required
              >
                <option value="">-</option>
                <option value="1">Ação Ultra-Rápida</option>
                <option value="2">Ação Rápida</option>
                <option value="3">Ação Intermediária</option>
                <option value="4">Ação Lenta</option>
              </InsulinFormSelect>
            </InsulinFormLabel>

            <InsulinFormSaveButton type="submit">Salvar</InsulinFormSaveButton>
          </InsulinFormStyle>
        </Container>
      </Main>
    </>
  )
}
