import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import LettersInterface from "../interface/LettersInterface";

interface props {
    letters:LettersInterface;
}
  const AccordionPart: React.FC<props> = ({letters}) =>  {
    return (<Accordion>
        <AccordionSummary
            expandIcon={<ExpandMore color="secondary" />}>
            <Typography fontWeight="bold" sx={{ flexGrow: 1 }} component="span">{letters.summary.toLocaleUpperCase()}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography fontSize={20}>{letters.letter}</Typography>
        </AccordionDetails>
        <AccordionActions>
            <Button>Editar</Button>
            <Button>Eliminar</Button>
        </AccordionActions>
    </Accordion>);
}

export default AccordionPart;