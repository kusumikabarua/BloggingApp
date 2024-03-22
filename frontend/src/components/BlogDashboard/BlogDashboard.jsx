import React, { useEffect, useState } from "react";
import {

  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip

} from "mdb-react-ui-kit";
import styles from "./BlogDashboard.module.css";
import { API_BASE_URL } from "../../config";
import BlogModal from "./BlogModal";


export default function Register() {
  const [blogs, setBlogs] = useState([]);



  const isLoggedIn = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  

  const deleteBlog = async (blogId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete blog.");
      fetchBlogs(); // Refresh the blogs list to reflect changes
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

 

  

  const renderBlogsTable = (blogsArray) => (
    <MDBTable className="text-black mb-0">
      <MDBTableHead>
        <tr>
          <th scope="col">Blogs</th>        
          <th scope="col">Actions</th>      
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {blogsArray.map((blog) => (
          <tr className="fw-normal" key={blog._id}>
            <td className="align-middle">
              {/* <span style={{ fontWeight: "bold" }}>{blog.title}</span> */}
              <BlogModal  blog={blog} fetchBlogs={fetchBlogs}/>

              <br />
            
            </td>
            <td className="align-middle">
            {blog.isUpdateDelete &&(
              <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Remove">
                <MDBIcon
                  fas
                  icon="trash-alt"
                  color="warning"
                  size="lg"
                  className="me-3"
                  onClick={() => deleteBlog(blog._id)}
                />
              </MDBTooltip> )}
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );

  return (
    <section className={styles.gradient}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol md="12" xl="10">
            <MDBCard>
              {isLoggedIn && (
                <MDBBtn
                  style={{ position: "absolute", right: "10px", top: "10px" }}
                  color="danger"
                  onClick={() => {
                    localStorage.removeItem("token"); // Clear token from localStorage
                    window.location.reload(); // Reload the page
                  }}
                >
                  Logout
                </MDBBtn>
              )}
              <MDBCardBody className="p-4 text-black">
                <div className="text-center pt-3 pb-2">
                <img src={require('./blog.png')}  width="60"/>
                 
                  <h2 className="my-4">Blog List</h2>

                  {isLoggedIn && (
                   
                    <BlogModal fetchBlogs={fetchBlogs} />
                  )}
                </div>
              
                {!isLoggedIn && (
                  <div>
                    <h2>Welcome to the Blogging App</h2>
                    <p>Create a unique and beautiful blog</p>
                    <div>
                      <a href="/login" className="btn btn-primary mx-2">
                        Login
                      </a>
                      <a href="/register" className="btn btn-secondary mx-2">
                        Sign Up
                      </a>
                    </div>
                  </div>
                )}

               

                {isLoggedIn && (
                  <div>
                    <h3 className="mt-4">Blogs</h3>
                    {renderBlogsTable(blogs)}
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
