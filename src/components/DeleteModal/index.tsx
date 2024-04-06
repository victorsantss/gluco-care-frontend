import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Button } from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 4,
  boxShadow: 24,
  p: 4
}

interface DeleteModalProps {
  isOpen: boolean
  insulinId: number | null
  onClose: () => void
  onConfirmDelete: (id: number | null) => void
}

export default function DeleteModal ({ isOpen, insulinId, onClose, onConfirmDelete }: DeleteModalProps): JSX.Element {
  const handleDeleteClick = (): void => {
    onConfirmDelete(insulinId)
    onClose()
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" fontWeight={'bold'} textAlign={'center'} fontFamily={'Sora, sans-serif'}>
            Deseja realmente excluir o Registro?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }} textAlign={'center'} fontFamily={'Sora, sans-serif'}>
            Esta ação não poderá ser desfeita!
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-evenly' }}>
            <Button color="error" variant="contained" onClick={handleDeleteClick}>
              Confirmar
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
