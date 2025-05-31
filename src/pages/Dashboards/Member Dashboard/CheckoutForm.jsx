import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";


const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { user, month, rent } = useContext(AuthContext);
    const navigate = useNavigate();

    const totalPrice = rent;

    useEffect(() => {
        if (totalPrice > 0) {
            axios.post(`${import.meta.env.VITE_serverApiLink}/stripe-intent`, { rentAmount: totalPrice })
                .then(res => {
                    toast.success(`Loading Payment Form`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        theme: "light",
                    });
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log('payment error', error);
            setError(error.message);
        }
        else {
            // console.log('payment method', paymentMethod)
            setError('');
        }

        // Confirm Payment >
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            // console.log('Confirm Error')
        }
        else {
            // console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);


                // Data For Saving In DB >
                const currentYear = new Date().getFullYear();
                const monthYear = `${month} ${currentYear}`;

                const date = new Date();
                const formattedDate = date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });


                // Saving Payment Info In DB >
                const payment = {
                    email: user.email,
                    rentAmount: paymentIntent.amount / 100,
                    transactionId: paymentIntent.id,
                    paymentDate: formattedDate,
                    rentMonth: monthYear
                }

                const res = await axios.post(`${import.meta.env.VITE_serverApiLink}/payments`, payment, { headers: { authorization: localStorage.getItem('access-token') } });
                // console.log('payment saved', res.data);
                if (res.data) {
                    toast.success(`Payment Info Saved`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        theme: "light",
                    });
                    setTimeout(() => {
                        navigate('/dashboard/paymentHistory');
                    }, 3000); 

                }

            }
        }

    }

    return (
        <form onSubmit={handleSubmit} className="w-[400px]">
            <CardElement
                className="w-full p-4 border border-black rounded-md mb-4"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <button
                type="submit"
                disabled={!stripe || !clientSecret}
                className={`w-full py-2 text-xl font-semibold rounded-md transition-colors duration-300 
      ${!stripe || !clientSecret
                        ? 'bg-gray-400 text-white cursor-not-allowed opacity-60'
                        : 'bg-black text-white hover:bg-black cursor-pointer'}
    `}
            >
                Pay
            </button>

            {error && <p className="text-red-900 bg-red-400 rounded-md px-3 py-1 mt-3 text-sm text-center font-medium">{error}</p>}
            {transactionId && <p className="text-green-900 bg-green-400 rounded-md px-3 py-1 mt-3 text-sm text-center font-medium">Your Transaction Id: {transactionId}</p>}
        </form>

    );
};

export default CheckoutForm;