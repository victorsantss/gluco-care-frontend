import Image from 'next/image'
import { Container } from './styles'

export const Header: React.FC = () => {
  return (
    <Container>
      <Image src="/logo.png" alt="Logo" width={264} height={79} />
    </Container>
  )
}
