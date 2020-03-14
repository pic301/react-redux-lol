import React, { useState, useEffect } from "react";
import { Row, Form, Button } from "react-bootstrap";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

const Comment = ({ championId, commentLists, refresh }) => {

  const [commentValue, setCommentValue] = useState(" ");
  const [loginUser,setLoginUser] = useState('')



  useEffect(()=>{
    const user = localStorage.getItem('userId')
    setLoginUser(user)

  },[])
  console.log("로그인 유저다다다다다다",loginUser)

  const handleChange = e => {
    setCommentValue(e.target.value);
  };
  const onsubmit = e => {
    e.preventDefault();

    const variables = {
      content: commentValue,
      writer: loginUser,
      championId: championId
    };

    Axios.post("/api/comment/saveComment", variables).then(res => {
      if (res.data.success) {
        console.log(res)
       
        // refresh(res.data.result);
      }else{
        alert('코멘트를 저장하는데 실패했습니다')
      }
    });
  };
  return (
    <div>
      {/* Comment Lists */}

       {commentLists &&
        commentLists.map(
          (comment, i) =>
            !comment.responseTo && (
              <>
                <SingleComment
                  // refresh={refresh}
                  comment={comment}
                  championId={championId}
                />
                {/* <ReplyComment refresh={refresh} parentCommentId={comment._id} championId={championId}   commentLists={commentLists}/> */}
              </>
            )
        )
        } 
         
      <Form style={{ display: "flex" }}>
        <Form.Group
          style={{ width: "100%" }}
          as={Row}
          controlId="formPlaintextPassword"
        >
          <Form.Control
            onChange={handleChange}
            value={commentValue}
            as="textarea"
            rows="3"
          />
        </Form.Group>
        <Button onClick={onsubmit} style={{ width: "20%", height: "52px" }}>
          제출하기
        </Button>
      </Form>
    </div>
  );
};
export default Comment;