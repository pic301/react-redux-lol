import React, { useState, useEffect } from "react";
import { Row, Form, Button } from "react-bootstrap";
import Axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

const Comment = ({ championId, commentLists, refresh }) => {

  const [commentContent, setCommentContent] = useState("");
  const [loginUser,setLoginUser] = useState('')

  useEffect(()=>{
    const user = localStorage.getItem('userId')
    setLoginUser(user)

  },[])

  const handleChange = e => {
    setCommentContent(e.target.value);
  };
  const onsubmit = e => {
    e.preventDefault();

    const variables = {
      content: commentContent,
      writer: loginUser,
      championId: championId
    };

    Axios.post("/api/comment/saveComment", variables).then(res => {
      if (res.data.success) {
        console.log(res)
       
        refresh(res.data.result);
      }else{
        alert('코멘트를 저장하는데 실패했습니다')
      }
    });
  };
  return (
    <div >
      {/* Comment Lists */}
    
       {commentLists &&
        commentLists.map(
          (comment, i) =>
              (
              <>
                <SingleComment
                  refresh={refresh}
                  comment={comment}
                  championId={championId}
                  loginUser={loginUser}
                 
                />
                <ReplyComment  
                  refresh={refresh}
                  comment={comment}
                  championId={championId}
                  loginUser={loginUser}
                  commentLists={commentLists}
                  parentCommentId={comment._id}
                  />
              </>
            )
        )
        } 
         
      <Form style={{ display: "flex",padding:"10px" }}>
        <Form.Group
          style={{ width: "100%" }}
          as={Row}
          controlId="formPlaintextPassword"
        >
          <Form.Control
            onChange={handleChange}
            value={commentContent}
            as="textarea"
            rows="3"
          />
        </Form.Group>
        <Button onClick={onsubmit} style={{ width: "20%", height: "52px" }}>
          댓글달기
        </Button>
      </Form>
    </div>
  );
};
export default Comment;