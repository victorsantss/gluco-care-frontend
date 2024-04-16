import Image from 'next/image'
import Link from 'next/link'
import { GoBackText } from './styles'
import goBackArrow from '../../assets/go_back_arrow.png'

interface GoBackButtonProps {
  url: string
}

export default function GoBackButton({ url }: GoBackButtonProps): React.ReactElement {
  return (
    <Link href={url}>
      <Image src={goBackArrow} alt="Go Back" width={21} height={14} />
      <GoBackText>Voltar</GoBackText>
    </Link>
  )
}
