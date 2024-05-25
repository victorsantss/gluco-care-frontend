import { type ChangeEvent, useCallback, useState } from 'react'
import { Header } from '@/components/Header'
import { Container, Main } from '@/styles/HomeStyles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ContentHeader from '../ContentHeader'
import HeadContent from '../Head'
import { GlucoseReadingFormInput, GlucoseReadingFormLabel, GlucoseReadingFormLabelText, GlucoseReadingFormSaveButton, GlucoseReadingFormSelect, GlucoseReadingFormStyle, GlucoseReadingFormTabTitle } from './styles'

interface FormData {
  id?: number
  glucoseReadingValue: number
  glucoseReadingDate: string
  glucoseReadingHour: string
  glucoseReadingMealType: number
  glucoseReadingProteinsQuantity: number
  glucoseReadingCarbsQuantity: number
  glucoseReadingCaloriesQuantity: number
  glucoseReadingTypesInsulin: number
  glucoseReadingInsulinDose: number
}

interface InsulinFormProps {
  initialValues?: FormData
}

export default function GlucoseReadingForm({ initialValues }: InsulinFormProps): React.ReactElement {
  const [formData, setFormData] = useState<FormData>({
    glucoseReadingValue: 0,
    glucoseReadingDate: '',
    glucoseReadingHour: '',
    glucoseReadingMealType: 1,
    glucoseReadingProteinsQuantity: 0,
    glucoseReadingCarbsQuantity: 0,
    glucoseReadingCaloriesQuantity: 0,
    glucoseReadingTypesInsulin: 0,
    glucoseReadingInsulinDose: 0
  })
  const [tabIndex, setTabIndex] = useState(1)

  // TODO: Implementar a edição de leitura de glicose
  // useEffect(() => {
  //   if (initialValues?.id != null) {
  //     setFormData({
  //       nameInsulin: initialValues?.nameInsulin,
  //       individualApplication: initialValues?.individualApplication,
  //       typesInsulin: initialValues?.typesInsulin
  //     })
  //   }
  // }, [initialValues])

  const handleContinue = useCallback(() => {
    setTabIndex((prevTabIndex) => prevTabIndex + 1)
  }, [setTabIndex])

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
    alert('Formulário enviado')
  }

  return (
    <>
      <ToastContainer />
      <HeadContent title="Insulina" />
      <Header />
      <Main>
        <Container>
          <ContentHeader
            goBackUrl='/menu'
            title={(initialValues != null) ? 'Editar Leitura de Glicose' : 'Leituras de Glicose'}
          />
          <GlucoseReadingFormStyle
            onSubmit={(event) => {
              event.preventDefault()
              handleSubmit(event).catch((error) => {
                console.error('Error in handleSubmit:', error)
              })
            }}
          >
            {tabIndex === 1 && (
              <>
                <GlucoseReadingFormTabTitle>Etapa 1</GlucoseReadingFormTabTitle>

                <GlucoseReadingFormLabel htmlFor="glucoseReadingValue">
                  <GlucoseReadingFormLabelText>Valor da Glicose</GlucoseReadingFormLabelText>
                  <GlucoseReadingFormInput
                    onChange={handleChange}
                    name="glucoseReadingValue"
                    value={formData.glucoseReadingValue}
                    type="number"
                    required
                  />
                </GlucoseReadingFormLabel>

                <GlucoseReadingFormLabel htmlFor="glucoseReadingDate">
                  <GlucoseReadingFormLabelText>Data</GlucoseReadingFormLabelText>
                  <GlucoseReadingFormInput
                    onChange={handleChange}
                    name="glucoseReadingDate"
                    value={formData.glucoseReadingDate}
                    type="date"
                    required
                  />
                </GlucoseReadingFormLabel>

                <GlucoseReadingFormLabel htmlFor="glucoseReadingHour">
                  <GlucoseReadingFormLabelText>Hora</GlucoseReadingFormLabelText>
                  <GlucoseReadingFormInput
                    onChange={handleChange}
                    name="glucoseReadingHour"
                    value={formData.glucoseReadingHour}
                    type="time"
                    required
                  />
                </GlucoseReadingFormLabel>

                <GlucoseReadingFormSaveButton
                  onClick={handleContinue}
                >
                  Continuar para a Etapa 2
                </GlucoseReadingFormSaveButton>
              </>
            )}

            {tabIndex === 2 && (
              <>
                <GlucoseReadingFormTabTitle>Etapa 2</GlucoseReadingFormTabTitle>

                <GlucoseReadingFormLabel htmlFor="glucoseReadingMealType">
                  <GlucoseReadingFormLabelText>Tipo da Refeição</GlucoseReadingFormLabelText>
                  <GlucoseReadingFormSelect
                    id="glucoseReadingMealType"
                    name="glucoseReadingMealType"
                    value={formData.glucoseReadingMealType}
                    onChange={handleChange}
                    required
                  >
                    <option value="1">Café da manhã</option>
                    <option value="2">Almoço</option>
                    <option value="3">Lanche da Tarde</option>
                    <option value="4">Janta</option>
                  </GlucoseReadingFormSelect>
                </GlucoseReadingFormLabel>

                <GlucoseReadingFormLabel htmlFor="glucoseReadingProteinsQuantity">
                  <GlucoseReadingFormLabelText>Quantidade de Proteínas</GlucoseReadingFormLabelText>
                  <GlucoseReadingFormInput
                    onChange={handleChange}
                    name="glucoseReadingProteinsQuantity"
                    value={formData.glucoseReadingProteinsQuantity}
                    type="number"
                    required
                  />
                </GlucoseReadingFormLabel>

                <GlucoseReadingFormLabel htmlFor="glucoseReadingCarbsQuantity">
                  <GlucoseReadingFormLabelText>Quantidade de Carboidratos</GlucoseReadingFormLabelText>
                  <GlucoseReadingFormInput
                    onChange={handleChange}
                    name="glucoseReadingCarbsQuantity"
                    value={formData.glucoseReadingCarbsQuantity}
                    type="number"
                    required
                  />
                </GlucoseReadingFormLabel>

                <GlucoseReadingFormLabel htmlFor="glucoseReadingCaloriesQuantity">
                  <GlucoseReadingFormLabelText>Quantidade de Calorias</GlucoseReadingFormLabelText>
                  <GlucoseReadingFormInput
                    onChange={handleChange}
                    name="glucoseReadingCaloriesQuantity"
                    value={formData.glucoseReadingCaloriesQuantity}
                    type="number"
                    required
                  />
                </GlucoseReadingFormLabel>

                <GlucoseReadingFormSaveButton
                  onClick={handleContinue}
                >
                  Continuar para a Etapa 3
                </GlucoseReadingFormSaveButton>
              </>
            )}

            {tabIndex === 3 && (
              <>
                <GlucoseReadingFormTabTitle>Etapa 3</GlucoseReadingFormTabTitle>

                <GlucoseReadingFormLabel htmlFor="glucoseReadingTypesInsulin">
                  <GlucoseReadingFormLabelText>Insulina</GlucoseReadingFormLabelText>
                  <GlucoseReadingFormSelect
                    id="glucoseReadingTypesInsulin"
                    name="glucoseReadingTypesInsulin"
                    value={formData.glucoseReadingTypesInsulin}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-</option>
                    <option value="1">Ação Ultra-Rápida</option>
                    <option value="2">Ação Rápida</option>
                    <option value="3">Ação Intermediária</option>
                    <option value="4">Ação Lenta</option>
                  </GlucoseReadingFormSelect>
                </GlucoseReadingFormLabel>

                <GlucoseReadingFormLabel htmlFor="glucoseReadingInsulinDose">
                  <GlucoseReadingFormLabelText>Dose de Insulina</GlucoseReadingFormLabelText>
                  <GlucoseReadingFormSelect
                    id="glucoseReadingInsulinDose"
                    name="glucoseReadingInsulinDose"
                    value={formData.glucoseReadingInsulinDose}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-</option>
                    <option value="1">Ação Ultra-Rápida</option>
                    <option value="2">Ação Rápida</option>
                    <option value="3">Ação Intermediária</option>
                    <option value="4">Ação Lenta</option>
                  </GlucoseReadingFormSelect>
                </GlucoseReadingFormLabel>

                <GlucoseReadingFormSaveButton type="submit">Salvar Leitura</GlucoseReadingFormSaveButton>
              </>
            )}
          </GlucoseReadingFormStyle>
        </Container>
      </Main>
    </>
  )
}
