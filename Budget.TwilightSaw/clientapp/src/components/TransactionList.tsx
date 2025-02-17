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
    return (
        <div id="transactions">
            {Object.keys(groupedTransactions).map((date) => (
                <div key={date} className="transaction-line">
                    <div id="transaction-data" className="transaction-data">
                        {date}
                    </div>
                    {groupedTransactions[date].map((tran) => {
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