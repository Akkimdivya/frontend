import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [filter, setFilter] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const fetchImages = async (filter) => {
    const codes = generateCodesFromFilter(filter);
    const fetchedImages = codes.map((code) => ({
      code,
      url: `https://http.dog/${code}.jpg`
    }));
    setImages(fetchedImages);
  };

  const generateCodesFromFilter = (filter) => {
    const codes = [];
    if (/^\dxx$/.test(filter)) {
      const prefix = filter[0];
      for (let i = 0; i <= 9; i++) {
        for (let j = 0; j <= 9; j++) {
          codes.push(`${prefix}${i}${j}`);
        }
      }
    } else if (/^\d\d\dx$/.test(filter)) {
      const prefix = filter.slice(0, 3);
      for (let i = 0; i <= 9; i++) {
        codes.push(`${prefix}${i}`);
      }
    } else if (/^\d{3}$/.test(filter)) {
      codes.push(filter);
    }
    return codes;
  };

  const handleSaveList = async () => {
    try {
      const token = localStorage.getItem('token');
      const imageLinks = images.map(img => img.url);
      const responseCodes = images.map(img => img.code);
      await axios.post('https://moengage-b3ot.onrender.com/api/lists/save', 
        { name: filter, responseCodes, imageLinks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('List saved');
    } catch (error) {
      alert('Error saving list');
    }
  };

  const handleAllSaveList = () => {
    navigate('/lists');
  }

  return (
    <div className="container">
      <h2>Search Response Codes</h2>
      <input
        type="text"
        placeholder="Filter (e.g., 2xx, 200)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onBlur={() => fetchImages(filter)}
        className="input-field"
      />
      <button onClick={handleSaveList} className="button">Save List</button>
      <button onClick={handleAllSaveList} className="button">All Saved List</button>
      <div className="image-gallery">
        {images.map((img, index) => (
          <img key={index} src={img.url} alt={`Response code ${img.code}`} className="gallery-image" />
        ))}
      </div>
    </div>
  );
}

export default Search;
