import React, {useState} from "react";
import { Row, Form, Button,  } from "react-bootstrap";

const SingleComment = () => {
  const [openReply,setOpenReply] = useState(false);
  const [commentValue,setCommentValue] = useState()

  const onChangeComment = (e) => {
    setCommentValue(e.target.value)
  }

  return (
    <div style={{ color: "black" }}>
      <Button onClick={() => setOpenReply(!openReply)}>답글달기</Button>
     {openReply && 
       <Form style={{ display: "flex" }}>
       <Form.Group
         style={{ width: "100%" }}
         as={Row}
         controlId="formPlaintextPassword"
       >
         <Form.Control
           onChange={onChangeComment}
           value={commentValue}
           as="textarea"
           rows="3"
         />
       </Form.Group>
       <Button
         onClick
         style={{ width: "20%", height: "52px" }}
       >제출하기</Button>
     </Form>
    }
    </div>
  );
};

export default SingleComment;
