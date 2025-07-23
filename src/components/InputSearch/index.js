import './styles.css'

export default function InputSearch ( { label, type, name, value, onChange, adicionalClass, placeholder } ) {
    return ( 
        <div className="container-input-search">
            <label>{label}</label>
            <input 
                className={`${adicionalClass} input-search`}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        </div>
    )
}