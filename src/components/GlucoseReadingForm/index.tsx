import { type ChangeEvent, useCallback, useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Container, Main } from '@/styles/HomeStyles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ContentHeader from '../ContentHeader'
import HeadContent from '../Head'
import { GlucoseReadingFormInput, GlucoseReadingFormLabel, GlucoseReadingFormLabelText, GlucoseReadingFormSaveButton, GlucoseReadingFormSelect, GlucoseReadingFormStyle, GlucoseReadingFormTabTitle, GlucoseReadingTitleContainer } from './styles'
import insulinServices from '@/services/insulin'
// import glucoseReadingServices from '@/services/glucoseReading'

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

interface Insulin {
  id: number
  nameInsulin: string
  individualApplication: boolean
  typesInsulin: number
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
  const [insulinTypes, setInsulinTypes] = useState<Insulin[]>([])

  const fetchData = async (): Promise<void> => {
    try {
      const { data } = await insulinServices().getInsulins()

      setInsulinTypes(data as Insulin[])
    } catch (error) {
      console.error('Error fetching insulin data:', error)
    }
  }

  useEffect(() => {
    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [])

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

  const handleChangeTabIndex = useCallback((index: number) => () => {
    setTabIndex(index)
  }, [setTabIndex])

  // const getSuggestedDose = async (): Promise<void> => {
  //   try {
  //     const suggestedDose = await glucoseReadingServices().calculateSuggestedDose({
  //       valueGlucose: parseInt(formData.glucoseReadingValue.toString()),
  //       mealType: formData.glucoseReadingMealType.toString(),
  //       proteinAmount: formData.glucoseReadingProteinsQuantity,
  //       carbohydrateAmount: formData.glucoseReadingCarbsQuantity,
  //       calorieAmount: formData.glucoseReadingCaloriesQuantity,
  //       idTypeInsulin: formData.glucoseReadingTypesInsulin
  //     })

  //     console.log(suggestedDose)
  //   } catch (error) {
  //     console.error('Error in getSuggestedDose:', error)
  //   }
  // }

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
      <HeadContent title="Leitura de Glicose" />
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
            <GlucoseReadingTitleContainer>
              <GlucoseReadingFormTabTitle
                currentTabTitle={tabIndex === 1}
                onClick={handleChangeTabIndex(1)}
              >
                Etapa 1
              </GlucoseReadingFormTabTitle>
              <GlucoseReadingFormTabTitle
                currentTabTitle={tabIndex === 2}
                onClick={handleChangeTabIndex(2)}
              >
                Etapa 2
              </GlucoseReadingFormTabTitle>
              <GlucoseReadingFormTabTitle
                currentTabTitle={tabIndex === 3}
                onClick={handleChangeTabIndex(3)}
              >
                Etapa 3
              </GlucoseReadingFormTabTitle>
            </GlucoseReadingTitleContainer>
            {tabIndex === 1 && (
              <>
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
                <GlucoseReadingFormLabel htmlFor="glucoseReadingTypesInsulin">
                  <GlucoseReadingFormLabelText>Insulina</GlucoseReadingFormLabelText>
                  <GlucoseReadingFormSelect
                    id="glucoseReadingTypesInsulin"
                    name="glucoseReadingTypesInsulin"
                    value={formData.glucoseReadingTypesInsulin}
                    onChange={handleChange}
                    required
                  >
                    <option value={0}>-</option>
                    {insulinTypes.map((insulin) => (
                      <option key={insulin.id} value={insulin.id}>
                        {insulin.nameInsulin}
                      </option>
                    ))}
                  </GlucoseReadingFormSelect>
                </GlucoseReadingFormLabel>

                <GlucoseReadingFormLabel htmlFor="glucoseReadingInsulinDose">
                  <GlucoseReadingFormLabelText>Dose de Insulina</GlucoseReadingFormLabelText>
                  <GlucoseReadingFormInput
                    onChange={handleChange}
                    name="glucoseReadingInsulinDose"
                    value={formData.glucoseReadingValue}
                    type="number"
                    required
                  />
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
