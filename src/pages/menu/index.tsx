import { Button, Container } from '@mui/material'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home(): JSX.Element {
  const router = useRouter()

  const handleLogout = (): void => {
    Cookies.remove('userToken')
    void router.push('/')
  }

  return (
    <Container sx={{
      position: 'absolute' as 'absolute',
      top: '40%',
      left: '20%'
    }}>
      <h2>OBS: Menu Provisório <br /> Será feito o restante nas semanas seguintes conforme cronograma!</h2>

      <Link href={'/insulin'}>
        <Button variant='outlined'>
          Cadastro Insulina
        </Button>
      </Link>
      <Link href={'/insulinDose'}>
        <Button sx={{ marginLeft: '20px' }} variant='outlined'>
          Cadastro Dose Insulina
        </Button>
      </Link>
      <Button onClick={handleLogout} sx={{ marginLeft: '20px' }} color='error' variant='outlined'>
        Logout
      </Button>
    </Container >
  )
}
