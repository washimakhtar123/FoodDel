import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await axios.post(`${url}/api/order/verify`, { success, orderId });

                if (response.data.success) {
                    navigate("/myorders");
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Payment verification failed:", error);
                navigate("/");
            }
        };

        verifyPayment();
    }, [url, success, orderId, navigate]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
    );
};

export default Verify;
