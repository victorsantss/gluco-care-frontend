import { type ChangeEvent, useCallback, useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Container, Main } from '@/styles/HomeStyles'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ContentHeader from '../ContentHeader'
import HeadContent from '../Head'
import { GlucoseReadingContainer, GlucoseReadingFlexContainer, GlucoseReadingFormInput, GlucoseReadingFormLabel, GlucoseReadingFormLabelLarge, GlucoseReadingFormLabelSmaller, GlucoseReadingFormLabelSmallerText, GlucoseReadingFormLabelText, GlucoseReadingFormSaveButton, GlucoseReadingFormSelect, GlucoseReadingFormStyle, GlucoseReadingFormTabTitle, GlucoseReadingInsulinSecondTitle, GlucoseReadingTitleContainer } from './styles'
import insulinServices from '@/services/insulin'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Tooltip from '@mui/material/Tooltip'
import insulinDoseServices from '@/services/insulinDose'
import glucoseReadingServices from '@/services/glucoseReading'
import { useRouter } from 'next/router'

interface FormData {
  id?: number
  glucoseReadingValue: number
  glucoseReadingDate: string
  glucoseReadingHour: string
  glucoseReadingMealType: string
  glucoseReadingProteinsQuantity: number
  glucoseReadingCarbsQuantity: number
  glucoseReadingCaloriesQuantity: number
  glucoseReadingTypesInsulin: number
  glucoseReadingInsulinDose: number
  glucoseReadingSuggestedDose: number
  glucoseReadingTypesInsulinSecond: number
  glucoseReadingInsulinDoseSecond: number
  glucoseReadingSuggestedDoseSecond: number
}

interface BackendData {
  id: number
  valueGlucose: number
  readingDateTime: string
  mealType: string
  proteinAmount: number
  carbohydrateAmount: number
  calorieAmount: number
  idTypeInsulin: number
  insulinDose: number
  idTypeInsulinSecond: number
  insulinDoseSecond: number
  timeOnly: string
}

interface Insulin {
  id: number
  nameInsulin: string
  individualApplication: boolean
  typesInsulin: number
}

interface InsulinDose {
  id: number
  amount: number
  correction: number
  idTypeInsulin: number
  createdAt: string
  updatedAt: string
}

interface GlucoseReadingFormProps {
  initialValues?: BackendData
}

interface InsulinPosition {
  position: 'primary' | 'secondary'
}

