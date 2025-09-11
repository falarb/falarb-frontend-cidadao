import Autocomplete from "@mui/material/Autocomplete";
import "./style.css"
import TextField from "@mui/material/TextField";

export default function AutoCompleteCustom({
    name,
    options,
    onChange,
    solicitacao,
    label = "Selecione uma opção",
}) {
    const selectedId = solicitacao?.[name] || "";
    const value = options.find(opt => opt.id === selectedId) || null;

    return (
        <div className='container-autocomplete-custom'>
            <p className="label-autocomplete">{label}</p>

            <Autocomplete
                options={options}
                className="custom-autocomplete"
                getOptionLabel={(option) => option.nome}
                value={value}
                onChange={(event, newValue) => { onChange(newValue) }}
                renderInput={(params) => <TextField {...params} placeholder={label} />}
            />
        </div>
    );
}