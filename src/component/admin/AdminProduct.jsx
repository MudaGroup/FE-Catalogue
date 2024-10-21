import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [category, setCategory] = useState("");
    const [newCategory, setNewCategory] = useState(""); // State untuk kategori baru
    const [price, setPrice] = useState("");
    const [existingCategories, setExistingCategories] = useState([]); // State untuk kategori yang sudah ada

    useEffect(() => {
        getProducts();
    }, []);

    // Fetch product data
    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/products");
            setProducts(response.data);

            // Mengambil kategori unik dari produk yang ada
            const categories = [...new Set(response.data.map(product => product.category))];
            setExistingCategories(categories);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle Image Preview
    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    // Save product
    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("category", category); // Tambahkan kategori
        formData.append("price", price); // Tambahkan harga
        formData.append("file", file);
        try {
            await axios.post("http://localhost:5000/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            getProducts();
            resetForm();
        } catch (error) {
            console.log(error);
        }
    };

    // Add new category
    const addCategory = () => {
        if (newCategory && !existingCategories.includes(newCategory)) {
            setExistingCategories([...existingCategories, newCategory]); // Tambahkan kategori baru ke state
            setNewCategory(""); // Reset input kategori baru
        }
    };

    // Delete category
    const deleteCategory = (cat) => {
        // Cek jika kategori tidak digunakan dalam produk
        const isUsed = products.some(product => product.category === cat);
        if (!isUsed) {
            setExistingCategories(existingCategories.filter(category => category !== cat));
        } else {
            alert("Category cannot be deleted because it is still in use.");
        }
    };

    // Delete product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    };

    // Reset form after submission
    const resetForm = () => {
        setTitle("");
        setDesc("");
        setFile(null);
        setPreview("");
        setCategory(""); // Reset kategori
        setPrice(""); // Reset harga
    };

    return (
        <>
        <div className="Admins-product-page">
            {/* Form to Add New Product */}
            <form onSubmit={saveProduct} className="Admins-product-form">
                <div>
                    <label>Product Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Product Title"
                        required
                    />
                </div>

                <div className="Admins-product-desc">
                    <label>Description</label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Enter Product Description"
                        required
                    ></textarea>
                </div>

                <div className="Admins-product-category">
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Product Category</option>
                        {existingCategories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="Admins-product-add-category">
                    <label>Add New Category</label>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Add New Category"
                    />
                    <button type="button" onClick={addCategory}>Add Category</button>
                </div>

                {/* Display Existing Categories */}
            <div className="Admins-product-existing-category">
                <h3>Existing Categories</h3>
                <ul>
                    {existingCategories.map((cat, index) => (
                        <li key={index}>
                            {cat} <button onClick={() => deleteCategory(cat)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            
                <div className="Admins-product-price">
                    <label>Price</label>
                    <p>*Khusus Price lebihkan 2 angka 0 dibelakang</p>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter Product Price"
                        required
                    />
                </div>

                <div className="Admins-product-img">
                    <label>Image</label>
                    <p>*Ukuran Foto 280*200 Pixel</p>
                    <input type="file" onChange={loadImage} />
                </div>

                {preview && (
                    <div>
                        <img src={preview} alt="Preview" width="100" />
                    </div>
                )}

                <button type="submit">Add Product</button>
            </form>

            

            {/* Display Product List */}
            <div className="Admins-product-table">
                <h3>Product List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.desc}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>
                                    <img src={product.url} alt={product.name} width="50" />
                                </td>
                                <td>
                                    <button onClick={() => deleteProduct(product.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default AdminProduct;
