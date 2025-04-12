'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createTicket, getUser } from '@/backend/auth';

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ticketType, setTicketType] = useState<'personal' | 'community'>('personal');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (user) {
          setUserEmail(user.email);
        } else {
          router.push('/');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        router.push('/');
      } finally {
        setCheckingAuth(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    if (!userEmail) {
      alert("User is not authenticated.");
      return;
    }

    setLoading(true);

    const newTicket = {
      title,
      description,
      type: ticketType,
      status: 'open',
      email: userEmail,
    };

    try {
      const result = await createTicket(newTicket);

      if (result.success) {
        alert('Ticket created successfully!');
        router.push('/dashboard');
      } else {
        alert('Failed to create ticket. Please try again.');
      }
    } catch (err: any) {
      console.error('Error creating ticket:', err?.message || err);
      alert('An error occurred while creating the ticket.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return <div className="p-4 text-center text-gray-500">Checking authentication...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="create-ticket-form mb-4 max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h3 className="text-xl font-semibold mb-4">Create a New Ticket</h3>

      <div className="mb-4">
        <label className="block text-sm font-semibold">Ticket Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => {
            console.log('Typing:', e.target.value);
            setTitle(e.target.value);
          }}
          className="w-full p-2 border rounded-md"
          placeholder="Enter ticket title"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-semibold">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Describe the issue"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="ticketType" className="block text-sm font-semibold">Ticket Type</label>
        <select
          id="ticketType"
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value as 'personal' | 'community')}
          className="w-full p-2 border rounded-md"
        >
          <option value="personal">Personal</option>
          <option value="community">Community</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
      >
        {loading ? 'Creating Ticket...' : 'Create Ticket'}
      </button>
    </form>
  );
};

export default CreateTicket;
