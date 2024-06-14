import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6rem;
`

export const UserIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid #b2b9f9;
  border-opacity: 0.1;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: var(--font-mono);

  &:hover {
    background-color: #f0f0f0;
  }

  span {
    font-size: 0.875rem;
    text-transform: uppercase;
    font-weight: 700;
    color: #5061FC;
  }
`
