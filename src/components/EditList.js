import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditList() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [responseCodes, setResponseCodes] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetching list with token:", token);
        const result = await axios.get(
          `https://moengage-b3ot.onrender.com/api/lists/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Fetched list:", result.data);
        setName(result.data.name);
        setResponseCodes(result.data.responseCodes);
        setImages(result.data.imageLinks);
      } catch (error) {
        console.error(
          "Error fetching list:",
          error.response?.data || error.message
        );
        alert("Error fetching list");
      }
    };
    fetchList();
  }, [id]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Updating list with data:", {
        name,
        responseCodes,
        imageLinks: images,
      });
      await axios.put(
        `https://moengage-b3ot.onrender.com/api/lists/${id}`,
        { name, responseCodes, imageLinks: images },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("List updated");
      navigate("/lists");
    } catch (error) {
      console.error(
        "Error updating list:",
        error.response?.data || error.message
      );
      alert("Error updating list");
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    // Update the image links based on the new name
    setImages([`https://http.dog/${newName}.jpg`]);
  };

  return (
    <div className="container">
      <h2>Edit List</h2>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="List Name"
        className="input-field"
      />
      <div className="image-gallery">
        {images.map((image, index) => (
          <img key={index} src={image} alt={name} className="gallery-image" />
        ))}
      </div>
      <button onClick={handleSave} className="button save-button">
        Save
      </button>
    </div>
  );
}

export default EditList;
