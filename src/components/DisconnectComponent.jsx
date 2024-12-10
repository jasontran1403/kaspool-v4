// Disconnect.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DisconnectComponent = () => {
    const navigate = useNavigate();

    const handleDisconnect = () => {
        // Clear localStorage or any state management related to wallet connection
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("publicKey");
        localStorage.removeItem("walletStateInit");
        localStorage.removeItem("access_token");
        localStorage.removeItem("is_in_tree");
        localStorage.removeItem("is_lock");

        // Optionally navigate to another path
        navigate('/'); // Redirect to home or any desired path after disconnect
    };

    // Call your function when the component mounts
    React.useEffect(() => {
        handleDisconnect();
    }, []);

    return (
        <div>
        </div>
    );
};

export default DisconnectComponent; // Ensure this is exported
