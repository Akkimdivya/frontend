import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Lists() {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching lists with token:', token);
        const result = await axios.get('https://moengage-b3ot.onrender.com/api/lists', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched lists:', result.data);
        setLists(result.data);
      } catch (error) {
        console.error('Error fetching lists:', error);
        alert('Error fetching lists');
      }
    };
    fetchLists();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this list?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://moengage-b3ot.onrender.com/api/lists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLists(lists.filter((list) => list._id !== id));
    } catch (error) {
      console.error('Error deleting list:', error);
      alert('Error deleting list');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-list/${id}`);
  };

  return (
    <div className="container">
      <h2>Saved Lists</h2>
      <ul className="list-group">
        {lists.map((list) => (
          <li key={list._id} className="list-item">
            <img src={`https://http.dog/${list.name}.jpg`} alt={list.name} className="list-image" />
            <span className="list-name">{list.name}</span>
            <button onClick={() => handleEdit(list._id)} className="button edit-button">Edit</button>
            <button onClick={() => handleDelete(list._id)} className="button delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lists;
