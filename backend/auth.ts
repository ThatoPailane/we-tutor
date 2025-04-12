// backend/auth.tsx

// Mocked in-memory storage for users and tickets
let users: any[] = [];  // Mock user store (to simulate user data)
let tickets: any[] = [];  // Mock ticket store (to simulate ticket data)

// Helper function to simulate sign up (adding users to in-memory store)
export const signUp = async (email: string, password: string, username: string, fullname: string) => {
    try {
        // Check if the user already exists
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            return { success: false, message: 'User already exists.' };
        }

        // Create and add new user
        const newUser = { email, password, username, fullname };
        users.push(newUser);

        console.log("User signed up successfully!");
        return { success: true };
    } catch (error) {
        console.error("Error during signup:", error);
        return { success: false, error };
    }
};

// Function for login (simulates finding a user from in-memory users array)
export const login = async (email: string, password: string) => {
    try {
        const matchedUser = users.find((user: any) => user.email === email && user.password === password);
        if (matchedUser) {
            console.log("Login successful");
            return matchedUser;
        } else {
            console.log("Login failed: Invalid credentials");
            return { success: false, message: 'Invalid credentials' };
        }
    } catch (error) {
        console.error("Error during login:", error);
        return { success: false, message: 'Error during login' };
    }
};

// Function to get the logged-in user (returns a sample user for simplicity)
export const getUser = async () => {
    try {
        // Simulate fetching the currently logged-in user (using a mocked email)
        const loggedInUser = { email: "student@school.edu", name: "John Doe" };
        return loggedInUser;
    } catch (error) {
        console.error("Error in getUser:", error);
        return null;
    }
};

// Function to logout (does nothing here as it's handled on the client side)
export const logout = async () => {
    console.log("User logged out");
};

// Function to get tickets by user email (fetches from in-memory tickets)
export const getUserTickets = async (userEmail: string) => {
    try {
        const userTickets = tickets.filter(ticket => ticket.email === userEmail);
        return userTickets;
    } catch (error) {
        console.error('Error fetching user tickets:', error);
        return [];
    }
};

// Function to create a new ticket (adds ticket to in-memory store)
export const createTicket = async (ticketData: { title: string; description: string; type: string; status: string; email: string }) => {
    try {
        const newTicket = { ...ticketData, id: `${Date.now()}`, status: 'open' };
        tickets.push(newTicket);
        console.log("Ticket created successfully!");
        return { success: true, message: 'Ticket created successfully!' };
    } catch (error) {
        console.error("Error creating ticket:", error);
        return { success: false, message: 'Error creating ticket' };
    }
};
