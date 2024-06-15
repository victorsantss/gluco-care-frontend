import styled from 'styled-components'

export const GlucoseReadingFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 26.25rem;
  gap: 0.75rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid;
`

export const GlucoseReadingTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const GlucoseReadingFormTabTitle = styled.h2<{ $currentTabTitle: boolean }>`
  opacity: ${({ $currentTabTitle }) => ($currentTabTitle ? 1 : 0.3)};
  cursor: pointer;
  font-size: 1.5rem;
`

export const GlucoseReadingFormLabel = styled.label`
  width: 24.375rem;
`

export const GlucoseReadingFormLabelText = styled.span`
  font-size: 1.5rem;
`

export const GlucoseReadingFormInput = styled.input`
  width: 100%;
  height: 3rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
  font-family: var(--font-mono);
`

export const GlucoseReadingFormSelect = styled.select`
  width: 100%;
  height: 3rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
  font-family: var(--font-mono);
`

export const GlucoseReadingFormCheckbox = styled.input`
  transform: scale(2.3);
  margin-left: 0.9375rem;
  color: red;
`

export const GlucoseReadingFormSaveButton = styled.button`
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
