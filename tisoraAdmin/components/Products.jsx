import React, { useState, useEffect } from "react";
import axios from "axios";
import Products from "./ProductsData";

const Products = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
  const [values, setValues] = useState({
    productName: "",
    desc: "",
    features: "",
    material: "",
    sizes: "",
    price: "",
  });
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin?.token;


  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
    };
    useEffect(() => {
      fetchProducts();
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const resetForm = () => {
    setValues({
      productName: "",
      desc: "",
      features: "",
      material: "",
      sizes: "",
      price: "",
    });
    setImages([]);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((file) => formData.append("images", file));
    formData.append("features", values.features.split(",").map(f => formData.append("features", f.trim())));
    Object.entries(values).forEach(([key, val]) => formData.append(key, val));

    try {
      if (editingId) {
        // PUT for update
        await axios.put(`${BASE_URL}/api/admin/products/${editingId}`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        if (images.length !== 2) {
          alert("Upload exactly 2 images.");
          return;
        }

        await axios.post(`${BASE_URL}/api/admin/products/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error submitting product", error);
    }
  };

  const handleEdit = (product) => {
    setValues({
      productName: product.productName,
      desc: product.desc,
      features: product.features,
      material: product.material,
      sizes: product.sizes,
      price: product.price,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div>
      <h2>{editingId ? "Edit Product" : "Create Product"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="productName" value={values.productName} onChange={handleChange} placeholder="Name" required />
        <textarea name="desc" value={values.desc} onChange={handleChange} placeholder="Description" required />
        <input name="features" value={values.features} onChange={handleChange} placeholder="Features" required />
        <input name="material" value={values.material} onChange={handleChange} placeholder="Material" required />
        <input name="sizes" value={values.sizes} onChange={handleChange} placeholder="Sizes" required />
        <input type="number" name="price" value={values.price} onChange={handleChange} placeholder="Price" required />

        {!editingId && (
          <input type="file" multiple accept="image/*" onChange={handleImageChange} required />
        )}

        <button type="submit">{editingId ? "Update" : "Upload"} Product</button>
        {editingId && <button onClick={resetForm}>Cancel</button>}
      </form>
      <hr />

      <h3>Uploaded Products</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {products.map((p) => (
          <div key={p._id} style={{ border: "1px solid #ccc", padding: "1rem", width: "300px" }}>
            <h4>{p.productName}</h4>
            <p>{p.desc}</p>
            <p><b>Price:</b> ${p.price}</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {p.pictures?.map((img, i) => (
                <img key={i} src={img.url} alt="" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
              ))}
            </div>
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
