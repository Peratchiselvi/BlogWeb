import { Fragment, useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import {axios} from "axios";
import Cookies from "js-cookie";
import {useCookies} from "react-cookie";
import {BrowserRouter,Link,Routes,Route,Navigate,useNavigate,useLocation} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp,faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import './App.css';
// import { } from '@fortawesome/pro-regular-svg-icons';
// window.token = Cookies.get("token");
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={< Login/>}></Route>
        <Route exact path="/signUp" element={< SignUp/>}></Route>
        <Route path="/dashboard" element={< Dashboard/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}


function Login(){
  const loc = useLocation();
  let cookie = Cookies.get("token");
  const nav = useNavigate();
  const {  register, handleSubmit, formState: { errors }} = useForm();
  if(cookie !== undefined){
    return <Navigate to='/dashboard' />
  }
function redirection(res){
  if(res.result){    
    nav('/dashboard');
  }
  else{
    console.log(res.msg);
    nav('/',{state:{result: res.result,msg: res.msg}});
  }
}
function formValidate(data){
console.log(data);
const req = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: "include",
  body: JSON.stringify(data)
};
fetch("http://localhost:8080/logIn", req).then(response => response.json() ).then(res => {
  console.log(res.result);
  // console.log(Cookies.get("token"));
    redirection(res);
  
})
}
  return <Fragment>
    {!loc && <p>{loc.state.msg}</p>}
    <form onSubmit={handleSubmit(formValidate)}>
    <label>MailId</label>
    <input type="text" name="mid" {...register("mid",{ required: true})}/>
    {errors.mid && <p>Invalid UId</p>}
    <label>Password</label>
  <input type="text" name="pass" {...register("pass",{ required: true})}/>
    {errors.pass && <p>Invalid Password</p>}
      <input type="submit"/>
    </form>
    <Link to='/signUp'>Register Here</Link>
  </Fragment>
}
// function Check(){
//   const req = {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     credentials: "include"
//   };
//   fetch("http://localhost:8080/hi", req);
// }
function SignUp(){
  const {  register, handleSubmit, formState: { errors }} = useForm();
  // console.log(Cookies.get("token"));
  
const [token,setToken] = useCookies();
const nav = useNavigate();
const loc = useLocation();
function redirection(res){
  if(res.result){    
    nav('/dashboard');
  }
  else{
    console.log(res.msg);
    nav('/',{state:{result: res.result,msg: res.msg}});
  }
}
function formValidate(data){
console.log(data);
const req = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: "include",
  body: JSON.stringify(data)
};
fetch("http://localhost:8080/signUp", req).then(response => response.json() ).then(res => {
  console.log(Cookies.get("token"));
  // Cookies.set("token",token.token);
  redirection(res);
  console.log(res);
})
// try {
//   axios.post("http://localhost:8080/signUp", req);
//   // history.push("/");
// } catch (error) {
//   if (error.response) {
//       console.log(error.response.data.msg);
//   }
// }
}
return (<Fragment>  
  {!loc && <p>{loc.state.msg}</p>}
<form onSubmit={handleSubmit(formValidate)}>
    <label>UserName</label>
    <input type="text" name="uName" {...register("uName",{ required: true})}/>
    {errors.uName && <p>Invalid UId</p>}
    <label>MailId</label>
    <input type="text" name="mid" {...register("mid",{ required: true})}/>
    {errors.mid && <p>Invalid UId</p>}
    <label>Contact Number</label>
    <input type="text" name="cno" {...register("cno",{ required: true})}/>
    {errors.cno && <p>Invalid UId</p>}
    <label>Password</label>
  <input type="text" name="pass" {...register("pass",{ required: true})}/>
    {errors.pass && <p>Invalid Password</p>}
  <input type="submit"/>
</form>
<Link to='/'>Already have an Account</Link>
</Fragment>
);
}

