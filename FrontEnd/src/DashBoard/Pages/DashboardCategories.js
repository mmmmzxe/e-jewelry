import React, { useEffect, useState } from 'react';
import { Edit2 } from 'lucide-react';
import StandardTable from '../../components/common/StandardTable';

export default function DashboardCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [form, setForm] = useState({ title: '', image: '' });
  const [editId, setEditId] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const fetchCategories = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/categories')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch categories');
        return res.json();
      })
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setForm({ title: '', image: '' });
    setModalType('add');
    setShowModal(true);
    setEditId(null);
  };

  const openEditModal = (category) => {
    setForm({
      title: category.title,
      image: category.image || ''
    });
    setModalType('edit');
    setShowModal(true);
    setEditId(category._id);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    fetch(`http://localhost:5000/api/categories/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete category');
        fetchCategories();
      })
      .catch(err => alert(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      image: form.image
    };
    if (modalType === 'add') {
      fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to add category');
          setShowModal(false);
          fetchCategories();
        })
        .catch(err => alert(err.message));
    } else if (modalType === 'edit') {
      fetch(`http://localhost:5000/api/categories/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to update category');
          setShowModal(false);
          fetchCategories();
        })
        .catch(err => alert(err.message));
    }
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div>
    <div className='flex justify-between w-full'>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <button onClick={openAddModal} className="mb-4 bg-pink-900 text-white px-4 py-2 rounded hover:bg-pink-700 flex items-center justify-center" title="Add Category">
        {/* Plus Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
      </button></div>
      {/* Table for md+ screens */}
      <StandardTable
        columns={[
          { label: 'Title', key: 'title' },
          { label: 'ID', key: '_id' },
        ]}
        data={categories}
        actions={category => (
          <>
            <button onClick={() => openEditModal(category)} className="p-2 rounded hover:text-blue-700 flex items-center justify-center" title="Edit">
              <Edit2 size={15}/>
            </button>
            <button onClick={() => handleDelete(category._id)} className="p-2 rounded hover:text-red-700 flex items-center justify-center" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
            </button>
          </>
        )}
        preview={category => category.image && (
          <div className="bg-white border rounded shadow-lg p-2">
            <img src={category.image} alt={category.title} className="w-24 h-24 object-contain rounded" />
          </div>
        )}
        renderCard={category => (
          <div key={category._id} className="bg-white rounded shadow border border-gray-200 p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">{category.title}</span>
              <div className="flex gap-2">
                <button onClick={() => openEditModal(category)} className="p-2 rounded hover:text-blue-700 flex items-center justify-center" title="Edit">
                  <Edit2 size={15}/>
                </button>
                <button onClick={() => handleDelete(category._id)} className="p-2 rounded hover:text-red-700 flex items-center justify-center" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                </button>
              </div>
            </div>
            {category.image && (
              <img src={category.image} alt={category.title} className="w-full h-32 object-contain rounded border" />
            )}
            <div className="text-gray-400 text-xs break-all"><span className="font-semibold">ID:</span> {category._id}</div>
          </div>
        )}
      />
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[320px]">
            <h2 className="text-xl font-bold mb-4">{modalType === 'add' ? 'Add Category' : 'Edit Category'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="border px-2 py-1 rounded" required />
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