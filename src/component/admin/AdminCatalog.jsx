import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const AdminCatalog = () => {
    const [catalog, setCatalog] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        getCatalog();
    }, []);

    // Fetch product data
    const getCatalog = async () => {
        try {
            const response = await axios.get("http://localhost:5000/catalog");
            setCatalog(response.data);
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
    const saveCatalog = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("file", file);
        try {
            await axios.post("http://localhost:5000/catalog", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            getCatalog();
            resetForm();
        } catch (error) {
            console.log(error);
        }
    };

    // Delete product
    const deleteCatalog = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/catalog/${id}`);
            getCatalog();
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
    };
    return (
        <>
        <div className="Admin-catalog-page">
            <form onSubmit={saveCatalog} className="Admins-catalog-form">
                <div>
                    <label>Product Catalog</label>
                    <input type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter Catalog Title"
                    required
                    />
                </div>

                <div className="Admin-catalog-desc">
                    <label>Description</label>
                    <textarea name="" id=""
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Enter Catalog Description"
                    required
                    ></textarea>
                </div>

                <div className="Admin-catalog-img">
                    <label htmlFor="">Image</label>
                    <p>*Ukuran Foto 1400*960 Pixel</p>
                    <input type="file" onChange={loadImage} />
                </div>

                {preview && (
                    <div>
                        <img src={preview} alt="Preview" width="100" />
                    </div>
                )}

                <button type="submit">Add Catalog</button>
            </form>

            <div className="Admin-catalog-preview">
                <h3>Catalog List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Desc</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {catalog.map((product, index) => (
                            <tr key={product.id} >
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.desc}</td>
                                <td>
                                    <img src={product.url} alt={product.name} width="50" />
                                </td>
                                <td>
                                    <button onClick={() => deleteCatalog(product.id)}>
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

export default AdminCatalog;
