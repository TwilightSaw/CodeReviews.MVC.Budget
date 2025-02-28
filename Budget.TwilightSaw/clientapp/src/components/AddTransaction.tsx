import React, { useState } from "react";
import { Category, Transaction } from "../models/Models";

type TransactionListProps = {
    categories: Category[];
    onSubmit: (data: Transaction) => void;
};

const TransactionList: React.FC<TransactionListProps> = ({ categories, onSubmit }) => {
    // Стан для полів форми
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState<number | "">(""); // Початково без категорії
    const [finance, setFinance] = useState<number | "">("");
    const [dateTime, setDateTime] = useState(""); // Використовуємо Date для коректного формату

    // Обробка відправки форми
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!categoryId || !finance) return; // Забороняємо відправку без категорії чи суми

        const newTransaction: Transaction = {
            id: undefined, // ID буде згенерований бекендом
            name,
            dateTime,
            finance: Number(finance),
            categoryId: Number(categoryId),
        };

        onSubmit(newTransaction);

        // Очистка форми після відправки
        setName("");
        setCategoryId("");
        setFinance("");
        setDateTime("");
    };

    return (
        <div className= "transactionList" id="transactionList">
            <form id="transaction-form" onSubmit={handleSubmit}>
                {/* Поле для назви транзакції */}
                <input
                    type="text"
                    placeholder="Transaction name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                {/* Поле для вибору категорії */}
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    required
                >
                    <option value="" disabled>
                        Categories
                    </option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                {/* Поле для введення суми */}
                <input
                    type="number"
                    placeholder="Transaction amount"
                    value={finance}
                    onChange={(e) => setFinance(e.target.value ? Number(e.target.value) : "")}
                    required
                />

                {/* Поле для вибору дати */}
                <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                />

                {/* Кнопка відправки - вимкнена, якщо категорій немає */}
                <button type="submit" disabled={!categoryId}>
                    Add
                </button>
            </form>

            {/* Якщо категорій немає, виводимо попередження */}
            {categories.length === 0 && <p style={{ color: "red" }}>Спочатку створіть категорію!</p>}
        </div>
    );
};

export default TransactionList;
