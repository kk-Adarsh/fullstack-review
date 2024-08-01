import React, { useCallback, useEffect, useState } from "react";
import classes from "./ReviewForm.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ReviewForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8000/${id}`, { title, content });
      } else {
        await axios.post("http://localhost:8000/", { title, content });
      }
      navigate("/");
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  const fetchReviewsById = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/${id}`);
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchReviewsById();
    }
  }, [fetchReviewsById, id]);

  const handleReset = async (e) => {
    setTitle("");
    setContent("");
  };

  const handleCancel = async (e) => {
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className={classes.create_review_container}>
      <h2>{id ? "Edit Review" : "Create New Review"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
          />
        </label>
        <div className={classes.actions}>
          <button type="submit" className={classes.green_btn}>
            {id ? "Edit" : "Save"}
          </button>
          <button
            type="button"
            className={classes.red_btn}
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
          <button
            type="button"
            className={classes.blue_btn}
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="button"
            className={classes.red_btn}
            onClick={handleCancel}
          >
            Cancel
          </button>
         
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
