import { type StaticImageData } from 'next/image'
import { MenuCardContainer, MenuCardIcon, MenuCardTitle } from './styles'
import Link from 'next/link'

interface MenuCardProps {
  title: string
  icon: StaticImageData
  url: string
}

export default function MenuCard({ title, icon, url }: MenuCardProps): React.ReactElement {
  return (
    <Link href={url}>
      <MenuCardContainer>
        <MenuCardTitle>{title}</MenuCardTitle>
        <MenuCardIcon src={icon} alt={title} />
      </MenuCardContainer>
    </Link>
  )
}
