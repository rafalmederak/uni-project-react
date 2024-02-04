import React, { useState, useEffect } from "react";
import "styles/comments.css";
import { Comment, CommentsProps} from "interfaces/Comment";

const initialCommentState: Comment = {
  postId: 0,
  id: 0,
  name: "",
  email: "",
  body: "",
};

const Comments = ({ comments, setComments, postId, visible, currentUser }: CommentsProps) => {

  const [newComment, setNewComment] = useState<Comment>(initialCommentState);

  const maxId = Math.max(...comments.map(comment => comment.id));

  useEffect(() => {
    setNewComment(prevNewComment => ({
      ...prevNewComment,
      id: maxId
    }));
  }, [maxId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddComment = () => {
    const newCommentWithPostId = { ...newComment, postId, id: maxId + 1, email: currentUser?.email || "" };
    if (newComment.name.trim() === "" || newComment.body.trim() === "") {
      alert("Title and body are required!");
      return;
    }
    setComments([newCommentWithPostId, ...comments]);
    setNewComment(initialCommentState);
  };

  const handleDeleteComment = (commentId: number) => {
    const updatedComments = comments.filter((comment: Comment) => comment.id !== commentId);
    setComments(updatedComments);
  };

  const filteredComments = comments.filter(comment => comment.postId === postId);

  return (
    <div className={`comments-section ${visible ? "visible" : ""}`}>
      {visible && (
        <div className="comments-container">
          <div className="add-comment">
          <input
              type="text"
              name="name"
              placeholder="Enter comment title"
              value={newComment.name}
              onChange={handleInputChange}
            />
            <textarea
              name="body"
              placeholder="Ente comment text"
              value={newComment.body}
              onChange={handleInputChange}
            ></textarea>
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
          {filteredComments.map((comment:Comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-user-info">
              <img
              src={`https://pic.onlinewebfonts.com/thumbnails/icons_504591.svg`}
              alt={`User /*${currentUser?.name}*'s profile`}/> 
              <p>{comment.email}</p>
                 </div>
                 <h3>{comment.name}</h3>
              <p className="comment-body">{comment.body}</p>
              <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;