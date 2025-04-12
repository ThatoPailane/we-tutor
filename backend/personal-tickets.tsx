"use server"
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const usersFilePath = path.join(process.cwd(), 'data', 'users.csv');

// Helper to ensure CSV exists
const ensureCSVExists = () => {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, 'email,password,username,fullname\n');
    }
};

export const personalTickets = async () => {

    const csvData = fs.readFileSync(usersFilePath, 'utf8');
    const users = parse(csvData, {
        columns: true,
        skip_empty_lines: true,
    });
}

export const createTicket = async (user: any, description: string, title: string, department: string) => {

    try {
        ensureCSVExists();
        const newUser = `\n${user?.email},${user?.password},${user?.username},${user?.fullname},${description},${title},${department}`;
        fs.appendFileSync(usersFilePath, newUser);

        console.log("User added to CSV successfully!");
        return { success: true };
    } catch (error) {
        console.error("Error during signup:", error);
        return { success: false, error };
    }
}