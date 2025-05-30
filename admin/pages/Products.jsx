import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [values, setValues] = useState({
    productName: "",
    desc: "",
    features: "",
    materials: "",
    sizes: "",
    price: "",
  });
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/products", {
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
      materials: "",
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
    Object.entries(values).forEach(([key, val]) => formData.append(key, val));

    try {
      if (editingId) {
        // PUT for update
        await axios.put(`http://localhost:5000/admin/products/${editingId}`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        if (images.length !== 2) {
          alert("Upload exactly 2 images.");
          return;
        }

        await axios.post("http://localhost:5000/admin/products", formData, {
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
      materials: product.materials,
      sizes: product.sizes,
      price: product.price,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/admin/products/${id}`, {
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
        <input name="materials" value={values.materials} onChange={handleChange} placeholder="Materials" required />
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
                <img key={i} src={img} alt="" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
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