function Dashboard(){
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [postCreate,setPostCreate] = useState(false);
  const [postComments,setPostComments] = useState([]);
  const [followersOf,setFollowersOf] = useState([]);
  const [doRender,setDoRender] = useState(false);
  const [userId,setUserId] = useState(null);
  useEffect(() => {
    const req = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include"
    };
    fetch("http://localhost:8080/allPosts", req).then(response => response.json()).then(res => {
    console.log(res);
    // setPostActions(res.postActions);
    setPostComments(res.postComments);
    setUserId(res.userId);
    setFollowersOf(res.followers);
  })},[doRender]);
  function setRender(){
    setDoRender(prevValue => (!prevValue));
  }
  
  function formValidate(data,event){
  console.log(data);
  event.target.reset();
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: "include",
    body: JSON.stringify(data)
  };
  fetch("http://localhost:8080/makePost", req).then(response => response.json() ).then(res => {
    console.log(res);
    setDoRender(prevValue => (!prevValue));
    setPostCreate(prevValue => (!prevValue));
    // setPosts(res.result);
  })
  }
    return <Fragment>
      {postComments && postComments.map((post) => {
        const isFollowing = followersOf.some((follower) => {
          if(follower['user'] === post.UserId){
            return true;
          }
          return false;
        })
      // followersOf.map((follower) => {
      //   if(follower['user'] === post.UserId){
      //     let isFollowing = true;
      //   }
      // }
      // );
       return <Post post={post} setRender = {setRender} userId={userId} isFollowing={isFollowing}/>})}
      <button onClick={() => {setPostCreate(true)}}>Add Post</button>
      {postCreate && <form onSubmit={handleSubmit(formValidate)}>
      <label>Post Here</label>
      <input type="text" name="post" {...register("post",{ required: true})}/>
      {errors.post && <p>Invalid UId</p>}
        <input type="submit" value="Post"/>
        {/* <button type="reset" value="Reset"/></button> */}
        <input type="reset" className="cancel" value="Cancel" onClick={()=>{setPostCreate(false)}}/>
      </form>}
      {/* <form onSubmit={handleSubmit(formValidate)}>
      <label>Comment Here</label>
      <input type="text" name="comment" {...register("comment",{ required: true})}/>
      {errors.comment && <p>Invalid UId</p>}
        <input type="submit"/>
      </form> */}
    </Fragment>
}

