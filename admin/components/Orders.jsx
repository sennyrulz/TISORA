import React, { useState } from "react";
import axios from "axios";

function OrderForm() {
  const [formData, setFormData] = useState({
    orderName: "",
    desc: "",
    material: "",
    sizes: "",
    price: "",
    features: "",
    images: [],
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      images: [...e.target.files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("orderName", formData.orderName);
    data.append("desc", formData.desc);
    data.append("material", formData.material);
    data.append("sizes", formData.sizes);
    data.append("price", formData.price);
    data.append("features", JSON.stringify(formData.features.split(',')));

    formData.images.forEach((file, i) => {
      data.append("images", file); // backend should use multer to handle this
    });

    try {
      const res = await axios.post("/api/admin-orders", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Order submitted!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error submitting order");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="orderName" onChange={handleChange} placeholder="Order Name" />
      <input name="desc" onChange={handleChange} placeholder="Description" />
      <input name="material" onChange={handleChange} placeholder="Material" />
      <input name="sizes" onChange={handleChange} placeholder="Size (e.g. M)" />
      <input name="price" onChange={handleChange} placeholder="Price" type="number" />
      <input name="features" onChange={handleChange} placeholder="Comma-separated features" />

      <input type="file" onChange={handleFileChange} multiple accept="image/*" />

      <button type="submit">Submit Order</button>
    </form>
  );
}

export default OrderForm;
