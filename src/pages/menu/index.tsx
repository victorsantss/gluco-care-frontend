import { Header } from '@/components/Header'
import MenuCard from '@/components/MenuCard'
import addIcon from '@/assets/add_icon_menu.png'
import configIcon from '@/assets/config_icon_menu.png'
import insulinIcon from '@/assets/insulin_icon_menu.png'
import insulinDoseIcon from '@/assets/insulin_dose_icon_menu.png'
import registersIcon from '@/assets/registers_icon_menu.png'

import { Main } from '@/styles/HomeStyles'
import { MenuCards, MenuContainer } from '@/styles/MenuStyles'
import HeadContent from '@/components/Head'

export default function Home(): JSX.Element {
  return (
    <>
      <HeadContent title="Menu" />
      <Header />

      <Main>
        <MenuContainer>
          <MenuCards>
            <MenuCard title='Nova Leitura de Glicose' icon={addIcon} url='/glucoseReading/create' />
            <MenuCard title='Cadastro Dose de Insulina' icon={insulinDoseIcon} url='/insulinDose' />
            <MenuCard title='Cadastro Insulina' icon={insulinIcon} url='/insulin' />
            <MenuCard title='Registros de Leitura' icon={registersIcon} url='/glucoseReading' />
            <MenuCard title='Configurações' icon={configIcon} url='/configPage' />
          </MenuCards>
        </MenuContainer>
      </Main>
    </>
  )
}
