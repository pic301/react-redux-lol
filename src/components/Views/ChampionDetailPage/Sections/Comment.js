import React ,{useState}from "react";
import { Row, Form, Button } from "react-bootstrap";
import Axios from "axios";
import { useSelector } from 'react-redux'

import SingleComment from './SingleComment'

const Comment = ({championId}) => {
  const user = useSelector(state => state.user)
  const [comment, setComment] = useState(' ')


  const handleChange = (e) => {
    setComment(e.target.value)
  };
  const onsubmit = (e) => {
      e.preventDefault()

      const variables ={
          content:comment,
          writer: user.userData._id,
          postId:championId,
      }

      Axios.post('api/comment/saveComment',variables).then(
          res => console.log(res)
      )
  };
  return (
    <div>

      {/* Comment Lists */}
      <SingleComment />
      <Form style={{ display: "flex" }}>
        <Form.Group
          style={{ width: "100%" }}
          as={Row}
          controlId="formPlaintextPassword"
        >
          <Form.Control onChange={handleChange} value={comment} as="textarea" rows="3" />
        </Form.Group>
        <Button
          onClick={onsubmit}
          style={{ width: "20%", height: "52px" }}
        >제출하기</Button>
      </Form>
    </div>
  );
};
export default Comment;
