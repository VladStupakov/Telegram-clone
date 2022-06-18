import React, { useState, useEffect } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import ReactPlayer from 'react-player'
import DescriptionIcon from '@mui/icons-material/Description';

const Message = ({ body, user, type, id }) => {

    const requestUrl = 'http://localhost:3001/' + '/' + type + '/' + id
    const [src, setLightboxSrc] = useState(null)

    const MediaContainer = ({ filename }) => {
        const src = requestUrl + '/' + filename
        const fileExt = filename.split('.').pop()
        if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'gif')
            return (
                <img src={src} style={imageStyle} onClick={() => setLightboxSrc(src)} className='mediaFile'></img >
            )
        else if (fileExt === 'mp4')
            return (
                <ReactPlayer className='mediaFile' url={src} controls={true} />
            )
        else
            return (
                <div onClick={() => handleFileDownload(src, filename)} className='fileContainer'>
                    <DescriptionIcon fontSize='large' />
                    <span className='fileName'>{filename}</span>
                </div>
            )
    }

    const handleFileDownload = (src, filename) => {
        fetch(src)
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob)
                    let a = document.createElement('a')
                    a.href = url
                    a.download = filename
                    a.click();
                });
            });
    }

    const imageStyle = {
        "maxWidth": "600px",
        "maxHeight": "600px"
    };

    return (
        <div className={`Chat__Message ${body.author === user ? "Chat__Reciever" : ""}`}>
            <div className="media" >
                {
                    body.media.length === 0 ? "" :
                        body.media.map(file => {
                            return <MediaContainer filename={file} key={file.split('.').slice(0, -1).join('.')} />
                        })

                }
                {src && (
                    <Lightbox
                        mainSrc={src}
                        onCloseRequest={() => setLightboxSrc(null)}
                    />
                )}
            </div>
            <div>{body.text}</div>
            <div className="Chat__TimeStamp" >{body.timestamp}</div>
        </div>
    )
}

export default Message