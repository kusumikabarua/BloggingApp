import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTextArea,
} from "mdb-react-ui-kit";

import { API_BASE_URL } from "../../config";

export default function Comments({ blogId }) {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formComment, setFormComment] = useState({
    title: "",
    description: "",
  });

  const isLoggedIn = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/comments/${blogId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/comments/${blogId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formComment }),
      });
      if (!response.ok) throw new Error("Failed to create comment.");
      setShowForm(false); // Hide form after comment creation
      setFormComment({
        title: "",
        description: "",
      });
      fetchComments(); // Refresh the comments list to reflect the new comments
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  const renderCommentsTable = (commentsArray) => (
    <MDBTable className="text-black mb-0">
      <MDBTableHead>
        <tr>
          <th scope="col">Comment</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {commentsArray.map((comment) => (
          <tr className="fw-normal" key={comment._id}>
            <td className="align-middle">
              <span style={{ fontWeight: "bold" }}>{comment.title}</span>
              <br />
              <span style={{ fontSize: "small", color: "gray" }}>
                {comment.description}
              </span>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );

  return (
    <MDBContainer className="py-5 h-100">
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol md="12" xl="10">
          <MDBCard>
            <MDBCardBody className="p-4 text-black">
              <div className="text-center pt-3 pb-2">
                <h2 className="my-4">Comment List</h2>

                {isLoggedIn && (
                  <MDBBtn onClick={() => setShowForm(!showForm)}>
                    Create Comment
                  </MDBBtn>
                )}
              </div>
              {showForm && (
                <form onSubmit={handleCreateComment}>
                  <MDBInput
                    className="my-4 mx-4"
                    label="Title"
                    type="text"
                    name="title"
                    value={formComment.title}
                    onChange={handleFormChange}
                    required
                  />
                  <MDBTextArea
                    label="Content"
                    className="my-4 mx-4"
                    name="description"
                    value={formComment.description}
                    onChange={handleFormChange}
                    rows={4}
                    required
                  />

                  <MDBBtn type="submit" className="my-4 mx-4">
                    Save Comment
                  </MDBBtn>
                  <MDBBtn
                    color="danger"
                    className="my-4 mx-4"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </MDBBtn>
                </form>
              )}

              {isLoggedIn && <div>{renderCommentsTable(comments)}</div>}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
