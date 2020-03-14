import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { useSelector } from 'react-redux'
import Axios from 'axios'

const SingleComment = ({championId,comment,refresh}) => {
  const [openReply, setOpenReply] = useState(false);
  const user = useSelector(state => state.user)
  const [commentValue, setCommentValue] = useState();

  const handleChange = e => {
    setCommentValue(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();

  //   const variables ={
  //     content:commentValue,
  //     writer: user.userId,
  //     championId:championId,
  //     responseTo: comment._id
      
  // }

  //   Axios.post("api/comment/saveComment", variables).then(res =>{
  //     if(res.data.success){
  //       setCommentValue("")
  //       refresh((res.data.result))
  //     }else{
  //       alert("코멘트 저장 실패")
  //     }
  //   });

  };
  console.log("comment",comment)
  return (
    <div style={{ color: "black" }}>

      <div style={{ border:"3px solid red"}}>
        {comment.writer.name} 
        {comment.content} 
       <Button onClick={() => setOpenReply(!openReply)}>답글달기</Button>
      </div>
      {openReply && (
        <Form style={{ display: "flex"  }} onSubmit={onSubmit}>
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
          <Button onClick={onSubmit} style={{ width: "20%", height: "52px" }}>
            제출하기
          </Button>
        </Form>
      )}
    </div>
  );
};

export default SingleComment;


