// import React, { useEffect , useState} from "react";
// import SingleComment from "./SingleComment";
                                                                                
// const ReplyComment = ({commentLists, refresh, parentCommentId, championId}) => {

//     const[ ChildCommentNumber, setChildCommentNumber] = useState('')
//     const [OpenReplyComments, setOpenReplyComments] = useState(false)
//     useEffect(() => {
//         let commentNumber = 0;
//         commentLists.map(comment =>{
//             if(comment.responseTo === parentCommentId){
//                 commentNumber ++
//             }
//         })
//         setChildCommentNumber(commentNumber)
//         },[commentLists])
//   //responseTo 있는것들
//   const handleChange = () => {
//     setOpenReplyComments(!OpenReplyComments)
// }
//   const renderReplyComment = ({ parentCommentId }) =>
//     commentLists.map((comment, i) => (
//       <>
//         {comment.responseTo === parentCommentId && (
//           <div>
//             <SingleComment
//               refresh={refresh}
//               comment={comment}
//               championId={championId}
//             />
//             <ReplyComment
//               refresh={refresh}
//               commentLists={commentLists}
//               championId={championId}
//               parentCommentId={comment._id}
//             />
//           </div>
//         )}
//       </>
//     ));
//   return (
//     <div>
//       {ChildCommentNumber > 0 &&
//         <p style={{ color:"red"}} onClick={handleChange}> 댓글{ChildCommentNumber}</p>
//     }
//   {OpenReplyComments &&
//       renderReplyComment(parentCommentId)
//   }
//     </div>
//   );
// };

// export default ReplyComment;
import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';

function ReplyComment({refresh,championId,commentLists,parentCommentId,loginUser}) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {

        let commentNumber = 0;
        commentLists.map((comment) => {

            if (comment.responseTo === parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [commentLists, parentCommentId])

    let renderReplyComment = (parentCommentId) =>
       
        commentLists.map((comment, index) => (
            <React.Fragment>
                {
                    <div style={{ width: '80%', marginLeft: '40px' }}>
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
                    </div>
                }
            </React.Fragment>
        ))

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }


    return (
        <div>

            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }}
                    onClick={handleChange} >
                    View {ChildCommentNumber} more comment(s)
             </p>
            }

            {OpenReplyComments &&
                renderReplyComment(parentCommentId)
            }

        </div>
    )
}

export default ReplyComment