const createNewAddress = async (userId, addressData) => {
    try {
        const response = await fetch(`http://localhost:8080/api/addresses/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({addressData})
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Address created:', result);
        } else {
            const errorData = await response.json();
            console.error('Failed to create address:', errorData);
        }
        return response.data;
    } catch (error) {
        console.error('Error creating new address:', error);
    }
};

export { createNewAddress };
