import Image from 'next/image'
import { Container } from './styles'
import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <Container>
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={264} height={79} />
      </Link>
    </Container>
  )
}
