import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

interface props {
    value: string | undefined,
    defaultValue: string | undefined,
    onChange: (event: SelectChangeEvent<string>) => void,
    disabled: boolean,
    values: string[],
    id: string,
    label: string
    error: boolean,
    helperText: string|undefined,
};


const CustomSelect: React.FC<props> = ({
    value,
    onChange,
    defaultValue,
    disabled,
    values,
    id,
    label,
    error,
    helperText
}) => {

    return (
        <FormControl sx={{ minWidth: 150 }}>
            <InputLabel error={error} color="secondary">{label}</InputLabel>
            <Select
                sx={{ backgroundColor: "#2C3E50", }}
                id={id}
                name={id}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={disabled}
                error={error}
            >
                {values.map((type, index) => <MenuItem key={index} value={type}>{type}</MenuItem>)}
            </Select>
            {error?<Typography marginLeft={1} marginTop={0.5} color="red" fontSize={12}>{helperText}</Typography>:null}
        </FormControl>
    );
};

export default CustomSelect;