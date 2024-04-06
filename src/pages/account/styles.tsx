import styled from 'styled-components'

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 32.5rem;
  gap: 0.75rem;
`

export const RegisterLabel = styled.label`
  width: 32.5rem;
`

export const RegisterLabelText = styled.span`
  font-size: 1.5rem;
`

export const RegisterInput = styled.input`
  width: 100%;
  height: 3rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
  font-family: var(--font-mono);
`

export const RegisterButton = styled.button`
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
