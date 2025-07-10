// Simple test to check if env vars are loading
console.log('Testing environment variables:');
console.log('REACT_APP_CLERK_PUBLISHABLE_KEY:', process.env.REACT_APP_CLERK_PUBLISHABLE_KEY);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Check if the key is actually being read
const key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
if (key) {
  console.log('✅ Key found, length:', key.length);
  console.log('First 20 chars:', key.substring(0, 20));
} else {
  console.log('❌ Key not found');
}
