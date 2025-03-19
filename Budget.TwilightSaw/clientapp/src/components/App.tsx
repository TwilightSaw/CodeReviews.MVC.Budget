import React from "react";
import { Category, Transaction } from "../models/Models";
import CategoryList from "./CategoryList";
import TransactionList from "./TransactionList";
import Popover from "./popovers/Popover";
import TransactionPopover from "./popovers/TransactionPopover";
import AddTransaction from "./AddTransaction";
import Pointer from "./Pointer";
import { useCategories } from "../hooks/useCategories";
import { useTransactions } from "../hooks/useTransactions";
import { usePopover } from "../hooks/usePopover";
import { useTransactionPopover } from "../hooks/useTransactionPopover";

const App: React.FC = () => {
    const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
    const { transactions, groupedTransactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
    const categoryPopover = usePopover<Category>();
    const transactionPopover = useTransactionPopover<Transaction>();

    return (
        <div className="main">
            <div>
                <CategoryList categories={categories} onCategoryClick={categoryPopover.openPopover} />
                <Pointer text={"Transaction types"} png={"pointer.PNG"} />

                {categoryPopover.popoverState.visible || categoryPopover.isAnimating ? (
                    <Popover
                        color={categoryPopover.popoverState.color}
                        category={categoryPopover.popoverState.data}
                        position={categoryPopover.popoverState.position}
                        visible={categoryPopover.popoverState.visible}
                        isAnimating={categoryPopover.isAnimating}  
                        onClose={categoryPopover.closePopover}
                        onSubmit={async (data) => {
                            categoryPopover.closePopover(); // Закриваємо перед викликом API

                            if (categoryPopover.popoverState.data) {
                                await updateCategory(categoryPopover.popoverState.data.id, data.fname);
                            } else {
                                await addCategory(data.fname);
                            }
                        } }


                        onDelete={async () => {
                            categoryPopover.popoverState.data && deleteCategory(categoryPopover.popoverState.data.id);
                            categoryPopover.closePopover();
                        } }                   />
                ): null}
            </div>

            <div>
                <AddTransaction categories={categories} onSubmit={addTransaction} />
            </div>

            <div>
                <TransactionList groupedTransactions={groupedTransactions} categories={categories} onCategoryClick={transactionPopover.openPopover} />
                {transactionPopover.popoverState.visible && (
                    <TransactionPopover
                        color={transactionPopover.popoverState.color}
                        transaction={transactionPopover.popoverState.data}
                        categories={categories}
                        position={transactionPopover.popoverState.position}
                        visible={transactionPopover.popoverState.visible}
                        onClose={transactionPopover.closePopover}
                        onSubmit={async (data) => {
                            transactionPopover.closePopover();
                            console.log("Оновлення транзакції:", data);
                            await updateTransaction(data);
                        }}
                        onDelete={async () => {
                            if (transactionPopover.popoverState.data) {
                                console.log("Видалення транзакції:", transactionPopover.popoverState.data.id);
                                await deleteTransaction(transactionPopover.popoverState.data.id!);
                            }
                            transactionPopover.closePopover();
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
