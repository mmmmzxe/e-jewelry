import { Edit2, InfoIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StandardTable from '../../../components/common/StandardTable';
import JewelryLoader from '../../../Layout/JewelryLoader';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from '../../../store/slices/productsSlice';
import ProductModal from './ProductModal';

export default function DashboardProducts() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
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

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const fetchCategories = () => {
    setCatLoading(true);
    fetch('https://jewelry.up.railway.app/api/categories')
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

  // Image compression utility
  const compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
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
      setCompressionProgress(((i + 1) / totalFiles) * 100);
    }
    setCompressing(false);
    setCompressionProgress(0);
    return compressedFiles;
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
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

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    dispatch(deleteProduct(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      dispatch(addProduct({ form, mainImage, images: selectedFiles })).then(res => {
        if (!res.error) setShowModal(false);
      });
    } else if (modalType === 'edit') {
      dispatch(updateProduct({ id: editId, form, mainImage, images: selectedFiles })).then(res => {
        if (!res.error) setShowModal(false);
      });
    }
  };

  if (loading) return <JewelryLoader/>;
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
      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        form={form}
        setForm={setForm}
        mainImage={mainImage}
        setMainImage={setMainImage}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        compressing={compressing}
        compressionProgress={compressionProgress}
        categories={categories}
        catLoading={catLoading}
        catError={catError}
        onFileChange={handleFileChange}
        onMainImageChange={handleMainImageChange}
        removeFile={removeFile}
        clearAllFiles={clearAllFiles}
        onSubmit={handleSubmit}
        loading={loading}
        modalType={modalType}
      />
    </div>
  );
} 