import { Header } from '@/components/Header'
import { Container, Main, Title } from '../styles'
import { RegisterButton, RegisterForm, RegisterInput, RegisterLabel, RegisterLabelText } from './styles'
import { type ChangeEvent, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import userServices from '@/services/user'

export default function NewAccount (): JSX.Element {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

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
      if (formData.email === '' || formData.password === '' || formData.name === '' || formData.passwordConfirmation === '') {
        throw new Error('Por favor preencha todos os campos.')
      }
      if (formData.password !== formData.passwordConfirmation) {
        setFormData({
          ...formData,
          password: '',
          passwordConfirmation: ''
        })
        alert('As senhas não conferem, por favor tente novamente.')
        return
      }

      const response = await userServices().createUser(formData)

      if (response.status >= 200 && response.status < 300) {
        await router.push('/')
      } else {
        alert('Um erro ocorreu ao criar a conta.')
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error)
    }
  }

  return (
    <>
      <Header />
      <Main>
        <Container>
          <Title>
            Nova Conta
          </Title>
          <RegisterForm
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit(event).catch((error) => {
              console.error('Error in handleSubmit:', error)
            })
          }}
          >
            <RegisterLabel htmlFor="name">
              <RegisterLabelText>Nome</RegisterLabelText>
              <RegisterInput
                onChange={handleChange}
                name="name"
                type="text"
                value={formData.name}
                required
              />
            </RegisterLabel>

            <RegisterLabel htmlFor="email">
              <RegisterLabelText>Email</RegisterLabelText>
              <RegisterInput
                onChange={handleChange}
                name="email"
                type="email"
                value={formData.email}
                required
              />
            </RegisterLabel>

            <RegisterLabel htmlFor="password">
              <RegisterLabelText>Senha</RegisterLabelText>
              <RegisterInput
                onChange={handleChange}
                name="password"
                type="password"
                value={formData.password}
                required
              />
            </RegisterLabel>

            <RegisterLabel htmlFor="passwordConfirmation">
              <RegisterLabelText>Confirme a senha</RegisterLabelText>
              <RegisterInput
                onChange={handleChange}
                name="passwordConfirmation"
                type="password"
                value={formData.passwordConfirmation}
                required
              />
            </RegisterLabel>

            <RegisterButton type="submit">Cadastrar</RegisterButton>

          </RegisterForm>
        </Container>
      </Main>
    </>
  )
}
