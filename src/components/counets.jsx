import React, {useState} from 'react';

const Counets = () => {
     const [element, funct] = useState(0)    // function add(){
    //      funct(element+1)
    // }
    //
    // function del(){
    //      funct(element-1)
    // }
    return (
        <div>
            <h1>{element}</h1>
            <button onClick={()=>funct(element+1)}>Добавить</button>
             <button onClick={()=>funct(element-1)}>отбавить</button>
        </div>
    );
};

export default Counets;