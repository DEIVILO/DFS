"use client"

import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [data, setData] = useState<string>('');

  const handleSignup = async () => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const result = await res.json();
    console.log(result);
  };

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const result = await res.json();
    setToken(result.token);
  };

  const fetchData = async () => {
    const res = await fetch('/api/data', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    setData(result.data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Next.js Authentication Example</h1>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Fetch Data</h2>
        <button
          className="w-full bg-green-500 text-white p-2 rounded"
          onClick={fetchData}
        >
          Fetch Protected Data
        </button>
        <p className="mt-4">{data}</p>
      </div>
    </div>
  );
}
