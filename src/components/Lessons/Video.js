import React from 'react';

const Video = ({src}) => {
    return (
        <video width="400" height="300" controls="controls" preload="auto" controlsList="nodownload">
            <source src={src}/>
        </video>
    );
};

export default Video;