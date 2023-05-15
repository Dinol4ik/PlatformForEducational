import React, {useEffect, useState} from 'react';
import {Box, Center, Grid, GridItem, Heading, useColorModeValue,} from "@chakra-ui/react";
import CalendarDay from "./CalendarDay";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import LessonAPI from "../../API/lessonAPI";
import AnimationLayout from "../AnimationLayout";

const date = new Date()
const named_day = {0: 'пн', 1: 'вт', 2: 'ср', 3: 'чт', 4: 'пт', 5: 'сб', 6: 'вс'}

const month_name = {
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь',
}
const idToMonth = {
    'Январь': 0,
    'Февраль': 1,
    'Март': 2,
    'Апрель': 3,
    'Май': 4,
    'Июнь': 5,
    'Июль': 6,
    'Август': 7,
    'Сентябрь': 8,
    'Октябрь': 9,
    'Ноябрь': 10,
    'Декабрь': 11,
}
const count_day_in_month = {
    'Январь': 31,
    'Февраль': 28,
    'Март': 31,
    'Апрель': 30,
    'Май': 31,
    'Июнь': 30,
    'Июль': 31,
    'Август': 31,
    'Сентябрь': 30,
    'Октябрь': 31,
    'Ноябрь': 30,
    'Декабрь': 31,
}

const Month = ({month, monthBack, monthNext, ...props}) => {

    return (
        <GridItem
            colSpan={7}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            _selected={{bg: 'red'}}
            {...props}>
            <ChevronLeftIcon h={8} w={'auto'} paddingX={'20px'} ml={'25%'}
                             _hover={{bg: 'blue.200', rounded: 'md', cursor: 'pointer'}}
                             onClick={monthBack}/>
            <Center fontSize={'2xl'} fontWeight={'semibold'} _selected={{bg: 'red'}}>
                {month}
            </Center>
            <ChevronRightIcon h={8} w={'auto'} paddingX={'20px'} mr={'25%'}
                              _hover={{bg: 'blue.200', rounded: 'md', cursor: 'pointer'}}
                              onClick={monthNext}/>
        </GridItem>
    )
}

const DayOfWeek = ({name, ...props}) => {
    return (
        <GridItem
            paddingY={4}
            bg={useColorModeValue('blue.200', 'blue.400')}
            color={useColorModeValue('black', 'white')}
            fontSize={'18px'}
            {...props}
        >
            <Center>
                {name}
            </Center>
        </GridItem>
    )
}

const Calendar = () => {

    const [lessons, setLessons] = useState()
    useEffect(() => {
        fetchLessons()
    }, [])

    async function fetchLessons() {
        const lesson = await LessonAPI.getAll();
        setLessons(lesson)
    }

    const firstDayInMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const [maxDayInMonth, setMaxDayInMonth] = useState(count_day_in_month[month_name[date.getMonth()]])
    const [currentMonth, setCurrentMonth] = useState(month_name[date.getMonth()])
    const [colStart, setColStart] = useState(firstDayInMonth.getDay())

    const changeMonthBack = () => {
        console.log(idToMonth[currentMonth])
        if (idToMonth[currentMonth] < 0)
            setCurrentMonth(month_name["12"])
        else
            setCurrentMonth(month_name[idToMonth[currentMonth] - 1])

        const newFirstDayInMonth = new Date(date.getFullYear(), idToMonth[currentMonth] - 1, 1)
        setColStart(newFirstDayInMonth.getDay())
        setMaxDayInMonth(count_day_in_month[month_name[idToMonth[currentMonth] - 1]])
    }

    const changeMonthNext = () => {
        console.log(idToMonth[currentMonth])
        if (idToMonth[currentMonth] > 10)
            setCurrentMonth(month_name["0"])
        else
            setCurrentMonth(month_name[idToMonth[currentMonth] + 1])

        const newFirstDayInMonth = new Date(date.getFullYear(), idToMonth[currentMonth] + 1, 1)
        setColStart(newFirstDayInMonth.getDay())
        setMaxDayInMonth(count_day_in_month[month_name[idToMonth[currentMonth] + 1]])
    }

    return (
        <AnimationLayout>
            {lessons &&
                <>
                    <Box maxW="container.xl" marginX={"auto"} paddingX={'40px'}>
                        <Heading fontSize={'28px'}>
                            Календарь занятий
                        </Heading>
                        <Grid templateColumns='repeat(7, 1fr)' templateRows='repeat(2, 1fr)' gap={1}>
                            <Month
                                month={currentMonth}
                                monthBack={changeMonthBack}
                                monthNext={changeMonthNext}
                            >
                            </Month>
                            {Array(7).fill('').map((_, i) => (
                                <DayOfWeek key={i} name={named_day[i]}></DayOfWeek>
                            ))}
                            {Array(maxDayInMonth).fill('').map((_, i) => (
                                <CalendarDay
                                    date={i + 1}
                                    month={idToMonth[currentMonth] + 1}
                                    year={date.getFullYear()}
                                    key={i}
                                    lessons={lessons}
                                    colStart={(colStart + i) % 7 === 0 ? 7 : (colStart + i) % 7}/>
                            ))}
                        </Grid>
                    </Box>
                </>
            }
        </AnimationLayout>
    );
};

export default Calendar;