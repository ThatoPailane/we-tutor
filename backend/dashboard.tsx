import { db } from '@/lib/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const commonTickets = async () => {
    const tickersCollRef = collection(db, 'common-tickets');

    const snapshot = await getDocs(tickersCollRef);

    return snapshot;
}
