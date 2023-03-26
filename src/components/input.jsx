import React, {useState} from 'react';

const Input = () => {
    const [value,setValue] = useState('')
    return (
        <div>
            <h1>{value}</h1>
            <input onChange={event => setValue(event.target.value)} type='text'/>
        </div>
    );
};

export default Input;