const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  cartItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      count: Number,
      image: String,
    }
  ],
  total: { type: Number, required: true },
  formData: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
  },
  deliveryMethod: String,
  status: { type: String, default: 'Pending' },
  customLocation: {
    name: String,
    address: String,
    city: String,
    zipCode: String,
    hours: String,
  },
  shippingDetails: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
  },
  billingInfo: {
    cardName: String,
    cardNumber: String,
    expirationDate: String,
    cvv: String,
    zipCode: String,
    address: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema); 