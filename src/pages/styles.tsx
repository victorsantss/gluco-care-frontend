import styled from 'styled-components'

export const Main = styled.main`
  font-family: var(--font-mono);
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: calc(100vh - 20rem);
`

export const Title = styled.h1`
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 32.5rem;
  gap: 0.75rem;
`

export const LoginLabel = styled.label`
  width: 32.5rem;
`

export const LoginLabelText = styled.span`
  font-size: 1.5rem;
`

export const LoginInput = styled.input`
  width: 100%;
  height: 3rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
  font-family: var(--font-mono);
`

export const LoginButton = styled.button`
  width: 100%;
  height: 3.5rem;
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  border: 1px solid;
  border-radius: 0.6rem;
  font-family: var(--font-mono);
  cursor: pointer;
  color: white;
  background-color: #6674F4;

  &:hover {
    background-color: #5468d4;
  }
`

export const LoginButtonRegister = styled(LoginButton)`
  color: #000;
  background-color: transparent;
  border: 3px #A1A1A1 solid;

  &:hover {
    background-color: #A1A1A1;
  }
`
