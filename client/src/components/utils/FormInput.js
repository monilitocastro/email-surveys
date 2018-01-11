import React from 'react';

function FormInput({input, name, label, meta:{touched, error}}){
    return(
    <div className="input-field col s6">
        <label htmlFor={name}>{label}</label><br/>
        <input  {...input} type='text' name={name} />
        {touched && error && <span className="red-text darken-1">{error}</span>}
    </div>
    );
}

export default FormInput