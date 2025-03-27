import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

interface props {
    open: boolean,
    setOpen: (value: boolean) => void,
}

const DialogCreateLetter: React.FC<props> = ({ open, setOpen }) => {
    return (
        <Dialog onClose={() => setOpen(false)} open={open}>
            <DialogTitle align="center">Creado letra</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
                <TextField label="Tipo" sx={{ width: '200px', backgroundColor: '#2C3E50', marginBottom: 1, marginTop: 1 }} color="secondary"></TextField>
                <TextField multiline rows={10} label="Letra" sx={{ width: '200px', backgroundColor: '#2C3E50', marginBottom: 1, marginTop: 1 }} color="secondary"></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setOpen(false)}>Cancelar</Button>
                <Button>Crear</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogCreateLetter;