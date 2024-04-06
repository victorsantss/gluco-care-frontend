import Image from 'next/image'
import { type ChangeEvent, useCallback, useState } from 'react'
import { LoginLabelText, LoginForm, LoginLabel, LoginInput, LoginButton, LoginButtonRegister, Main, Container } from './styles'
import { useRouter } from 'next/router'
import Link from 'next/link'
import userServices from '@/services/user'

export default function Home (): JSX.Element {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      if (formData.email === '' || formData.password === '') {
        throw new Error('Por favor preencha todos os campos.')
      }

      const response = await userServices().loginUser(formData)

      if (response.status >= 200 && response.status < 300) {
        await router.push('/menu')
      } else {
        alert('Um erro ocorreu ao acessar a conta.')
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error)
    }
  }

  return (
    <Main>
      <Container>
        <Image src="/home_logo.png" alt="Logo" width={520} height={245} />
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

          <LoginButton type="submit">Entrar</LoginButton>

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
