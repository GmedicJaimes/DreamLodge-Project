import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/actions';

const Post = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    types: '',
    location: '',
    rooms: 0,
    services: '',
    description: '',
    price: 0,
    imageFile: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      imageFile: file,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formDataWithImage = new FormData();
    for (const key in formData) {
      if (key === 'imageFile') {
        formDataWithImage.append(key, formData[key]);
      } else {
        formDataWithImage.append(key, JSON.stringify(formData[key]));
      }
    }

    try {
      await dispatch(createPost(formDataWithImage));
      alert('Property created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create property. Please try again.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>User ID:</label>
        <input type="text" name="user_id" value={formData.user_id} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Property Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Property Types:</label>
        <input type="text" name="types" value={formData.types} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Rooms:</label>
        <input type="number" name="rooms" value={formData.rooms} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Services:</label>
        <input type="text" name="services" value={formData.services} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="imageFile" onChange={handleFileChange} required />
      </div>
      <button type="submit">Create Property</button>
    </form>
  );
};

export default Post;