const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

const getAuthToken = () => {
    // Get token from HTTP-only cookie
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    if (tokenCookie) {
        return tokenCookie.split('=')[1].trim();
    }
    return null;
};

export const initializePayment = async (paymentData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/payments/initialize`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData),
        });

       if (!response.ok) {
            // Try to read response body (text), fallback to status message
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }     

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Payment initialization error:", error);
        throw error;
    }
};

export const verifyPayment = async (reference) => {
    try {
        console.log('Verifying payment with reference:', reference);
        
        const response = await fetch(`${API_BASE_URL}/api/payments/verify/${reference}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
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