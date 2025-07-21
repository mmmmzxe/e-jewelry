import React from 'react';
import StandardModal from '../../../components/common/StandardModal';
import ProductForm from './ProductForm';

export default function ProductModal(props) {
  return (
    <StandardModal show={props.show} onClose={props.onClose} title={props.modalType === 'add' ? 'Add Product' : 'Edit Product'}>
      <ProductForm {...props} />
    </StandardModal>
  );
} 