import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/slices/cartSlice';
import { toast } from 'react-toastify';
import OrderSummary from './OrderSummary';
import DetailsInformation from './DetailsInformation';
import DeliveryMethodinperson from './DeliveryMethodinperson';
import DeliveryMethodbyshipment from './DeliveryMethodbyshipment';

function Checkout() {
  const location = useLocation();
  const { cartItems, totalCart } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [customLocation, setCustomLocation] = useState({
    name: 'MARIGOLD MALL',
    address: '13 Greenleaf Ave.',
    city: 'New York',
    zipCode: 'NY 12345',
    hours: 'Pickup Available from 8 AM to 7 PM',
  });
  const [tempLocation, setTempLocation] = useState(customLocation);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [billingInfo, setBillingInfo] = useState({
    cardName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    zipCode: '',
    address: ''
  });

  useEffect(() => {
    if (cartItems) {
      dispatch(clearCart());
    }
  }, [cartItems, dispatch]);

  if (!cartItems) {
    return <p className="text-center text-gray-500">Cart is empty</p>;
  }

  const handleConfirmOrder = async (event) => {
    event.preventDefault();
  
    const isShipmentSelected = deliveryMethod === 'by-shipment';
    const isInPersonSelected = deliveryMethod === 'in-person' ;
  
    if (  !deliveryMethod || 
      (isShipmentSelected && (
        !shippingDetails.address || 
        !shippingDetails.city || 
        !shippingDetails.state || 
        !shippingDetails.zipCode ||
        !billingInfo.cardName || 
        !billingInfo.cardNumber || 
        !billingInfo.expirationDate || 
        !billingInfo.cvv || 
        !billingInfo.zipCode || 
        !billingInfo.address
      )) ||
      (isInPersonSelected && (
        !tempLocation.name || 
        !tempLocation.address || 
        !tempLocation.city || 
        !tempLocation.zipCode ||
        !billingInfo.cardName || 
        !billingInfo.cardNumber || 
        !billingInfo.expirationDate || 
        !billingInfo.cvv || 
        !billingInfo.zipCode || 
        !billingInfo.address
      )) ||
      !formData.address || 
      !formData.city || 
      !formData.state || 
      !formData.zipCode || 
      !formData.name || 
      !formData.email || 
      !formData.phone
    ) {
      toast.error('Please fill out all required fields.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
  
    // Create order in backend
    try {
      const userId = localStorage.getItem('userId');
      const orderPayload = {
        userId,
        cartItems: cartItems.map(item => ({
          productId: item._id || item.id,
          name: item.name,
          price: item.price,
          count: item.count,
          image: item.image,
        })),
        total: totalCart,
        formData,
        deliveryMethod,
        customLocation,
        shippingDetails,
        billingInfo,
      };
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      if (!res.ok) throw new Error('Failed to create order');
      const order = await res.json();

      // Remove cart from backend
      if (userId) {
        await fetch(`http://localhost:5000/api/cart/${userId}`, {
          method: 'DELETE',
        });
      }

      dispatch(clearCart());
      navigate('/orderdone', {
        state: { cartItems, totalCart, shippingDetails, formData, deliveryMethod, customLocation, billingInfo, orderId: order._id }
      });
    } catch (err) {
      toast.error('Failed to place order. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  

  const handleInputChangeIngo = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setTempLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChangeBilling = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleLocationSubmit = () => {
 
    setCustomLocation(tempLocation);
    setShowLocationInput(false);
  };

  return (
    <div className="container mx-auto h-full flex flex-col md:flex-row-reverse gap-10 p-3 pb-5 pt-36 justify-center items-start">
      <OrderSummary cartItems={cartItems} totalCart={totalCart} handleConfirmOrder={handleConfirmOrder}/>

      <div className="gap-5 rounded-lg p-6 w-full md:w-[70%]">
        <DetailsInformation 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleConfirmOrder={handleConfirmOrder} 
        />

        <h1 className="my-5 border-b-2 pb-5 text-black text-2xl md:text-3xl">
          How would you like to receive your order?
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="delivery-method"
              value="by-shipment"
              checked={deliveryMethod === 'by-shipment'}
              onChange={() => setDeliveryMethod('by-shipment')}
              className="h-4 w-4"
            />
            <span className="ml-2">By Shipment</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="delivery-method"
              value="in-person"
              checked={deliveryMethod === 'in-person'}
              onChange={() => setDeliveryMethod('in-person')}
              className="h-4 w-4"
            />
            <span className="ml-2">In Person</span>
          </label>
        </div>

        {deliveryMethod === 'by-shipment' && (
          <DeliveryMethodbyshipment
            handleInputChangeIngo={handleInputChangeIngo}
            billingInfo={billingInfo}
            handleInputChangeBilling={handleInputChangeBilling}
            handleConfirmOrder={handleConfirmOrder}
            shippingDetails={shippingDetails}
          />
        )}

        {deliveryMethod === 'in-person' && (
          <DeliveryMethodinperson 
            handleLocationChange={handleLocationChange}
            handleLocationSubmit={handleLocationSubmit}
            tempLocation={tempLocation}
            setShowLocationInput={setShowLocationInput}
            customLocation={customLocation}
            handleInputChangeIngo={handleInputChangeIngo}
            billingInfo={billingInfo}
            handleConfirmOrder={handleConfirmOrder}
            showLocationInput={showLocationInput}
          />
        )}
        
      </div>
    </div>
  );
}

export default Checkout;