function Comment(props){
  const [showComment,setShowComment] = useState(false);
  const [doShowComment,setDoShowComment] = useState(false);
  let [isAction,setIsAction] = useState(false);
  const comment = props.comment;
//   if(comment.Actions.length > 0){
//     setIsAction(true);
  let {like,dislike,isLiked,isDisLiked} = actionCount(comment.CommentActions,props.userId);
// console.log(like);
// }
  function setComment(){
    setShowComment(prevValue => (!prevValue));
  }
  return  <div style={{ borderTop:"1px solid gray", padding: "20px"}}>
    <p>{comment.comment}</p>
    <button onClick={() => {setShowComment(true)}} className="reply">Reply</button>
    <button onClick={() => {performAction('like',comment.id,'comment',isLiked,props.setRender);}}>
    <FontAwesomeIcon icon={faThumbsUp} color={isLiked ? "red" : "black"}/><span className="action">{like}</span></button>
    <button onClick={() => {performAction('dislike',comment.id,'comment',isDisLiked,props.setRender);}}>
    <FontAwesomeIcon icon={faThumbsDown} color={isDisLiked ? "red" : "black"}/><span className="action">{dislike}</span></button>
    {comment.CommentReplies.length !== 0 && <button onClick={()=>{setDoShowComment(prevValue => (!prevValue))}} style={{color: "blue",fontWeight:"bold",margin:"15px 0px",display:"block"}}>Show Replies</button>}
      {doShowComment && comment.CommentReplies.map((comment) => {return <Reply reply={comment} setRender = {props.setRender} userId={props.userId}  />})}
      {showComment && <MakeReply type='reply' CommentId={comment.id} PostId={props.PostId} setRender = {props.setRender} setComment={setComment}/>}
    {comment.UserId === props.userId && <button onClick={() => {deleteComment(comment.id,props.userId,props.setRender)}} className="delete sAndD">Delete</button>}
  </div>
}
function Reply(props){
  // console.log(props);
  const reply = props.reply;
  let {like,dislike,isLiked,isDisLiked} = actionCount(reply.Reply.ReplyActions,props.userId);
  
  return <div style={{ border:"1px solid gray", padding: "20px"}}>
    <p>{reply.Reply.comment}</p>
    <p>Likes: {like},Dislikes: {dislike}</p>
    <button onClick={() => {performAction('like',reply.ReplyId,'reply',isLiked,props.setRender);}}>
    <FontAwesomeIcon icon={faThumbsUp} color={isLiked ? "red" : "black"}/>{like}</button>
    <button onClick={() => {performAction('dislike',reply.ReplyId,'reply',isDisLiked,props.setRender);}}>
    <FontAwesomeIcon icon={faThumbsDown} color={isDisLiked ? "red" : "black"}/>{dislike}</button>
      {reply.UserId === props.userId && <button onClick={() => {deleteReply(reply.ReplyId,props.userId,props.setRender)}} className="delete sAndD">Delete</button>}
  </div>
}
function performAction(action,stuffId,stuffType,toDelete,setRender){
  let val = {action: action,stuffId: stuffId,stuffType: stuffType,toDelete:toDelete};
  console.log(val);
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: "include",
    body: JSON.stringify(val)
  };
  fetch("http://localhost:8080/action", req).then(response => response.json() ).then(res => {
    console.log(res);
    // setPosts(res.result);
    // props.setRender();
    setRender();
  })
}
function MakeReply(props){
  console.log(props);
  const { register, handleSubmit, formState: { errors } } = useForm();
  function formValidate(data,event){
    let val = {...data, postId: props.PostId,type: props.type,commentId: props.CommentId};
    event.target.reset();
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(val)
    };
    fetch("http://localhost:8080/makeReply", req).then(response => response.json() ).then(res => {
      console.log(res);
      props.setRender();
      console.log(props);
      props.setComment();
      // setPosts(res.result);
    })
    }
    return <Fragment>
       <form onSubmit={handleSubmit(formValidate)}>
    <label>Comment Here</label>
    <input type="text" name="comment" {...register("comment",{ required: true})}/>
    {errors.comment && <p>Invalid UId</p>}
      <input type="submit" value="Reply"/>
    </form></Fragment>   
}
// function actionCount(type,param,userId){
//   if(param !== null && type === "reply"){
//     param = param.ReplyActions;
//   }
//   if(param !== null && type === "post"){
//     param = param.PostActions;
//   }
//   if(param !== null && type === "comment"){
//     param = param.CommentActions;
//   }
//   let isLiked,isDisLiked;
//   let like = 0,dislike=0;
//   if(param && param.length > 0){
//   param.map((action) => {
//     if(action['UserId'] == userId){
//       isLiked = action['action'] == "like" ? true : false;
//       isDisLiked = action['action'] == "dislike" ? true : false;
//     }
//     if(action['action'] == "like"){
//       like++;
//     }
//     else{
//       dislike++;
//     }
//   })
// }
//   return {like: like,dislike: dislike,isLiked:isLiked,isDisLiked:isDisLiked};
// }
function actionCount(param,userId){
  let isLiked,isDisLiked;
  let like = 0,dislike=0;
  if(param && param.length > 0){
  param.map((action) => {
    if(action['UserId'] == userId){
      isLiked = action['action'] == "like" ? true : false;
      isDisLiked = action['action'] == "dislike" ? true : false;
    }
    if(action['action'] == "like"){
      like++;
    }
    else{
      dislike++;
    }
  })
}
  return {like: like,dislike: dislike,isLiked:isLiked,isDisLiked:isDisLiked};
}
function Post(props){
  console.log(props);
  const post = props.post;
  console.log(actionCount(post.PostActions,props.userId));
  const [showComment,setShowComment] = useState(false);
  const [doShowComment,setDoShowComment] = useState(false);
  let {like,dislike,isLiked,isDisLiked} = actionCount(post.PostActions,props.userId);
  function setComment(){
    setShowComment(prevValue => (!prevValue));
  }
  return <div style={{ borderBottom:"1px solid gray", padding: "20px"}}>
    <p>Post Id-{post.id}</p>
    <p>Post{post.post}</p>
    <p>UserId - {post.UserId}-{props.isFollowing}</p>
    
    {props.isFollowing && <span className="isFollowing">Following</span>}
    {props.isFollowing && <button onClick={() => {follow(post.UserId,props.userId,props.setRender)}} className="delete">UnFollow</button>}
    {!(props.isFollowing) && <button onClick={() => {follow(post.UserId,props.userId,props.setRender)}} className="delete">Follow</button>}
    {/* {post.UserId !== props.userId && <button onClick={() => {follow(post.UserId,props.userId,props.setRender)}} className="delete">Follow</button>} */}
    <button onClick={() => {setShowComment(true)}} className="reply">Comment</button>
    <button onClick={() => {performAction('like',post.id,'post',isLiked,props.setRender);}}>
    <FontAwesomeIcon icon={faThumbsUp} color={isLiked ? "red" : "black"}/><span className="action">{like}</span></button>
    <button onClick={() => {performAction('dislike',post.id,'post',isDisLiked,props.setRender);}}>
    <FontAwesomeIcon icon={faThumbsDown} color={isDisLiked ? "red" : "black"}/><span className="action">{dislike}</span></button>
      {showComment && <MakeReply type='comment' PostId={post.id} CommentId={null} setRender = {props.setRender} setComment={setComment}/>}
    {post.Comments.length !== 0 && <button onClick={()=>{setDoShowComment(prevValue => (!prevValue))}} style={{color: "blue",fontWeight:"bold",margin:"15px 0px",display:"block"}}>Show Comments</button>}
    {/* <p>{post.Comments}</p> */}
    {doShowComment && post.Comments.map((comment) => {return <Comment comment={comment} setRender = {props.setRender} PostId={post.id} userId={props.userId} />})}
    <div className="sAndD">
    <button onClick={() => {savePost(post.id,post.UserId,props.setRender)}} className="save">Save</button>
    {post.UserId === props.userId && <button onClick={() => {deletePost(post.id,post.UserId,props.setRender)}} className="delete">Delete</button>}</div>
  </div>
}
function follow(userId,followerId,setRender){ 
  let val = {userId: userId,followerId:followerId};
  console.log(val);
  const req = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: "include",
  body: JSON.stringify(val)
};
fetch("http://localhost:8080/follow", req).then(response => response.json() ).then(res => {
  console.log(res);
  setRender();
})  
}
function deletePost(postId,userId,setRender){ 
  let val = {postId: postId,userId: userId};
  console.log(val);
  const req = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: "include",
  body: JSON.stringify(val)
};
fetch("http://localhost:8080/deletePost", req).then(response => response.json() ).then(res => {
  console.log(res);
  setRender();
})  
}
function savePost(postId,userId,setRender){ 
  let val = {postId: postId};
  console.log(val);
  const req = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: "include",
  body: JSON.stringify(val)
};
fetch("http://localhost:8080/savePost", req).then(response => response.json() ).then(res => {
  console.log(res);
  setRender();
})  
}
function deleteComment(commentId,userId,setRender){ 
  let val = {commentId: commentId,userId: userId};
  console.log(val);
  const req = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: "include",
  body: JSON.stringify(val)
};
fetch("http://localhost:8080/deleteComment", req).then(response => response.json() ).then(res => {
  console.log(res);
  setRender();
})  
}
function deleteReply(replyId,userId,setRender){ 
  let val = {replyId: replyId,userId: userId};
  const req = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: "include",
  body: JSON.stringify(val)
};
fetch("http://localhost:8080/deleteReply", req).then(response => response.json() ).then(res => {
  console.log(res);
  setRender();
})  
}
export default App;
