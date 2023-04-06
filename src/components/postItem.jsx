import React, {useState} from 'react';
import MyModal from "../UI/ModalWindow/MyModal";
import {post} from "axios";
import {Card, CardBody, CardHeader, Flex, Text} from "@chakra-ui/react";

const PostItem = (props) => {
    const [active, setActive] = useState(false)
    const [keys, setKeys] = useState(0)

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
            <MyModal visible={active} setVisible={setActive}>
                <Card p={0}>
                    <CardHeader marginX={2} mt={1} p={0}>
                        <Flex fontSize={'12px'} fontWeight={'500'} align={'base-line'}>
                            {props.post.title}
                        </Flex>
                    </CardHeader>
                    <CardBody paddingX={2} paddingY={1}>
                        <Text fontSize='12px'>
                            {props.post.information.split('/').map((item, i) => {
                                return <div key={i}>{item}</div>
                            })}
                        </Text>
                        <button>КУПИТЬ</button>
                    </CardBody>
                </Card>
                {/*<div className="hui" style={{border: "1px solid red"}}>{props.post.title}</div>*/}
                {/*<div className="pizda">*/}
                {/*    <div className="contentInModal">*/}
                {/*        {props.post.information.split('/').map((item, i) => {*/}
                {/*            return <div key={i}>{item}</div>*/}
                {/*        })}*/}
                {/*    </div>*/}
                {/*    <button>КУПИТЬ</button>*/}
                {/*</div>*/}
            </MyModal>
        </div>
    );
};

export default PostItem;