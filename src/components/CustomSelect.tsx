import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface props {
    value:string|undefined,
    defaultValue:string|undefined,
    onChange:(event: SelectChangeEvent<string>) => void,
    disabled:boolean,
    values:string[],
    id:string,
    label:string 
};


const CustomSelect: React.FC<props> = ({value, onChange, defaultValue, disabled, values, id, label}) => {

    return (
        <FormControl sx={{ minWidth: 150 }}>
            <InputLabel  color="secondary">{label}</InputLabel>
            <Select
            sx={{backgroundColor:"#2C3E50",}}
            id={id}
            name={id}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            >
                {values.map((type, index) => <MenuItem key={index} value={type}>{type}</MenuItem>)}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;