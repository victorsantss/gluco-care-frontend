import Head from 'next/head'
import { type ChangeEvent, useCallback, useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { useRouter } from 'next/router'
import { Container, Main, Title } from '@/pages/styles'
import { InsulinFormCheckbox, InsulinFormInput, InsulinFormLabel, InsulinFormLabelText, InsulinFormSaveButton, InsulinFormSelect, InsulinFormStyle } from './styles'
import insulinServices from '@/services/insulin'

interface FormData {
  id?: number
  nameInsulin?: string
  individualApplication?: boolean
  typesInsulin?: number
}

interface InsulinFormProps {
  initialValues?: FormData
}

export default function InsulinForm ({ initialValues }: InsulinFormProps): React.ReactElement {
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
        alert('Por favor preencha todos os campos.')
        return
      }

      let response = null

      if (initialValues?.id != null) {
        // Edit Insulin
        response = await insulinServices().editInsulin({ ...formData, id: initialValues.id })
      } else {
        // Create Insulin
        response = await insulinServices().createInsulin(formData)
      }

      if (response.status >= 200 && response.status < 300) {
        await router.push('/insulin')
      } else {
        alert('Um erro ocorreu ao criar/editar a insulina.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Um erro ocorreu ao criar/editar a insulina.')
    }
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>
        <Container>
          <Title>
            {(initialValues != null) ? 'Editar Insulina' : 'Cadastrar Insulina'}
          </Title>
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
