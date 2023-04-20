import React from 'react';
import {AnimatePresence} from "framer-motion";

const MyModal = ({children, showModal, setShowModal}) => {
    return (
        <AnimatePresence>
            {showModal && (
                <div onClick={() => {setShowModal(false)}}>
                    <div onClick={event => {event.stopPropagation()}}>
                        {children}
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
        ;
};

export default MyModal;