const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const initializePayment = async (paymentData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/payment/initialize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentData }),
        });

        if (!response.ok) {
            throw new Error('Payment initialization failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Payment initialization failed');
        throw error;
    }
};

export const verifyPayment = async (reference) => {
    try {
        const response = await fetch(`${API_BASE_URL}/payment/verify/${reference}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to verify payment');
        }

        return await response.json();
    } catch (error) {
        console.error('Payment verification error:', error);
        throw error;
    }
};