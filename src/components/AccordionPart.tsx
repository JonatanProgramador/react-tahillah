import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import LettersInterface from "../interface/LettersInterface";

interface props {
    letters:LettersInterface;
    deleteLetter:(id:number) => void
    setLetterEdit:(id:number) => void
}
  const AccordionPart: React.FC<props> = ({letters, deleteLetter, setLetterEdit}) =>  {
    return (<Accordion>
        <AccordionSummary
            expandIcon={<ExpandMore color="secondary" />}>
            <Typography fontWeight="bold" sx={{ flexGrow: 1 }} component="span">{letters.summary.toLocaleUpperCase()}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography fontSize={20}>{letters.letter}</Typography>
        </AccordionDetails>
        <AccordionActions>
            <Button onClick={()=>setLetterEdit(letters.id)}>Editar</Button>
            <Button onClick={()=>deleteLetter(letters.id)}>Eliminar</Button>
        </AccordionActions>
    </Accordion>);
}

export default AccordionPart;