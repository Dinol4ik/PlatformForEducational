import React, {useState} from 'react';
import {Button, Input} from "@chakra-ui/react";
import SocketCon from "./ws";
import {useParams} from "react-router-dom";
import Loader from "../Loader";
const url = new URL(window.location.href)
// const urlParams  = url.toString().split("/")
// const id = urlParams[urlParams.length-1]

// function getParam(){
//      const id = useParams()
//     return id.id
// }
// let connection;
const Chat = () => {
    const paramsId = useParams()
    const [messages, setMessages] = useState([]);
    const id = paramsId.id
    const [socket,setConnection] = useState()
    if (!socket){
        setConnection(SocketCon.getSocket(id))
    }
    if (socket){
        localStorage.setItem("chat",socket)
        const t = typeof localStorage.getItem("chat")
        console.log(t)
          console.log(socket)
     socket.onmessage = function (event) {
        setMessages([...messages, event.data]);
    };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const message = JSON.parse(localStorage.getItem("profileName")).first_name + ": " + event.target.elements.message.value;
        socket.send(message);
        event.target.elements.message.value = '';
    };
    return (
        socket
            ?<div style={{height: "1vh", textAlign: "center", marginTop: "0%"}}>
            <pre style={{
                position: "relative",
                float: "left",
                margin: "auto",
                width: "100%",
                height: "200px",
                border: "1px solid red"
            }}>
                {messages.map(msg => <div>
                    {msg}
                </div>)}
            </pre>

            <form onSubmit={handleSubmit}>
                <Input type="text" name="message"/>
                <Button type={"submit"}>Отправить</Button>
            </form>
        </div>
            : <Loader/>
    );

    // const [socket,setConnection] = useState(SocketCon.getSocket(id))
    // const [messages, setMessages] = useState([]);
    // console.log(socket)
    // socket.onmessage = function (event) {
    //     setMessages([...messages, event.data]);
    // };
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const message = JSON.parse(localStorage.getItem("profileName")).first_name + ": " + event.target.elements.message.value;
    //     socket.send(message);
    //     event.target.elements.message.value = '';
    // };
    // return (
    //     <div style={{height: "1vh", textAlign: "center", marginTop: "0%"}}>
    //         <pre style={{
    //             position: "relative",
    //             float: "left",
    //             margin: "auto",
    //             width: "100%",
    //             height: "200px",
    //             border: "1px solid red"
    //         }}>
    //             {messages.map(msg => <div>
    //                 {msg}
    //             </div>)}
    //         </pre>
    //
    //         <form onSubmit={handleSubmit}>
    //             <Input type="text" name="message"/>
    //             <Button type={"submit"}>Отправить</Button>
    //         </form>
    //     </div>
    // );


};

export default Chat;