import React from 'react';

const Mainpage = () => {
    return (
        <div>
            <form action='http://127.0.0.1:8000/api/v1/curses' method='POST'>
                <input type='text'name='title'/>
                <input type='text'name='about'/>
                <input type='text'name='price'/>
                <input type='text'name='subject'/>
                <input type='text'name='information'/>
                <button>Добавить запись!</button>
            </form>
        </div>
    );
};

export default Mainpage;