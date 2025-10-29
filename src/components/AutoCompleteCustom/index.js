import Autocomplete from "@mui/material/Autocomplete";
import "./style.css"
import TextField from "@mui/material/TextField";

export default function AutoCompleteCustom({
    name,
    options,
    onChange,
    solicitacao,
    title,
    label = "Selecione uma opção",
    required = false
}) {
    const selectedId = solicitacao?.[name] || "";
    const value = options.find(opt => opt.id === selectedId) || null;

    return (
        <div className='container-autocomplete-custom'>
            <p className="label-autocomplete">
                {label}
                {required && <span className="required">*</span>}
            </p>

            <Autocomplete
                options={options}
                title={title}
                className="custom-autocomplete"
                getOptionLabel={(option) => option.nome}
                value={value}
                onChange={(event, newValue) => { onChange(newValue) }}
                renderInput={(params) => <TextField {...params} placeholder={label} />}
            />
        </div>
    );
}