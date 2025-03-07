import { useState, useEffect } from "react";
import { Transaction } from "../models/Models";

const API_URL = "https://localhost:7202/api/transaction";

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [groupedTransactions, setGroupedTransactions] = useState<{ [date: string]: Transaction[] }>({});

    async function fetchTransactions() {
        try {
            const response = await fetch(API_URL);
            const data: Transaction[] = await response.json();
            setTransactions(data);
            groupTransactionsByDate(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }

    async function addTransaction(transaction: Transaction) {
        try {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transaction),
            });
            fetchTransactions();
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    }

    function groupTransactionsByDate(transactions: Transaction[]) {
        const grouped: { [date: string]: Transaction[] } = {};
        transactions.forEach((tran) => {
            const dateStr = new Date(tran.dateTime).toLocaleString("en-EN", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            if (!grouped[dateStr]) grouped[dateStr] = [];
            grouped[dateStr].push(tran);
        });
        setGroupedTransactions(grouped);
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    return { transactions, groupedTransactions, fetchTransactions, addTransaction };
}