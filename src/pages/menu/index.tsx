import { Header } from '@/components/Header'
import MenuCard from '@/components/MenuCard'
import addIcon from '@/assets/add_icon_menu.png'
import configIcon from '@/assets/config_icon_menu.png'
import insulinIcon from '@/assets/insulin_icon_menu.png'
import insulinDoseIcon from '@/assets/insulin_dose_icon_menu.png'
import registersIcon from '@/assets/registers_icon_menu.png'

import Head from 'next/head'
import { Main } from '@/styles/HomeStyles'
import { MenuCards, MenuContainer } from '@/styles/MenuStyles'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Main>
        <MenuContainer>
          <MenuCards>
            <MenuCard title='Nova Leitura de Glicose' icon={addIcon} url='/' />
            <MenuCard title='Cadastro Dose de Insulina' icon={insulinDoseIcon} url='/insulinDose' />
            <MenuCard title='Cadastro Insulina' icon={insulinIcon} url='/insulin' />
            <MenuCard title='Registros de Leitura' icon={registersIcon} url='/' />
            <MenuCard title='Configurações' icon={configIcon} url='/config' />
          </MenuCards>
        </MenuContainer>
      </Main>
    </>
  )
}
