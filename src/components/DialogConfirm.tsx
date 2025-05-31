import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


interface props {
    open: boolean,
    title: string,
    description: string,
    setOpen: (value: boolean) => void,
    confirm: () => void
}

const DialogConfirm: React.FC<props> = ({ open, setOpen, title, description, confirm }) => {
    return (
        <Dialog onClose={() => setOpen(false)} open={open}>
            <DialogTitle align="center">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
                <DialogActions>
                    <Button onClick={()=>{confirm(); setOpen(false)}} variant="contained">Si</Button>
                    <Button onClick={()=> setOpen(false)} variant="contained">No</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

export default DialogConfirm;