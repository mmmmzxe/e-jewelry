import React, { useRef } from 'react';

export default function CategoryForm({ form, setForm, onSubmit, loading, submitLabel }) {
  const fileInputRef = useRef();
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        className="border px-2 py-1 rounded"
        required
      />
      {/* Image Upload (styled like DashboardProducts) */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={e => setForm({ ...form, imageFile: e.target.files[0] })}
          className="hidden"
          id="category-image-upload"
        />
        <label htmlFor="category-image-upload" className="cursor-pointer">
          <div className="text-gray-600">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-1">Click to upload image</p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </label>
      </div>
      {/* Image Preview */}
      {form.imageFile && (
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-700 mb-2">Image preview:</p>
          <div className="relative inline-block">
            <img
              src={URL.createObjectURL(form.imageFile)}
              alt="Category preview"
              className="w-32 h-32 object-cover rounded border"
            />
            <button
              type="button"
              onClick={() => setForm({ ...form, imageFile: null })}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              ×
            </button>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Size: {(form.imageFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}
      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-pink-900 text-white px-4 py-2 rounded hover:bg-pink-700" disabled={loading}>
          {submitLabel || 'Submit'}
        </button>
      </div>
    </form>
  );
} 