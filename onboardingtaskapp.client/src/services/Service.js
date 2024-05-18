

// customerService.js

const BASE_URL = 'http://example.com/api'; // Replace this with your API base URL

export const fetchCustomer = async () => {

    return 'fetching....'; 
    try {
        const response = await fetch(`${BASE_URL}/customers/${customerId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch customer data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching customer data:', error.message);
        throw error;
    }
};
