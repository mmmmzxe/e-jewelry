import React from 'react';

export default function ProductForm({
  form,
  setForm,
  mainImage,
  setMainImage,
  selectedFiles,
  setSelectedFiles,
  compressing,
  compressionProgress,
  categories,
  catLoading,
  catError,
  onFileChange,
  onMainImageChange,
  removeFile,
  clearAllFiles,
  onSubmit,
  loading,
  modalType
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
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
          onChange={onMainImageChange}
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
          onChange={onFileChange}
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
              className="text-xs text-pink-900 hover:text-red-800 underline"
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
        <button type="submit" className="bg-pink-900 text-white px-4 py-2 rounded hover:bg-pink-700" disabled={loading}>
          {modalType === 'add' ? 'Add' : 'Update'}
        </button>
      </div>
    </form>
  );
} 