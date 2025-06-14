const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

const getAuthToken = () => {
    // Get token from cookie
    const cookies = document.cookie.split(';');
    const idCookie = cookies.find(cookie => cookie.trim().startsWith('id='));
    if (idCookie) {
        return idCookie.split('=')[1].trim();
    }
    return null;
};

export const initializePayment = async (paymentData) => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required. Please login to continue.');
        }

        const response = await fetch(`${API_BASE_URL}/api/payments/initialize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(paymentData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Payment initialization failed');
        }

        return data;
    } catch (error) {
        console.error('Payment initialization error:', error);
        throw error;
    }
};

export const verifyPayment = async (reference) => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required. Please login to continue.');
        }
        
        console.log('Verifying payment with reference:', reference);
        
        const response = await fetch(`${API_BASE_URL}/api/payments/verify/${reference}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();
        console.log('Verification response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Failed to verify payment');
        }

        if (!data.success) {
            throw new Error(data.message || 'Payment verification failed');
        }

        return data;
    } catch (error) {
        console.error('Payment verification error:', error);
        throw error;
    }
};