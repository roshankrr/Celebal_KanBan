import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';

// Hardcode the key temporarily for testing
const publishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || 'pk_test_c3VwZXItaG9ybmV0LTYzLmNsZXJrLmFjY291bnRzLmRldiQ';

console.log('Raw publishable key:', process.env.REACT_APP_CLERK_PUBLISHABLE_KEY);
console.log('Key length:', publishableKey?.length);
console.log('Key exists:', !!publishableKey);
console.log('Key value:', publishableKey);
console.log('All REACT_APP env vars:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP')));

if (!publishableKey) {
  console.error('❌ Missing Clerk Publishable Key');
  throw new Error('Missing Clerk Publishable Key');
} else {
  console.log('✅ Clerk Publishable Key found');
}

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

