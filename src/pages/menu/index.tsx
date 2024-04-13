import { Button, Container } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home(): JSX.Element {
  // passar pra um hook
  const [userToken, setUserToken] = useState<string | null>(null)

  useEffect(() => {
    setUserToken(localStorage.getItem('token'))
  }, [])

  return (
    <Container sx={{
      position: 'absolute' as 'absolute',
      top: '40%',
      left: '20%'
    }}>
      <h2>OBS: Menu Provisório <br /> Será feito o restante nas semanas seguintes conforme cronograma!</h2>
      <span>Token: {userToken}</span>

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
    </Container >
  )
}
