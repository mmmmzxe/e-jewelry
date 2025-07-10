import { Edit2, InfoIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import StandardTable from '../../components/common/StandardTable';

export default function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [form, setForm] = useState({ name: '', price: '', category: '' });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [catError, setCatError] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);

  const fetchProducts = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchCategories = () => {
    setCatLoading(true);
    fetch('http://localhost:5000/api/categories')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch categories');
        return res.json();
      })
      .then(data => {
        setCategories(data);
        setCatLoading(false);
      })
      .catch(err => {
        setCatError(err.message);
        setCatLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setForm({ name: '', price: '', category: '' });
    setSelectedFiles([]);
    setMainImage(null);
    setModalType('add');
    setShowModal(true);
    setEditId(null);
    fetchCategories();
  };

  const openEditModal = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category?.title || ''
    });
    setSelectedFiles([]);
    setMainImage(null);
    setModalType('edit');
    setShowModal(true);
    setEditId(product._id);
    fetchCategories();
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete product');
        fetchProducts();
      })
      .catch(err => alert(err.message));
  };

  // Image compression utility
  const compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const compressMultipleImages = async (files) => {
    setCompressing(true);
    setCompressionProgress(0);
    
    const compressedFiles = [];
    const totalFiles = files.length;
    
    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      const compressedFile = await compressImage(file);
      compressedFiles.push(compressedFile);
      
      // Update progress
      setCompressionProgress(((i + 1) / totalFiles) * 100);
    }
    
    setCompressing(false);
    setCompressionProgress(0);
    return compressedFiles;
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      // Compress images before adding
      const compressedFiles = await compressMultipleImages(files);
      setSelectedFiles(prev => [...prev, ...compressedFiles]);
    }
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const compressedFile = await compressImage(file);
      setMainImage(compressedFile);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('category', JSON.stringify({ title: form.category }));
    
    // Append main image if selected
    if (mainImage) {
      formData.append('image', mainImage);
    }
    
    // Append additional images
    selectedFiles.forEach((file, index) => {
      formData.append('images', file);
    });

    if (modalType === 'add') {
      fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to add product');
          setShowModal(false);
          fetchProducts();
        })
        .catch(err => alert(err.message));
    } else if (modalType === 'edit') {
      fetch(`http://localhost:5000/api/products/${editId}`, {
        method: 'PUT',
        body: formData
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to update product');
          setShowModal(false);
          fetchProducts();
        })
        .catch(err => alert(err.message));
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div>
   <div className='flex justify-between w-full'>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <button onClick={openAddModal} className="mb-4 bg-pink-900 text-white px-4 py-2 rounded hover:bg-pink-700 flex items-center justify-center" title="Add Product">
        {/* Plus Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
      </button></div>
      {/* Table for md+ screens */}
      <StandardTable
        columns={[
          { label: 'Name', key: 'name' },
          { label: 'Category', key: 'category', render: p => p.category?.title || '-' },
          { label: 'Price', key: 'price' },
          { label: 'ID', key: '_id' },
        ]}
        data={products}
        actions={product => (
          <>
            <button onClick={() => openEditModal(product)} className="p-2 rounded hover:text-blue-700 flex items-center justify-center" title="Edit">
              <Edit2 size={15}/>
            </button>
            <button onClick={() => handleDelete(product._id)} className="p-2 rounded hover:text-red-700 flex items-center justify-center" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
            </button>
          </>
        )}
        preview={product => (product.image || (product.images && product.images.length > 0)) && (
          <div className="bg-white border rounded shadow-lg p-2">
            <div className="flex flex-col gap-2">
              {product.image && (
                <img src={product.image} alt={product.name} className="w-24 h-24 object-contain rounded" />
              )}
              <div className='flex gap-2'>
                {product.images && product.images.map((img, idx) => (
                  <img key={idx} src={img} alt={product.name + ' ' + (idx+1)} className="w-16 h-16 object-contain rounded border" />
                ))}
              </div>
            </div>
          </div>
        )}
        renderCard={product => (
          <div key={product._id} className="bg-white rounded shadow border border-gray-200 p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">{product.name}</span>
              <div className="flex gap-2">
                <button onClick={() => openEditModal(product)} className="p-2 rounded hover:text-blue-700 flex items-center justify-center" title="Edit">
                  <Edit2 size={15}/>
                </button>
                <button onClick={() => handleDelete(product._id)} className="p-2 rounded hover:text-red-700 flex items-center justify-center" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                </button>
              </div>
            </div>
            <div className="text-gray-700"><span className="font-semibold">Category:</span> {product.category?.title || '-'}</div>
            <div className="text-gray-700"><span className="font-semibold">Price:</span> {product.price || '-'}</div>
            <div className="text-gray-400 text-xs break-all"><span className="font-semibold">ID:</span> {product._id}</div>
          </div>
        )}
      />
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 max-h-[50vh] overflow-y-scroll rounded shadow-lg min-w-[320px]">
            <h2 className="text-xl font-bold mb-4">{modalType === 'add' ? 'Add Product' : 'Edit Product'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border px-2 py-1 rounded" required />
              {/* Category select */}
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="border px-2 py-1 rounded" required>
                <option value="" disabled>Select Category</option>
                {catLoading ? <option>Loading...</option> : null}
                {catError ? <option disabled>Error loading categories</option> : null}
                {categories.map(cat => (
                  <option key={cat._id} value={cat.title}>{cat.title}</option>
                ))}
              </select>
              <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="border px-2 py-1 rounded" required />
              
              {/* Main Image Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="hidden"
                  id="main-image-upload"
                />
                <label htmlFor="main-image-upload" className="cursor-pointer">
                  <div className="text-gray-600">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1">Click to upload main image</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB (will be compressed)</p>
                  </div>
                </label>
              </div>
              
              {/* Main Image Preview */}
              {mainImage && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">Main image (compressed):</p>
                  <div className="relative inline-block">
                    <img
                      src={URL.createObjectURL(mainImage)}
                      alt="Main image preview"
                      className="w-32 h-32 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => setMainImage(null)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Size: {(mainImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
              
              {/* Additional Images Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-pink-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="additional-images-upload"
                />
                <label htmlFor="additional-images-upload" className="cursor-pointer">
                  <div className="text-gray-600">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 font-medium">Click to upload additional images</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each (will be compressed)</p>
                    <p className="text-xs text-pink-600 mt-1">You can select multiple images at once</p>
                  </div>
                </label>
              </div>
              
              {/* Compression Progress */}
              {compressing && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700">Compressing images...</span>
                    <span className="text-sm text-blue-600">{Math.round(compressionProgress)}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${compressionProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Preview selected files */}
              {selectedFiles.length > 0 && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-700">
                      Additional images ({selectedFiles.length}):
                    </p>
                    <button
                      type="button"
                      onClick={clearAllFiles}
                      className="text-xs text-red-600 hover:text-red-800 underline"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded border hover:opacity-75 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            title="Remove image"
                          >
                            ×
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded-b">
                          <div className="flex justify-between items-center">
                            <span>{file.name.length > 10 ? file.name.substring(0, 10) + '...' : file.name}</span>
                            <span className="text-green-300">{(file.size / 1024 / 1024).toFixed(1)}MB</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedFiles.length} image{selectedFiles.length !== 1 ? 's' : ''} selected (compressed)
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Total size: {(selectedFiles.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
              
              <div className="flex gap-2 mt-2">
                <button type="submit" className="bg-pink-900 text-white px-4 py-2 rounded hover:bg-pink-700">{modalType === 'add' ? 'Add' : 'Update'}</button>
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 