import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBTextArea,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { API_BASE_URL } from "../../config";
import Comments from "../Comments/Comments";

export default function BlogModal({ blog, fetchBlogs }) {
  useEffect(() => {
    if (blog) {
      setFormBlog({
        title: blog.title,
        description: blog.description,
      });
      if (!blog.isUpdateDelete) {
        setIsUpdateDelete(false);
      }
    }
  }, []);
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };
  
  const handleCreateBlog = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formBlog }),
      });
      if (!response.ok) throw new Error("Failed to create Blog.");
      setFormBlog({
        title: "",
        description: "",
      });
      
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };
  const handleBlog = async () => {
    if (blog) {
      await updateBlog();
    } else {
      await handleCreateBlog();
    }
    fetchBlogs(); // Refresh the blogs list to reflect changes
    toggleOpen();
  };
  const updateBlog = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${blog._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formBlog.title,
          description: formBlog.description,
        }),
      });
      if (!response.ok) throw new Error("Failed to update blog.");
     // fetchBlogs(); // Refresh the blogs list to reflect changes
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };
  const [basicModal, setBasicModal] = useState(false);
  const [isUpdateDelete, setIsUpdateDelete] = useState(true);
  const [formBlog, setFormBlog] = useState({
    title: "",
    description: "",
  });

  const toggleOpen = () => setBasicModal(!basicModal);

  return (
    <>
      {!blog ? (
        <MDBBtn onClick={toggleOpen}>Create Blog</MDBBtn>
      ) : (
        <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="View">
          <span onClick={toggleOpen} style={{ fontWeight: "bold" }}>
            {formBlog.title}
          </span>
        </MDBTooltip>
      )}

      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create/Update Blog</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {isUpdateDelete ? (
                <MDBInput
                  className="my-4 mx-4 "
                  label="Title"
                  type="text"
                  name="title"
                  value={formBlog.title}
                  onChange={handleFormChange}
                  required
                />
              ) : (
                <MDBInput
                  className="my-4 mx-4 "
                  label="Title"
                  type="text"
                  name="title"
                  value={formBlog.title}
                  onChange={handleFormChange}
                  readonly
                />
              )}
              {isUpdateDelete ? (
                <MDBTextArea
                  label="Content"
                  className="my-4 mx-4"
                  name="description"
                  value={formBlog.description}
                  onChange={handleFormChange}
                  rows={4}
                  required
                />
              ) : (
                <MDBTextArea
                  label="Content"
                  className="my-4 mx-4"
                  name="description"
                  value={formBlog.description}
                  onChange={handleFormChange}
                  rows={4}
                  readonly
                />
              )}
              {(blog) &&(<Comments blogId={blog._id}/>) }
             
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Close
              </MDBBtn>
              {isUpdateDelete && (
                <MDBBtn onClick={handleBlog}>Save Blog</MDBBtn>
              )}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
