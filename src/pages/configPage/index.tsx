import { Header } from '@/components/Header'
import Head from 'next/head'
import { Container, Main } from '@/styles/HomeStyles'
import ContentHeader from '@/components/ContentHeader'
import { FormCheckbox, FormLabel, FormLabelText, FormStyled } from '@/styles/ConfigStyles'

export default function Home(): JSX.Element {
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
            <FormLabel htmlFor="individualApplication">
              <FormLabelText>Utilizar Cálculo de Carboidatros</FormLabelText>
              <FormCheckbox
                name="individualApplication"
                type="checkbox"
              />
            </FormLabel>

            <FormLabel htmlFor="individualApplication">
              <FormLabelText>Aplica Insulina em Lanches</FormLabelText>
              <FormCheckbox
                name="individualApplication"
                type="checkbox"
              />
            </FormLabel>
          </FormStyled>
        </Container>
      </Main>
    </>
  )
}
