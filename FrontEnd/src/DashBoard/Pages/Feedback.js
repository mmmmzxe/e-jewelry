import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFeedback } from '../../store/slices/feedbackSlice';
import StandardTable from '../../components/common/StandardTable';
import JewelryLoader from '../../Layout/JewelryLoader';

export default function FeedbackDashboard() {
  const dispatch = useDispatch();
  const { allFeedbacks, loading, error } = useSelector(state => state.feedback);

  useEffect(() => {
    dispatch(fetchAllFeedback());
  }, [dispatch]);

  const columns = [
    { label: 'User', key: 'userId', render: row => row.userId?._id || 'Unknown' },
    { label: 'Product', key: 'productId', render: row => row.productId?.name || 'Unknown' },
   
    { label: 'Rating', key: 'rating', render: row => (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={(!row.rating || row.rating === 0) ? 'text-gray-300' : (i < Math.round(row.rating) ? 'text-yellow-400' : 'text-gray-300')}>
            ★
          </span>
        ))}
      </>
    ) },
    { label: 'Comment', key: 'comment' },
    { label: 'Date', key: 'createdAt', render: row => new Date(row.createdAt).toLocaleString() },
  ];

  return (
    <div className=" ">
      <h1 className="text-2xl font-bold mb-6">All User Feedback</h1>
      {loading ? (
         <JewelryLoader/>
      ) : error ? (
        <div className="text-red-600">Error: {error}</div>
      ) : allFeedbacks.length === 0 ? (
        <div>No feedback found.</div>
      ) : (
        <StandardTable
          columns={columns}
          data={allFeedbacks}
          preview={row => (row.productId?.image || (row.productId?.images && row.productId.images.length > 0)) && (
            <div className="bg-white border rounded shadow-lg p-2">
              <div className="flex flex-col gap-2">
                {row.productId?.image && (
                  <img src={row.productId.image} alt={row.productId?.name} className="w-24 h-24 object-contain rounded" />
                )}
                <div className='flex gap-2'>
                  {row.productId?.images && row.productId.images.map((img, idx) => (
                    <img key={idx} src={img} alt={row.productId?.name + ' ' + (idx+1)} className="w-16 h-16 object-contain rounded border" />
                  ))}
                </div>
              </div>
            </div>
          )}
          renderCard={row => (
            <div key={row._id} className="bg-white rounded shadow border border-gray-200 p-4 flex flex-col gap-2">
              <div><span className="font-semibold">User:</span> {row.userId?._id || 'Unknown'}</div>
              <div><span className="font-semibold">Product:</span> {row.productId?.name || 'Unknown'}</div>
              <div><span className="font-semibold">Image:</span> {row.productId?.image ? <img src={row.productId.image} alt="product" className="w-16 h-16 object-cover rounded" /> : 'No image'}</div>
              <div><span className="font-semibold">Images:</span> {row.productId?.images && row.productId.images.length > 0 ? (
                <div className="flex gap-1 flex-wrap">{row.productId.images.map((img, i) => <img key={i} src={img} alt="product" className="w-10 h-10 object-cover rounded" />)}</div>
              ) : 'No images'}</div>
              <div><span className="font-semibold">Rating:</span> {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={(!row.rating || row.rating === 0) ? 'text-gray-300' : (i < Math.round(row.rating) ? 'text-yellow-400' : 'text-gray-300')}>
                  ★
                </span>
              ))}
              </div>
              <div><span className="font-semibold">Comment:</span> {row.comment}</div>
              <div><span className="font-semibold">Date:</span> {new Date(row.createdAt).toLocaleString()}</div>
            </div>
          )}
        />
      )}
    </div>
  );
} 