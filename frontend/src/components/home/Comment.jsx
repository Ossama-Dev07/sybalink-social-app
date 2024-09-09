import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import axios from "axios";
import unknown from "/assets/unknown.png";
import "../../style/Comment.css";
export default function Comment({ postId, post_userid }) {
  const [commentsData, setCommentsData] = useState({
    postImage: "",
    comments: [],
  });
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3005/comments/${postId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setCommentsData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setIsLoading(false);
      });
  }, [postId]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    axios
      .post(
        `http://localhost:3005/addComment`,
        {
          postId,
          content: newComment,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setCommentsData((prevData) => ({
          ...prevData,
          comments: [...prevData.comments, response.data],
        }));
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
    axios.post(
      `http://localhost:3005/sendnotificationcomment`,
      {
        postId,
        content: newComment,
        post_userid,
      },
      { withCredentials: true }
    );
    console.log(post_userid);
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Comments</DialogTitle>
        <DialogDescription>Make your your owen comment.</DialogDescription>

      </DialogHeader>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <div className="comment-container">
          {commentsData.comments.map((comment) => (
            <div key={comment.commentId} className="comment">
              {comment.profilePicture ? (
                <img
                  src={comment.profilePicture}
                  alt="Profile"
                  width="30px"
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <img
                  src={unknown}
                  alt="Profile"
                  width="30px"
                  style={{ borderRadius: "50%" }}
                />
              )}
              <p>
                <strong>{comment.nickname}:</strong> {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="flex">
        <Input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button
          onClick={() => handleAddComment(commentsData.userId)}
          className="btn-add-comment"
        >
          Post
        </Button>
      </div>
    </div>
  );
}
