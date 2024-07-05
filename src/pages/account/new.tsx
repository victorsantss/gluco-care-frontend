import { Header } from '@/components/Header'
import { Container, Main } from '../../styles/HomeStyles'
import { RegisterButton, RegisterForm, RegisterInput, RegisterLabel, RegisterLabelText } from '../../styles/AccountStyles'
import { type ChangeEvent, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import userServices from '@/services/user'
import { object, string } from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ContentHeader from '@/components/ContentHeader'
import { CircularProgress } from '@mui/material'
import HeadContent from '@/components/Head'

export default function NewAccount(): JSX.Element {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = object({
    name: string().required(),
    email: string().email().required(),
    password: string().matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[a-zA-Z]).{6,}$/,
      'A senha deve conter ao menos 6 caracteres, uma letra maiúscula, uma letra minúscula, um número, e um caractere especial.'
    ).required(),
    passwordConfirmation: string()
      .required()
      .test('passwords-match', 'As senhas não conferem, por favor tente novamente.', function (value) {
        return this.parent.password === value
      })
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
      setIsLoading(true)
      const validateForm = await validationSchema.validate(formData)
      await userServices().createUser(validateForm)

      toast.success('Conta criada com sucesso! Redirecionando para a página inicial...', {
        autoClose: 2000,
        onClose: () => { void router.push('/') }
      })
    } catch (error) {
      setIsLoading(false)
      console.error('Error submitting form:', error)
      if (error instanceof Error && (error as any).response?.status === 409) {
        (error).message = 'Email já cadastrado!'
      }
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <ToastContainer />
      <HeadContent title="Cadastrar Conta" />
      <Header />
      <Main>
        <Container>
          <ContentHeader title='Nova Conta' goBackUrl='/' />
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
                maxLength={100}
                placeholder="Pedro Silva"
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
                placeholder="pedro@exemplo.com"
                maxLength={100}
                value={formData.email}
                required
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              />
            </RegisterLabel>

            <RegisterLabel htmlFor="password">
              <RegisterLabelText>Senha</RegisterLabelText>
              <RegisterInput
                onChange={handleChange}
                name="password"
                type="password"
                maxLength={20}
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
                maxLength={20}
                value={formData.passwordConfirmation}
                required
              />
            </RegisterLabel>

            <RegisterButton type="submit" disabled={isLoading}>
              {isLoading ? <CircularProgress color="inherit" size={32} /> : 'Cadastrar'}
            </RegisterButton>

          </RegisterForm>
        </Container>
      </Main>
    </>
  )
}
