import React from 'react';

const LoginPage = () => {
    const handleLogin = () => {
        // Logic for Auth0 login
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Login</h1>
            <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded">
                Login with Auth0
            </button>
        </div>
    );
};

export default LoginPage;