export default function GlucoseReadingForm({ initialValues }: GlucoseReadingFormProps): React.ReactElement {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    glucoseReadingValue: 0,
    glucoseReadingDate: new Date().toISOString().split('T')[0],
    glucoseReadingHour: new Date().toLocaleString('pt-BR').split(' ')[1],
    glucoseReadingMealType: 'Café da manhã',
    glucoseReadingProteinsQuantity: 0,
    glucoseReadingCarbsQuantity: 0,
    glucoseReadingCaloriesQuantity: 0,
    glucoseReadingTypesInsulin: 0,
    glucoseReadingInsulinDose: 0,
    glucoseReadingSuggestedDose: 0,
    glucoseReadingTypesInsulinSecond: 0,
    glucoseReadingInsulinDoseSecond: 0,
    glucoseReadingSuggestedDoseSecond: 0
  })
  const [tabIndex, setTabIndex] = useState(1)
  const [insulinTypes, setInsulinTypes] = useState<Insulin[]>([])
  const [insulinDoses, setInsulinDoses] = useState<InsulinDose[]>([])
  const [insulinDosesSecondary, setInsulinDosesSecondary] = useState<InsulinDose[]>([])

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

  useEffect(() => {
    if (formData.glucoseReadingInsulinDose !== 0) {
      void getSuggestedDose(formData.glucoseReadingInsulinDose, 'primary')
    }
    if (formData.glucoseReadingInsulinDoseSecond !== 0) {
      void getSuggestedDose(formData.glucoseReadingInsulinDoseSecond, 'secondary')
    }
  }, [formData.glucoseReadingInsulinDose, formData.glucoseReadingInsulinDoseSecond])

  useEffect(() => {
    if (initialValues?.id != null) {
      void (async () => {
        const insulinDosesPrimary = await insulinDoseServices().getInsulinDosesByTypeInsulin(initialValues.idTypeInsulin)
        const insulinDosesSecondary = await insulinDoseServices().getInsulinDosesByTypeInsulin(initialValues.idTypeInsulinSecond)

        setInsulinDoses(insulinDosesPrimary.data as InsulinDose[])
        setInsulinDosesSecondary(insulinDosesSecondary.data as InsulinDose[])
      }
      )()

      setFormData({
        glucoseReadingValue: initialValues.valueGlucose,
        glucoseReadingDate: initialValues.readingDateTime.split('T')[0],
        glucoseReadingHour: initialValues.timeOnly,
        glucoseReadingMealType: initialValues.mealType,
        glucoseReadingProteinsQuantity: initialValues.proteinAmount,
        glucoseReadingCarbsQuantity: initialValues.carbohydrateAmount,
        glucoseReadingCaloriesQuantity: initialValues.calorieAmount,
        glucoseReadingTypesInsulin: initialValues.idTypeInsulin,
        glucoseReadingInsulinDose: initialValues.insulinDose,
        glucoseReadingSuggestedDose: 0,
        glucoseReadingTypesInsulinSecond: initialValues.idTypeInsulinSecond,
        glucoseReadingInsulinDoseSecond: initialValues.insulinDoseSecond,
        glucoseReadingSuggestedDoseSecond: 0
      })
    }
  }, [initialValues])

  const handleContinue = useCallback(() => {
    setTabIndex((prevTabIndex) => prevTabIndex + 1)
  }, [setTabIndex])

  const handleChangeTabIndex = useCallback((index: number) => () => {
    setTabIndex(index)
  }, [setTabIndex])

  const getSuggestedDose = async (insulinDose: number, position: string): Promise<void> => {
    try {
      const { data } = await glucoseReadingServices().calculateSuggestedDose({
        valueGlucose: parseInt(formData.glucoseReadingValue.toString()),
        mealType: formData.glucoseReadingMealType,
        proteinAmount: formData.glucoseReadingProteinsQuantity,
        carbohydrateAmount: formData.glucoseReadingCarbsQuantity,
        calorieAmount: formData.glucoseReadingCaloriesQuantity,
        idInsulinDose: insulinDose
      })

      if (position === 'primary') {
        setFormData((prevData) => {
          return {
            ...prevData,
            glucoseReadingSuggestedDose: data.suggestedDose
          }
        })
      } else {
        setFormData((prevData) => {
          return {
            ...prevData,
            glucoseReadingSuggestedDoseSecond: data.suggestedDose
          }
        })
      }
    } catch (error) {
      console.error('Error in getSuggestedDose:', error)
    }
  }

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

  const handleInsulinChange = useCallback(
    async ({ target }: ChangeEvent<HTMLSelectElement>, insulinPosition: InsulinPosition) => {
      const { position } = insulinPosition

      if (position === 'primary') {
        setFormData((prevData) => {
          return {
            ...prevData,
            [target.name]: parseInt(target.value),
            glucoseReadingInsulinDose: 0,
            glucoseReadingSuggestedDose: 0
          }
        })
      } else {
        setFormData((prevData) => {
          return {
            ...prevData,
            [target.name]: parseInt(target.value),
            glucoseReadingInsulinDoseSecond: 0,
            glucoseReadingSuggestedDoseSecond: 0
          }
        })
      }

      const { data } = await insulinDoseServices().getInsulinDosesByTypeInsulin(parseInt(target.value))

      if (position === 'primary') {
        setInsulinDoses(data as InsulinDose[])
      } else {
        setInsulinDosesSecondary(data as InsulinDose[])
      }
    },
    [setFormData]
  )

  const handleInsulinDoseChange =
    async ({ target }: ChangeEvent<HTMLSelectElement>, insulinPosition: InsulinPosition): Promise<void> => {
      const insulinDose = parseInt(target.value)
      const { position } = insulinPosition

      if (position === 'primary') {
        setFormData((prevData) => {
          return {
            ...prevData,
            [target.name]: insulinDose,
            glucoseReadingSuggestedDose: 0
          }
        })
      } else {
        setFormData((prevData) => {
          return {
            ...prevData,
            [target.name]: insulinDose,
            glucoseReadingSuggestedDoseSecond: 0
          }
        })
      }

      await getSuggestedDose(insulinDose, position)
    }

  const handlePrimaryInsulinChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    handleInsulinChange(event, { position: 'primary' }).catch((error) => {
      console.error('Error handling primary insulin change:', error)
    })
  }

  const handleSecondaryInsulinChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    handleInsulinChange(event, { position: 'secondary' }).catch((error) => {
      console.error('Error handling secondary insulin change:', error)
    })
  }

  const handlePrimaryInsulinDoseChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    handleInsulinDoseChange(event, { position: 'primary' }).catch((error) => {
      console.error('Error handling primary insulin dose change:', error)
    })
  }

  const handleSecondaryInsulinDoseChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    handleInsulinDoseChange(event, { position: 'secondary' }).catch((error) => {
      console.error('Error handling secondary insulin dose change:', error)
    })
  }

  const isIndividualApplication = insulinTypes.find(
    (insulin) =>
      insulin.id === formData.glucoseReadingTypesInsulin
  )?.individualApplication

  const isIndividualApplicationSecondary = insulinTypes.find(
    (insulin) =>
      insulin.id === formData.glucoseReadingTypesInsulinSecond
  )?.individualApplication

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      const inputValues = {
        valueGlucose: parseInt(formData.glucoseReadingValue.toString()),
        readingDateTime: new Date(formData.glucoseReadingDate).toISOString(),
        mealType: formData.glucoseReadingMealType,
        proteinAmount: parseInt(formData.glucoseReadingProteinsQuantity.toString()),
        carbohydrateAmount: parseInt(formData.glucoseReadingCarbsQuantity.toString()),
        calorieAmount: parseInt(formData.glucoseReadingCaloriesQuantity.toString()),
        idTypeInsulin: formData.glucoseReadingTypesInsulin,
        insulinDose: formData.glucoseReadingInsulinDose,
        idTypeInsulinSecond: formData.glucoseReadingTypesInsulinSecond,
        insulinDoseSecond: formData.glucoseReadingInsulinDoseSecond,
        timeOnly: formData.glucoseReadingHour
      }

      if (initialValues?.id != null) {
        // Edit Glucose Reading
        await glucoseReadingServices().editGlucoseReading({
          ...inputValues,
          id: initialValues.id
        })
      } else {
        // Create Glucose Reading
        await glucoseReadingServices().createGlucoseReading({
          ...inputValues
        })
      }

      await router.push('/glucoseReading')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Um erro ocorreu ao criar/editar a Leitura de Glicose.')
    }
  }

  return (
    <>
      <ToastContainer />
      <HeadContent title="Leitura de Glicose" />
      <Header />
      <Main>
        <Container>
          <ContentHeader
            goBackUrl={(initialValues?.id != null) ? '/glucoseReading' : '/menu'}
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
                $currentTabTitle={tabIndex === 1}
                onClick={handleChangeTabIndex(1)}
              >
                Etapa 1
              </GlucoseReadingFormTabTitle>
              <GlucoseReadingFormTabTitle
                $currentTabTitle={tabIndex === 2}
                onClick={handleChangeTabIndex(2)}
              >
                Etapa 2
              </GlucoseReadingFormTabTitle>
              <GlucoseReadingFormTabTitle
                $currentTabTitle={tabIndex === 3}
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
                    min="1"
                    max="1000"
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
                    <option value="Café da manhã">Café da manhã</option>
                    <option value="Almoço">Almoço</option>
                    <option value="Lanche da Tarde">Lanche da Tarde</option>
                    <option value="Janta">Janta</option>
                  </GlucoseReadingFormSelect>
                </GlucoseReadingFormLabel>

                <GlucoseReadingFormLabel htmlFor="glucoseReadingProteinsQuantity">
                  <GlucoseReadingFormLabelText>Quantidade de Proteínas</GlucoseReadingFormLabelText>
                  <GlucoseReadingFormInput
                    onChange={handleChange}
                    name="glucoseReadingProteinsQuantity"
                    value={formData.glucoseReadingProteinsQuantity}
                    type="number"
                    min="1"
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
                    min="1"
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
                    min="1"
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
                <GlucoseReadingFlexContainer>
                  <GlucoseReadingFormLabelLarge htmlFor="glucoseReadingTypesInsulin">
                    <GlucoseReadingFormLabelText>Insulina</GlucoseReadingFormLabelText>
                    <GlucoseReadingFormSelect
                      id="glucoseReadingTypesInsulin"
                      name="glucoseReadingTypesInsulin"
                      value={formData.glucoseReadingTypesInsulin}
                      onChange={handlePrimaryInsulinChange}
                      required
                    >
                      <option value={0}>Selecione</option>
                      {insulinTypes.map((insulin) => (
                        <option key={insulin.id} value={insulin.id}>
                          {insulin.nameInsulin}
                        </option>
                      ))}
                    </GlucoseReadingFormSelect>
                  </GlucoseReadingFormLabelLarge>
                  <GlucoseReadingFormLabelSmaller htmlFor="glucoseReadingTypesInsulinIsIndividual">
                    <GlucoseReadingFormLabelText>Individual?</GlucoseReadingFormLabelText>
                    <GlucoseReadingFormLabelSmallerText>
                      {(isIndividualApplication === true) ? 'Sim' : 'Não'}
                      <Tooltip title="Se a Insulina estiver marcada com Aplicação Individual, não será possível selecionar uma Insulina Complementar">
                        <InfoOutlinedIcon />
                      </Tooltip>
                    </GlucoseReadingFormLabelSmallerText>
                  </GlucoseReadingFormLabelSmaller>
                </GlucoseReadingFlexContainer>

                <GlucoseReadingFlexContainer>
                  <GlucoseReadingFormLabelLarge htmlFor="glucoseReadingInsulinDose">
                    <GlucoseReadingFormLabelText>Dose de Insulina</GlucoseReadingFormLabelText>
                    <GlucoseReadingFormSelect
                      id="glucoseReadingInsulinDose"
                      name="glucoseReadingInsulinDose"
                      value={formData.glucoseReadingInsulinDose}
                      onChange={handlePrimaryInsulinDoseChange}
                      disabled={formData.glucoseReadingTypesInsulin === 0}
                      required
                    >
                      <option value={0}>Selecione</option>
                      {insulinDoses.map((insulinDose) => (
                        <option key={insulinDose.id} value={insulinDose.id}>
                          Dose - {insulinDose.amount}
                        </option>
                      ))}
                    </GlucoseReadingFormSelect>
                  </GlucoseReadingFormLabelLarge>
                  <GlucoseReadingFormLabelSmaller htmlFor="glucoseReadingSuggestedDose">
                    <GlucoseReadingFormLabelText>Dose Sugerida</GlucoseReadingFormLabelText>
                    <GlucoseReadingFormInput
                      onChange={handleChange}
                      name="glucoseReadingSuggestedDose"
                      value={formData.glucoseReadingSuggestedDose}
                      disabled={formData.glucoseReadingTypesInsulin === 0 || formData.glucoseReadingInsulinDose === 0}
                      type="number"
                      step="any"
                      min="1"
                      required
                    />
                  </GlucoseReadingFormLabelSmaller>
                </GlucoseReadingFlexContainer>
                {isIndividualApplication === false && (
                  <GlucoseReadingContainer>
                    <GlucoseReadingInsulinSecondTitle>Insulina Complementar</GlucoseReadingInsulinSecondTitle>
                    <GlucoseReadingFlexContainer>
                      <GlucoseReadingFormLabelLarge htmlFor="glucoseReadingTypesInsulinSecond">
                        <GlucoseReadingFormLabelText>Insulina</GlucoseReadingFormLabelText>
                        <GlucoseReadingFormSelect
                          id="glucoseReadingTypesInsulinSecond"
                          name="glucoseReadingTypesInsulinSecond"
                          value={formData.glucoseReadingTypesInsulinSecond}
                          onChange={handleSecondaryInsulinChange}
                          required
                        >
                          <option value={0}>Selecione</option>
                          {insulinTypes.map((insulin) => (
                            <option key={insulin.id} value={insulin.id}>
                              {insulin.nameInsulin}
                            </option>
                          ))}
                        </GlucoseReadingFormSelect>
                      </GlucoseReadingFormLabelLarge>
                      <GlucoseReadingFormLabelSmaller htmlFor="glucoseReadingTypesInsulinIsIndividualSecond">
                        <GlucoseReadingFormLabelText>Individual?</GlucoseReadingFormLabelText>
                        <GlucoseReadingFormLabelSmallerText>
                          {(isIndividualApplicationSecondary === true) ? 'Sim' : 'Não'}
                          <Tooltip title="Se a Insulina estiver marcada com Aplicação Individual, não será possível selecionar uma Insulina Complementar">
                            <InfoOutlinedIcon />
                          </Tooltip>
                        </GlucoseReadingFormLabelSmallerText>
                      </GlucoseReadingFormLabelSmaller>
                    </GlucoseReadingFlexContainer>

                    <GlucoseReadingFlexContainer>
                      <GlucoseReadingFormLabelLarge htmlFor="glucoseReadingInsulinDoseSecond">
                        <GlucoseReadingFormLabelText>Dose de Insulina</GlucoseReadingFormLabelText>
                        <GlucoseReadingFormSelect
                          id="glucoseReadingInsulinDoseSecond"
                          name="glucoseReadingInsulinDoseSecond"
                          value={formData.glucoseReadingInsulinDoseSecond}
                          onChange={handleSecondaryInsulinDoseChange}
                          disabled={formData.glucoseReadingTypesInsulinSecond === 0}
                          required
                        >
                          <option value={0}>Selecione</option>
                          {insulinDosesSecondary.map((insulinDose) => (
                            <option key={insulinDose.id} value={insulinDose.id}>
                              Dose - {insulinDose.amount}
                            </option>
                          ))}
                        </GlucoseReadingFormSelect>
                      </GlucoseReadingFormLabelLarge>
                      <GlucoseReadingFormLabelSmaller htmlFor="glucoseReadingSuggestedDoseSecond">
                        <GlucoseReadingFormLabelText>Dose Sugerida</GlucoseReadingFormLabelText>
                        <GlucoseReadingFormInput
                          onChange={handleChange}
                          name="glucoseReadingSuggestedDoseSecond"
                          value={formData.glucoseReadingSuggestedDoseSecond}
                          disabled={formData.glucoseReadingTypesInsulin === 0 || formData.glucoseReadingInsulinDoseSecond === 0}
                          type="number"
                          step="any"
                          min="1"
                          required
                        />
                      </GlucoseReadingFormLabelSmaller>
                    </GlucoseReadingFlexContainer>
                  </GlucoseReadingContainer>
                )}

                <GlucoseReadingFormSaveButton type="submit">Salvar Leitura</GlucoseReadingFormSaveButton>
              </>
            )}
          </GlucoseReadingFormStyle>
        </Container>
      </Main>
    </>
  )
}
