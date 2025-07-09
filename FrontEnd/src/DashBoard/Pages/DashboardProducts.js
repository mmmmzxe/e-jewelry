import { Edit2, InfoIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import StandardTable from '../../components/common/StandardTable';

export default function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [form, setForm] = useState({ name: '', price: '', category: '', image: '' });
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [catError, setCatError] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

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
    setForm({ name: '', price: '', category: '', image: '' });
    setModalType('add');
    setShowModal(true);
    setEditId(null);
    fetchCategories();
  };

  const openEditModal = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category?.title || '',
      image: product.image || ''
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      price: form.price,
      category: { title: form.category },
      image: form.image
    };
    if (modalType === 'add') {
      fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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
          <div className="bg-white p-6 rounded shadow-lg min-w-[320px]">
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
              <input type="text" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="border px-2 py-1 rounded" />
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