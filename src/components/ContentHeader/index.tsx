import GoBackButton from '../GoBackButton'
import { Title, TitleContainer } from './styles'

interface ContentHeaderProps {
  url: string
  title: string
}

export default function ContentHeader({ url, title }: ContentHeaderProps): React.ReactElement {
  return (
    <TitleContainer>
      <GoBackButton url={url} />
      <Title>
        {title}
      </Title>
    </TitleContainer>
  )
}
