import Image from 'next/image'
import { type ChangeEvent, useCallback, useState } from 'react'
import { LoginLabelText, LoginForm, LoginLabel, LoginInput, LoginButton, LoginButtonRegister, Main, Container } from '../styles/HomeStyles'
import { useRouter } from 'next/router'
import Link from 'next/link'
import userServices from '@/services/user'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import homeLogo from '../assets/home_logo.png'
import CircularProgress from '@mui/material/CircularProgress'

export default function Home(): JSX.Element {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

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
      if (formData.email === '' || formData.password === '') {
        toast.error('Por favor preencha todos os campos.')
      }
      setIsLoading(true)

      const response = await userServices().loginUser(formData)
      const userToken = response.data.data
      Cookies.set('userToken', String(userToken))

      await router.push('/menu')
    } catch (error) {
      setIsLoading(false)
      console.error('Error in handleSubmit:', error)
      toast.error('Email ou senha inválidos, por favor tente novamente.')
    }
  }

  return (
    <Main>
      <ToastContainer />
      <Container>
        <Image src={homeLogo} alt="Logo" width={520} height={245} />
        <LoginForm
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit(event).catch((error) => {
              console.error('Error in handleSubmit:', error)
            })
          }}
        >
          <LoginLabel htmlFor="email">
            <LoginLabelText>Email</LoginLabelText>
            <LoginInput
              onChange={handleChange}
              name="email"
              type="email"
              required
            />
          </LoginLabel>

          <LoginLabel htmlFor="password">
            <LoginLabelText>Senha</LoginLabelText>
            <LoginInput
              onChange={handleChange}
              name="password"
              type="password"
              required
            />
          </LoginLabel>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress color="inherit" size={32} /> : 'Entrar'}
          </LoginButton>

          <LoginButtonRegister type="button">
            <Link href="/account/new">
              Cadastrar Conta
            </Link>
          </LoginButtonRegister>

        </LoginForm>
      </Container>
    </Main>
  )
}
