import React, {useEffect, useState} from 'react';
import LaoutAdmin from "./laoutAdmin";
import {Box, Flex} from "@chakra-ui/react";
import MostHaveCourseApi from "../../API/AdminApi/MostHaveCourseApi";
import SubjectApi from "../../API/subjectApi";
import login from "../login";
import Loader from "../Loader";

const InformationAboutAllCourses = () => {
    const [idCourse, setIdCourse] = useState()
    const [allMoney,setAllMoney]= useState(0)
    let mon = 0;
    const [course, setCourse] = useState()
    const [money,setMoney] = useState()
    useEffect(() => {
        fetchMastHaveIdCourse()
        fetchMoney()
        if (idCourse){fetchMastHaveCourse(idCourse)}
    }, [idCourse])

     function fetchMastHaveIdCourse() {
        const result =  MostHaveCourseApi.TakeIdCourse()
         result.then((e)=>setIdCourse(e[0].curse_id))
        // setIdCourse(result[0].curse_id)
    }

     function fetchMastHaveCourse(id) {
        const result =  MostHaveCourseApi.TakeMostCourse(id)
        result.then(e=>setCourse(e))
    }
    async function fetchMoney() {
        const result = await MostHaveCourseApi.MoneyTaked()
        setMoney(result)
    }
if (money&& mon === 0&& allMoney === 0){
    money.map(val => {
        mon = mon+val.curse.price});
    setAllMoney(mon)
}
    console.log(allMoney)
  // if(idCourse){
  //       fetchMastHaveCourse(idCourse)
  //       console.log(course)
  // }
    // if (idCourse) {
    //     id = idCourse
    //     console.log(id)
    //     fetchMastHaveCourse()
    //     console.log(course)
    //     // fetchMastHaveCourse(idCourse[0].curse_id)
    // }
    return (
        <div>
            <LaoutAdmin>
                <div>
                    {course&&allMoney
                        ? <Flex w={'100%'} justifyContent={'space-around'} flexWrap={{sm: 'wrap', base: 'wrap'}}>
                        <Box>
                            <Box>Часто покупаемый курс:</Box>
                           <div style={{border:'1px solid red'}}>{course.title}</div>
                        {/*   ТУТ ЛЕЖИТ ВСЕ О КУРСЕ, КАК ТО ЕГО ОТРИСОВАТЬ */}
                        </Box>
                        <Box>
                            <Box>Всего заработано денег:</Box>
                            <div style={{border:'1px solid red'}}>{allMoney}</div>
                        </Box>
                        <Box>
                            eeee
                        </Box>
                    </Flex>
                        : <Loader/>
                    }
                </div>
            </LaoutAdmin>
        </div>
    );
};

export default InformationAboutAllCourses;