import GoBackButton from '../GoBackButton'
import { Title, TitleContainer } from './styles'

interface ContentHeaderProps {
  goBackUrl: string
  title: string
}

export default function ContentHeader({ goBackUrl, title }: ContentHeaderProps): React.ReactElement {
  return (
    <TitleContainer>
      <GoBackButton url={goBackUrl} />
      <Title>
        {title}
      </Title>
    </TitleContainer>
  )
}
