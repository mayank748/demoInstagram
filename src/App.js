import React,{useState,useEffect} from 'react';
import {db,auth} from './firebaseConfig';
import './App.css';
import Post from './Post';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts,setPosts]=useState([]);
  const [open,setOpen]=useState(false);

  const [openSingIn,setOpenSignIn]=useState(false);

  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const [user,setUser]=useState(null);

useEffect(()=>{
  const unsubscribe=auth.onAuthStateChanged((authUser)=>{
    if(authUser){
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
    }else{
        // user has logged out...
        setUser(null);
    }
  })

  return()=>{
    //perform some clean up action
    unsubscribe();
  }

},[user,username]);


//use effect runs a pieace of code based on a specific condition
useEffect(()=>{
  db.collection('post').onSnapshot(snapshot=> {
    setPosts(snapshot.docs.map(doc=>({
      id:doc.id,
      post:doc.data()})
      ));
  });  
},[]);

const signUp=(event)=>{
  event.preventDefault();

auth.createUserWithEmailAndPassword(email,password)
.then((authUser)=>{
  return authUser.user.updateProfile({
    displayName:username
  })
})
.catch((error)=>alert(error.message))
}

const signIn=(event)=>{
  event.preventDefault();
  auth.signInWithEmailAndPassword(email,password)
  .catch((error)=>{alert(error.message)})

  setOpenSignIn(false);
}

  return (
    <div className="App">

    {user.displayName?(
      <ImageUpload username={user.displayName}/>
    ):(
      <h1>Login to upload</h1>
    )}

      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
            <div style={modalStyle} className={classes.paper}>
              <form className="app_signUp">
              <center >
                <img
                    className="app_headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="Instagram logo"
                  />
              </center>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
                <Button type="submit" onClick={signUp}>SignUp</Button>
            </form>
            </div>
      </Modal>

      <Modal
        open={openSingIn}
        onClose={()=>setOpenSignIn(false)}
      >
            <div style={modalStyle} className={classes.paper}>
              <form className="app_signUp">
              <center >
                <img
                    className="app_headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="Instagram logo"
                  />
              </center>
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
                <Button type="submit" onClick={signIn}>signIn</Button>
            </form>
            </div>
      </Modal>
      <div className="app_header">
        <img
          className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram logo"
        />
      </div>

      {user?(
      <Button onClick={()=>auth.signOut()}>LogOut</Button>
      ):(
        <div className="app_loginContainer">
          <Button onClick={()=>setOpenSignIn(true)}>SignIn</Button>
          <Button onClick={()=>setOpen(true)}>SignUp</Button>
        </div>      
      )}

      <h1>Hi,This is Mayank Singh from Rewa,Madhya Pradesh.</h1>
      {
        posts.map(({id,post})=>(
            <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
      }
    </div>
  );
}

export default App;
