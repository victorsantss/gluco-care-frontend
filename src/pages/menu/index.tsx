import { Button, Container } from '@mui/material'
import Link from 'next/link'

export default function Home (): JSX.Element {
  return (
    <Container sx={{
      position: 'absolute' as 'absolute',
      top: '40%',
      left: '20%'
    }}>
      <Link href={'/insulin'}>
        <Button variant='outlined'>
          Cadastro Insulina
        </Button>
      </Link>
    </Container>
  )
}
