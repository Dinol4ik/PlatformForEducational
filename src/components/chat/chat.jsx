import React, {useState} from 'react';
import {Button, Input} from "@chakra-ui/react";
import SocketCon from "./ws";
import {json, useParams} from "react-router-dom";
import Loader from "../Loader";
import data from "bootstrap/js/src/dom/data";
import login from "../login";

const url = new URL(window.location.href)
// const urlParams  = url.toString().split("/")
// const id = urlParams[urlParams.length-1]

// function getParam(){
//      const id = useParams()
//     return id.id
// }
// let connection;
const m = []
const Chat = () => {
    const paramsId = useParams()
    const [messages, setMessages] = useState([]);
    const id = paramsId.id
    const [socket, setConnection] = useState()
    if (!socket) {
        setConnection(SocketCon.getSocket(id))
    }
    if (socket) {
        localStorage.setItem("chat", socket)
        socket.onmessage = function (event) {
            if (m.length === 0 && JSON.parse(event.data).map) {
                // console.log(event.data, "Вначале приходит")
                // console.log(JSON.parse(event.data), "распаршен")
                JSON.parse(event.data).map(f => {
                    m.push(JSON.parse(f))
                    // setMessages([...messages, JSON.parse(f)])
                })
            }
           else setMessages([...messages, JSON.parse(JSON.parse(event.data))])

        };
    }
    const handleSubmit = (event) => {
        if (event){
        event.preventDefault();
            }
        // const message = JSON.parse(localStorage.getItem("profileName")).first_name + ": " + event.target.elements.message.value;
        const message = {
            user: JSON.parse(localStorage.getItem("profileName")).first_name,
            message:  event.target.elements.message.value 
        }

        socket.send(JSON.stringify(message));
        // event.target.elements.message.value = '';
    };
    console.log(messages)
    return (
        socket
            ? <div style={{height: "1vh", textAlign: "center", marginTop: "0%"}}>
            <pre style={{
                position: "relative",
                float: "left",
                margin: "auto",
                width: "100%",
                height: "200px",
                border: "1px solid red"
            }}>
                {/*Тут выводятся последние 50 сообщений*/}
                {handleSubmit}
                {m.length>0 || messages.length>0
                    ? <>{m.map(e => <div>{e.user}:{e.message}</div>)}
                        {messages.map(val => <div>{val.user}:{val.message}</div>)}
                        </>
                    :<div>Напишите сообшение чтобы вступить в чат</div>
                }
            </pre>

                <form onSubmit={handleSubmit}>
                    <Input type="text" name="message"/>
                    <Button type={"submit"}>Отправить</Button>
                </form>
            </div>
            : <Loader/>
    );


};

export default Chat;