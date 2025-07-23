import React from 'react';

export default function StandardModal({ show, onClose, title, children, minWidth = 320, maxWidth = 500 }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className="bg-white max-h-[75vh]  overflow-y-auto   p-6 rounded shadow-lg"
        style={{ minWidth, maxWidth }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
} 