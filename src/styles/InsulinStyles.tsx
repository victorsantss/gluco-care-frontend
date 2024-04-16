import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'

export const StyledDataGrid = styled(DataGrid)`
  && {
      font-family: 'Sora', sans-serif;
      font-size: 1.2rem;
      border: 2px solid #000;
      --unstable_DataGrid-radius: 0.6rem;
  }
`

export const TableContainer = styled.div`
  width: 80%;
`

export const TableAddButton = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const NewRegisterButton = styled.button`
  height: 3.3125rem;
  margin-bottom: 1.375rem;
  font-size: 1.5rem;
  padding: 0.5rem;
  border: 2px solid;
  border-radius: 0.6rem;
  font-family: var(--font-mono);
  cursor: pointer;
  color: black;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #f0f0f0;
  }
`
