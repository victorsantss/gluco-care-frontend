import Image from 'next/image'
import { Container } from './styles'
import Link from 'next/link'
import logo from '../../assets/logo.png'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export const Header: React.FC = () => {
  const router = useRouter()
  const { pathname } = router
  const isRegisterPage = pathname === '/account/new'

  const handleAccountButtonClick = (): void => {
    router.push('/myAccount').catch(error => {
      console.error('Error navigating to account:', error)
    })
  }

  return (
    <Container>
      <Link href="/">
        <Image src={logo} alt="Logo" width={264} height={79} />
      </Link>
      {!isRegisterPage && (
        <IconButton onClick={handleAccountButtonClick} sx={{ marginRight: '3rem' }}>
          <AccountCircleIcon sx={{ fontSize: '3rem' }} />
        </IconButton>
      )}
    </Container >
  )
}
