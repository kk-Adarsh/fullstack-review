import React, { useState, useEffect } from "react";
import classes from "./ReviewTable.module.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const socket = io("http://localhost:8000", {
    reconnection: true,
  });

  useEffect(() => {
    socket.on("deleted", (id) =>
      setReviews((prev) => prev.filter((item) => item._id !== id))
    );
    socket.on("created", (newData) => setReviews(newData));
    socket.on("edited", (newData) => {
        console.log(newData);
      setReviews((prev) =>
        prev.map((item) => {
          return item._id === newData._id ? newData : item;
        })
      );
    });
  }, [socket]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8000/");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/${id}`);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className={classes.table_container}>
      <h2>Review List</h2>
      <Link to="/new" className={classes.create_button}>
        Create New Review
      </Link>
      <table className={classes.review_table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={review._id}>
              <td>{index + 1}</td>
              <td>{review.title}</td>
              <td>{review.content}</td>
              <td>{new Date(review.createdAt).toLocaleString()}</td>
              <td>{new Date(review.updatedAt).toLocaleString()}</td>
              <td>
                <button
                  type="button"
                  className={classes.red_btn}
                  onClick={() => handleDelete(review._id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/${review._id}`)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
