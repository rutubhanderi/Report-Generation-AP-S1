import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider 
      domain="dev-ieyxv8cd15civky8.us.auth0.com"
      clientId="82z8cDrgt1R2LQxoJF8Mn2xYmvIWP7aM"
      authorizationParams={{
      redirect_uri: window.location.origin}}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);


