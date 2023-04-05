import React, {useState} from 'react';
import MyModal from "../UI/ModalWindow/MyModal";
import {post} from "axios";

const PostItem = (props) => {
    const [active,setActive] = useState(false)
     const [keys,setKeys] = useState(0)
    function modalView() {
        setActive(true)
    }

    return (
                    <div className="about-item">
                        <div className="some-info">
                            <div className="main-info">
                                <div className="delimer">
                                    <div className="name-subj">
                                <span className="name-subj-of-curse">
                                    {props.post.subject.title}
                                </span>
                                    </div>
                                    <div className="name">{props.post.title}</div>
                                </div>
                                    <div className="delimer">
                                        <div className="information">
                                            {props.post.about}
                                        </div>
                                        <div className="bonus">
                                            <ul>
                                                <li>4 Онлайн занятий в неделю</li>
                                                <li>Записи всех занятий</li>
                                                <li>Еженедельное тематическое ДЗ по первой и второй части</li>
                                                <li>4 пробника с экспертной проверкой за месяц</li>
                                            </ul>
                                        </div>
                                    </div>

                            </div>
                            <div className="bottom-fixed">
                                <div className="p">
                                    <div className="price">
                                <span className="month">
                                    Месяц
                                </span>
                                        <span className="price-curse">{props.post.price} рублей</span>
                                    </div>
                                </div>
                                <div className="button">
                                    <div className="buy" onClick={modalView}>Купить подписку</div>
                                </div>
                            </div>
                        </div>
                        <MyModal  visible={active} setVisible={setActive}>
                            <div className="hui" style={{border:"1px solid red"}}>{props.post.title}</div>
                            <div className="pizda">
                                <div className="contentInModal">
                                    {props.post.information.split('/').map((item,i)=>{ return  <div key={i}>{item}</div>})}
                                </div>
                                <button>КУПИТЬ</button>

                            </div>
                        </MyModal>
                    </div>
    );
};

export default PostItem;