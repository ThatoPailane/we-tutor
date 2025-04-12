'use client'

import CreateTicket from '@/components/students/createTicket';  // Import the CreateTicket form component

const CreateTicketsPage = () => {
  return (
    <main className="create-tickets-page p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create a New Ticket</h1>
      <CreateTicket />
    </main>
  );
};

export default CreateTicketsPage;
