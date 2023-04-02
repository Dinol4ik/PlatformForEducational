import React from 'react';
import {Box} from "@chakra-ui/react";

const PostItem = (props) => {
    const subjectName = props.post.subject.title
    const courseTitle = props.post.title
    const courseInformation = props.post.about
    const coursePrice = props.post.price

    return (
        <Box>{subjectName}</Box>
        // <div className="about-item">
        //     <div className="some-info">
        //         <div className="main-info">
        //             <div className="delimer">
        //                 <div className="name-subj">
        //                     <span className="name-subj-of-curse">
        //                         {props.post.subject.title}
        //                     </span>
        //                 </div>
        //                 <div className="name">{props.post.title}</div>
        //             </div>
        //             <div className="delimer">
        //                 <div className="information">
        //                     {props.post.about}
        //                 </div>
        //                 <div className="bonus">
        //                     <ul>
        //                         <li>4 Онлайн занятий в неделю</li>
        //                         <li>Записи всех занятий</li>
        //                         <li>Еженедельное тематическое ДЗ по первой и второй части</li>
        //                         <li>4 пробника с экспертной проверкой за месяц</li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="bottom-fixed">
        //             <div className="p">
        //                 <div className="price">
        //                     <span className="month">
        //                         Месяц
        //                     </span>
        //                     <span className="price-curse">{props.post.price} рублей</span>
        //                 </div>
        //             </div>
        //             <div className="button">
        //                 <div className="buy">Купить подписку</div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default PostItem;