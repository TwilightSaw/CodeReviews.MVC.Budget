﻿import React from "react";
import { Category, Transaction } from "../models/Models";

type TransactionListProps = {
    groupedTransactions: { [date: string]: Transaction[] };
    categories: Category[];
    onCategoryClick: (
        e: React.MouseEvent<HTMLDivElement>,
        transaction: Transaction | null
    ) => void;
};



const TransactionList: React.FC<TransactionListProps> = ({
    groupedTransactions,
    categories,
    onCategoryClick
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
                        const category = categories.find(c => c.id === tran.categoryId)
                       
                        return (
                            <div
                                onClick={(e) => onCategoryClick(e, tran)}
                                key={tran.id} className="transaction-list">

                                <div className="transaction-line category">{category?.name || "Unknown"}</div>
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