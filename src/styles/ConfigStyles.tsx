import styled from 'styled-components'

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 28rem;
  gap: 0.75rem;
`

export const FormLabel = styled.label`
  width: 28rem;
`

export const FormLabelText = styled.span`
  font-size: 1.5rem;
`

export const FormCheckbox = styled.input`
  transform: scale(2.3);
  margin-left: 0.9375rem;
  color: red;
`

export const FormInput = styled.input`
  width: 100%;
  height: 3rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
  font-family: var(--font-mono);
`

export const FormSaveButton = styled.button`
  width: 100%;
  height: 3.5rem;
  margin-top: 1rem;
  font-size: 1.5rem;
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

export const FormLogoutButton = styled(FormSaveButton)`
  background-color: #E90404;

  &:hover {
    background-color: #BB0303;
  }
`
