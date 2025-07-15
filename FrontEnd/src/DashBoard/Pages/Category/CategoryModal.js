import React from 'react';
import StandardModal from '../../../components/common/StandardModal';
import CategoryForm from './CategoryForm';

export default function CategoryModal({ show, onClose, form, setForm, onSubmit, loading, modalType }) {
  return (
    <StandardModal show={show} onClose={onClose} title={modalType === 'add' ? 'Add Category' : 'Edit Category'}>
      <CategoryForm
        form={form}
        setForm={setForm}
        onSubmit={onSubmit}
        loading={loading}
        submitLabel={modalType === 'add' ? 'Add' : 'Update'}
      />
    </StandardModal>
  );
} 