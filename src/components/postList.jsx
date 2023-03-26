import React, {useState,useEffect} from 'react';
import PostItem from "./postItem";
import MyModal from "../UI/ModalWindow/MyModal";

const PostList = (post) => {
    const [curseArray,setCurseArray] = useState([])
    function hand(e){
        const a = document.querySelector('.items')
       let testovii = []
        for (let i = 0; i < a.children.length; i++) {
            a.children.item(i).id=''
        }
       if( e.target.id !== 'active'){
          (post.post.map(ed=>
           {
               if(ed.subject.title === e.target.outerText){
                   testovii.push(ed)
               }
           }
           ))
           e.target.id='active'
           setCurseArray(testovii)
           testovii = []
       }
       else e.target.id=''
    }
    return (
        <div>
            <div className="content">
                Тут будут новости!
            </div>
            <div className="select-item">
                <div className="items">

                    {post.subject.map(test=>
                        test.title === "Математика"
                            ? <div
                                key={test.title}
                                onClick={hand}
                                className='name-items' id=''>{test.title}</div>
                            :<div
                                key={test.title}
                                onClick={hand}
                                className='name-items' id=''>{test.title}</div>
                    )}
                </div>
            </div>
<div className="main-content">
            <div className="item-info">
                <div className="item-info-inside">
                    {curseArray.map(posts => <PostItem post={posts} key ={posts.id}/>)}
                </div>
                </div>
            </div>
        </div>
    );
};

export default PostList;