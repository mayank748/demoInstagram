import { Button } from '@material-ui/core';
import React,{useState} from 'react';
import {db,storage,auth} from './firebaseConfig';
import firebase from 'firebase';

function ImageUpload(username) {
    const [image,setImage]=useState(null);
    const [progress,setProgress]=useState(0);
    const [caption,setCaption]=useState('');
    
    const handleChange=(event)=>{
        if(event.target.files[0]){
            setImage(event.target.files[0]);
        }
    };

    const handleUpload=(event)=>{
        const uploadTask=storage.ref(`image/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                //progress function ...
                const progress=Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            (error)=>{
                //Error function...
                console.log(error);
                alert(error.message);
            },
            ()=>{
                // complete function...
                storage
                .ref("image")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    // post image inside db
                    db.collection("post").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        imageUrl:url,
                        username:username
                    })
                })
            }
        )
    }
    
    return (
        <div>
                  {/* I want to have...
                    Caption input
                    File picker
                    Post button */}
            <input type="text" placeholder='enter some caption...' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload }>Upload</Button>
        </div>
    )
}

export default ImageUpload
