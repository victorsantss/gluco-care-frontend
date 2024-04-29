import { Header } from '@/components/Header'
import { Container, Main } from '@/styles/HomeStyles'
import ContentHeader from '@/components/ContentHeader'
import { FormInput, FormLabel, FormLabelText, FormLogoutButton, FormSaveButton, FormStyled } from '@/styles/ConfigStyles'
import userServices from '@/services/user'
import { type ChangeEvent, useCallback, useEffect, useState } from 'react'
import { object, string } from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

interface User {
  email: string
  name: string
}

export default function Home(): JSX.Element {
  const router = useRouter()
  const [userData, setUserData] = useState<User>({
    email: '',
    name: ''
  })

  const validationSchema = object({
    name: string().required(),
    email: string().email().required()
  })

  const fetchData = async (): Promise<void> => {
    try {
      const { data } = await userServices().getUser()

      setUserData(data as User)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [])

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setUserData((prevData) => {
        return {
          ...prevData,
          [target.name]: target.value
        }
      })
    },
    [setUserData]
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      const validateForm = await validationSchema.validate(userData)
      await userServices().editUser(validateForm)

      toast.success('Conta alterada com sucesso!')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Um erro ocorreu ao editar as informações da conta.')
    }
  }

  const handleLogout = (): void => {
    Cookies.remove('userToken')
    void router.push('/')
  }

  return (
    <>
      <ToastContainer />
      <Header />
      <Main>
        <Container>
          <ContentHeader title='Minha Conta' goBackUrl='/' />

          <FormStyled
            onSubmit={(event) => {
              event.preventDefault()
              handleSubmit(event).catch((error) => {
                console.error('Error in handleSubmit:', error)
              })
            }}
          >
            <FormLabel htmlFor="individualApplication">
              <FormLabelText>E-mail</FormLabelText>
              <FormInput
                onChange={handleChange}
                name="email"
                value={userData?.email}
                type="email"
                disabled
                required
              />

              <FormLabelText>Nome</FormLabelText>
              <FormInput
                onChange={handleChange}
                name="name"
                value={userData?.name}
                type="text"
                required
              />

            </FormLabel>

            <FormSaveButton type="submit">Alterar</FormSaveButton>

            <FormLogoutButton type='button' onClick={handleLogout}>Sair</FormLogoutButton>
          </FormStyled>
        </Container>
      </Main>
    </>
  )
}
