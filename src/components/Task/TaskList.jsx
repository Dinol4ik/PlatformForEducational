import React, {useEffect, useState} from 'react';
import axios from "axios";
import SectionApi from "../../API/TaskApi/SectionApi";
import {Link} from "react-router-dom";

const TaskList = () => {
    const [section, setSection] = useState()
    useEffect(() => {
        fetchSection()
    }, [])

    async function fetchSection() {
        const result = await SectionApi.getAllSection()

        setSection(result)
    }

    return (
        <div>
            {section
                ? <>
                    {console.log(section)}
                    {section.map(value => <div key={value.id}>
                        {value.title}
                        <div>{value.section.map(t =>
                            <div  style={{paddingLeft: 30}}>
                                <Link to={'theme/'+t.id}>
                                    {t.title}
                                </Link>

                            </div>)}
                        </div>
                    </div>)}
                </>
                : <div> Подгрузка</div>
            }
        </div>
    );
};

export default TaskList;