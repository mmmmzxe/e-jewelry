import React, { useState } from 'react';

export default function StandardTable({ columns, data, actions, preview, renderCard }) {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <>
      {/* Table for md+ screens */}
      <div className="relative">
        <table className="min-w-full bg-white border border-gray-200 hidden md:table">
          <thead>
            <tr className="text-left">
              {columns.map(col => (
                <th key={col.key} className="py-2 px-4 border-b">{col.label}</th>
              ))}
              {actions && <th className="py-2 px-4 border-b">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr
                key={row._id || row.id}
                onMouseEnter={() => setHoveredRow(row._id || row.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className="relative hover:bg-slate-100 group"
              >
                {columns.map(col => (
                  <td key={col.key} className="py-2 px-4 border-b">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="py-2 px-4 border-b flex gap-2">
                    {actions(row)}
                  </td>
                )}
                {/* Floating preview */}
                {preview && hoveredRow === (row._id || row.id) && (
                  <td className="absolute left-1/2 top-1/2 -translate-y-1/2 z-50 ml-2">
                    {preview(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Cards for small screens */}
      {renderCard && (
        <div className="block md:hidden space-y-4">
          {data.map(row => renderCard(row))}
        </div>
      )}
    </>
  );
} 