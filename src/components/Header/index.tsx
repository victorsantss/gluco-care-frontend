import Image from 'next/image'
import { Container, UserIcon } from './styles'
import Link from 'next/link'
import logo from '../../assets/logo.png'
import { useRouter } from 'next/router'
import userServices from '@/services/user'
import { useEffect, useState } from 'react'

export const Header: React.FC = () => {
  const router = useRouter()
  const { pathname } = router
  const isRegisterPage = pathname === '/account/new'
  const [userName, setUserName] = useState<string>('')
  const userNameInitials = userName.split(' ').slice(0, 2).map(name => name[0]).join('')

  const handleAccountButtonClick = (): void => {
    router.push('/myAccount').catch(error => {
      console.error('Error navigating to account:', error)
    })
  }

  const fetchData = async (): Promise<void> => {
    try {
      const { data } = await userServices().getUser()

      setUserName(data.name as string)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    if (!isRegisterPage) {
      fetchData().catch((error) => {
        console.error('Error in fetchData:', error)
      })
    }
  }, [])

  return (
    <Container>
      <Link href="/">
        <Image src={logo} alt="Logo" width={264} height={79} />
      </Link>
      {!isRegisterPage && (
        <UserIcon
          onClick={handleAccountButtonClick}
        >
          <span>
            {userNameInitials}
          </span>
        </UserIcon>
      )}
    </Container >
  )
}
