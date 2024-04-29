import { Header } from '@/components/Header'
import Head from 'next/head'
import { Container, Main } from '@/styles/HomeStyles'
import ContentHeader from '@/components/ContentHeader'
import { FormCheckbox, FormLabel, FormLabelText, FormStyled } from '@/styles/ConfigStyles'
import configServices from '@/services/config'
import { type ChangeEvent, useCallback, useEffect, useState } from 'react'

interface Config {
  applyInsulinSnack?: boolean
  useCarbsCalc?: boolean
}

export default function Home(): JSX.Element {
  const [configData, setConfigData] = useState<Config>({
    applyInsulinSnack: false,
    useCarbsCalc: false
  })

  const fetchData = async (): Promise<void> => {
    try {
      const { data } = await configServices().getConfig()

      setConfigData(data as Config)
    } catch (error) {
      console.error('Error fetching config data:', error)
    }
  }

  const updateData = async (): Promise<void> => {
    try {
      await configServices().editConfig({
        ...configData
      })
    } catch (error) {
      console.error('Error updating config data:', error)
    }
  }

  useEffect(() => {
    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [])

  useEffect(() => {
    updateData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [configData])

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setConfigData((prevData) => {
        return {
          ...prevData,
          [target.name]: target.checked
        }
      })
    },
    [setConfigData]
  )

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Main>
        <Container>
          <ContentHeader title='Configurações' goBackUrl='/' />

          <FormStyled
          >
            <FormLabel htmlFor="useCarbsCalc">
              <FormLabelText>Utilizar Cálculo de Carboidatros</FormLabelText>
              <FormCheckbox
                name="useCarbsCalc"
                type="checkbox"
                onChange={handleChange}
                checked={configData.useCarbsCalc}
              />
            </FormLabel>

            <FormLabel htmlFor="applyInsulinSnack">
              <FormLabelText>Aplica Insulina em Lanches</FormLabelText>
              <FormCheckbox
                name="applyInsulinSnack"
                type="checkbox"
                onChange={handleChange}
                checked={configData.applyInsulinSnack}
              />
            </FormLabel>
          </FormStyled>
        </Container>
      </Main>
    </>
  )
}
