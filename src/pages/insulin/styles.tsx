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
