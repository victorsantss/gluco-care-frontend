import Image from 'next/image'
import styled from 'styled-components'

export const MenuCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 17.5rem;
  height: 15rem;
  padding: 1rem;
  border: 1px solid;
  border-radius: 1.5rem;
  cursor: pointer;
  background-color: white;
  box-shadow: 0 2px 5px #888888;

  &:hover {
    box-shadow: 0 10px 8px #888888;
  }
`
export const MenuCardTitle = styled.span`
  font-size: 2rem;
  text-align: center;
`
export const MenuCardIcon = styled(Image)`

`
