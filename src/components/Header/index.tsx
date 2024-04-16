import Image from 'next/image'
import { Container } from './styles'
import Link from 'next/link'
import logo from '../../assets/logo.png'

export const Header: React.FC = () => {
  return (
    <Container>
      <Link href="/">
        <Image src={logo} alt="Logo" width={264} height={79} />
      </Link>
    </Container>
  )
}
