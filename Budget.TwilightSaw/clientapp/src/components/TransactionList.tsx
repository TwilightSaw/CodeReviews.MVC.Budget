import React from "react";
import { Category, Transaction } from "../models/Models";

type TransactionListProps = {
    groupedTransactions: { [date: string]: Transaction[] };
    categories: Category[];
};



const TransactionList: React.FC<TransactionListProps> = ({
    groupedTransactions,
    categories,
}) => {
    const sortedTransactions = Object.keys(groupedTransactions)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // Спочатку сортуємо дати
        .reduce((acc: { [date: string]: Transaction[] }, date) => {
            acc[date] = groupedTransactions[date].sort((t1, t2) => t2.finance - t1.finance); // Сортуємо транзакції за сумою
            return acc;
        }, {});
    return (
        <div id="transactions">
            {Object.keys(sortedTransactions).map((date) => (
                <div key={date} className="transaction-line">
                    <div id="transaction-data" className="transaction-data">
                        {date}
                    </div>
                    {sortedTransactions[date].map((tran) => {
                        // Знаходимо категорію за ID, якщо потрібно
                        const cat = categories.find((c) => c.id === tran.categoryId);
                        return (
                            <div key={tran.id} className="transaction-list">
                                <div className="transaction-line">{tran.name}</div>
                                <div className="transaction-line price">{tran.finance}</div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default TransactionList;