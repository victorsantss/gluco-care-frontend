import styled from 'styled-components'

export const InsulinFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 26.25rem;
  gap: 0.75rem;
`

export const InsulinFormLabel = styled.label`
  width: 24.375rem;
`

export const InsulinFormLabelText = styled.span`
  font-size: 1.5rem;
`

export const InsulinFormInput = styled.input`
  width: 100%;
  height: 3rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
  font-family: var(--font-mono);
`

export const InsulinFormSelect = styled.select`
  width: 100%;
  height: 3rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
  font-family: var(--font-mono);
`

export const InsulinFormCheckbox = styled.input`
  transform: scale(2.3);
  margin-left: 0.9375rem;
  color: red;
`

export const InsulinFormSaveButton = styled.button`
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
