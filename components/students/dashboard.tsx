import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, getUserTickets, createTicket } from '@/backend/auth';  // Add these functions accordingly

type User = {
  email: string;
  name?: string;
};

type Ticket = {
  id: string;
  title: string;
  description: string;
  type: 'personal' | 'community';
  status: 'open' | 'closed';
  email: string; // Make sure the email is included in the ticket
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTicket, setNewTicket] = useState('');
  const [ticketType, setTicketType] = useState<'personal' | 'community'>('personal');
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUser();
        if (!userData) {
          router.push('/');
        } else {
          setUser(userData);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    const loadTickets = async () => {
      if (user) {
        const userTickets = await getUserTickets(user.email);
        setTickets(userTickets);
      }
    };

    loadUser();
    loadTickets();
  }, [router, user]);

  const handleLogout = () => {
    // Real logout logic should go here (clear session/cookie, etc.)
    console.log('Logging out...');
    router.push('/');
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.trim()) return; // Don't create empty tickets

    const newTicketData: Ticket = {
      id: `${Date.now()}`,  // Simple ID based on time
      title: newTicket,
      description: 'Ticket description goes here',
      type: ticketType,
      status: 'open',
      email: user?.email || '',  // Add the user's email here
    };

    try {
      await createTicket(newTicketData);  // Send ticket data with email to backend
      setTickets((prevTickets) => [...prevTickets, newTicketData]);
      setNewTicket('');
    } catch (err) {
      console.error('Error creating ticket:', err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper p-6 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tick-it Student Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <section className="dashboard-welcome mb-6">
        <h2>Welcome, {user?.name || user?.email} 👋</h2>
        <p>This is your personalized dashboard. Manage your personal and community tickets.</p>
      </section>

      <section className="dashboard-main">
        <div className="ticket-section mb-8">
          <h3 className="text-xl font-semibold">Your Tickets</h3>
          {tickets.length === 0 ? (
            <p>No tickets yet. Start by creating a new ticket!</p>
          ) : (
            <div className="ticket-list">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="ticket-card p-4 mb-4 border rounded-md">
                  <h4 className="font-semibold">{ticket.title}</h4>
                  <p>{ticket.description}</p>
                  <p>Status: {ticket.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="ticket-section">
          <h3 className="text-xl font-semibold">Create a New Ticket</h3>
          <form onSubmit={handleCreateTicket} className="create-ticket-form mb-4">
            <input
              type="text"
              value={newTicket}
              onChange={(e) => setNewTicket(e.target.value)}
              placeholder="Ticket Title"
              className="w-full p-2 border rounded-md mb-2"
              required
            />
            <div className="mb-4">
              <label className="mr-2">Ticket Type:</label>
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value as 'personal' | 'community')}
                className="p-2 border rounded-md"
              >
                <option value="personal">Personal</option>
                <option value="community">Community</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Create Ticket
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
