import React, { useState, useEffect } from "react";
import { Category, Transaction } from "../../clientapp/src/models/Models";
import CategoryList from "./components/CategoryList";
import TransactionList from "./components/TransactionList";
import Popover from "./components/Popover";

const App: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [groupedTransactions, setGroupedTransactions] = useState<{
        [date: string]: Transaction[];
    }>({});
    const [popoverState, setPopoverState] = useState<{
        visible: boolean;
        color: string;
        category: Category | null;
        position: { top: number; left: number };
    }>({
        visible: false,
        color: "",
        category: null,
        position: { top: 0, left: 0 },
    });

    // Функція для отримання випадкового кольору
    function getRandomColor(): string {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 30;
        const lightness = 80;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    // Завантаження категорій
    async function fetchCategories() {
        try {
            const response = await fetch("https://localhost:7202/api/category");
            const data: Category[] = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    // Завантаження транзакцій та їх групування за датою
    async function fetchTransactions() {
        try {
            const response = await fetch("https://localhost:7202/api/transaction");
            const data: Transaction[] = await response.json();
            setTransactions(data);
            groupTransactionsByDate(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }

    // Групування транзакцій за датою
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
        fetchCategories();
        fetchTransactions();
    }, []);

    // Обробка кліку по категорії або кнопці "додати"
    const handleCategoryClick = (
        e: React.MouseEvent<HTMLButtonElement>,
        category: Category | null
    ) => {
        console.log("Натиснуто категорію", category);

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const offsetX = 30;
        const offsetY = 90;
        const top = rect.top + window.scrollY - offsetY;
        const left = rect.right + window.scrollX - offsetX;
        const backgroundColor = getComputedStyle(button).backgroundColor;

        setPopoverState({
            visible: true,
            color: backgroundColor,
            category: category,
            position: { top, left },
        });
        console.log("popoverState після оновлення:", {
            visible: true,
            color: backgroundColor,
            category,
            position: { top, left },
        });
    };

    // Закриття Popover
    const closePopover = () => {
        setPopoverState((prev) => ({ ...prev, visible: false }));

    };

    // Обробка сабміту форми (редагування або створення категорії)
    const handleFormSubmit = async (data: { fname: string }) => {
        try {
            if (popoverState.category) {
                // Редагування існуючої категорії
                const response = await fetch(
                    `https://localhost:7202/api/category/${popoverState.category.id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ Name: data.fname }),
                    }
                );
                if (!response.ok) throw new Error("Failed to update category");
            } else {
                // Додавання нової категорії
                const response = await fetch(`https://localhost:7202/api/category`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ Name: data.fname }),
                });
                if (!response.ok) throw new Error("Failed to create category");
            }
            closePopover();
            fetchCategories();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    // Обробка видалення категорії
    const handleDeleteCategory = async () => {
        if (popoverState.category?.id) {
            try {
                const response = await fetch(
                    `https://localhost:7202/api/category/${popoverState.category.id}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (!response.ok) throw new Error("Failed to delete category");
                closePopover();
                fetchCategories();
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    // Закриття Popover при кліку поза його межами
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const handleDocumentClick = (e: MouseEvent) => {
            const target = e.target as Element;
            const popoverEl = document.getElementById("g");
            if (popoverEl && !popoverEl.contains(target)) {
                console.log("Document click, закриваємо поповер");
                timer = setTimeout(() => {
                    closePopover();
                }, 200);
            }
        };

        if (popoverState.visible) {
            // Відкладання додавання обробника, щоб він не спіймав початкову подію
            timer = setTimeout(() => {
                document.addEventListener("click", handleDocumentClick);
            }, 10);
        }
        return () => {
            clearTimeout(timer);
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [popoverState.visible]);

    return (
        <div className="main">
        <div>
            <CategoryList
                categories={categories}
                getRandomColor={getRandomColor}
                onCategoryClick={handleCategoryClick}
            />

           

            {popoverState.visible && (
                <Popover
                    color={popoverState.color}
                    category={popoverState.category}
                        position={popoverState.position}
                        visible={popoverState.visible}
                    onClose={closePopover}
                    onSubmit={handleFormSubmit}
                    onDelete={handleDeleteCategory}
                />
            )}
        </div>
        <div>
         <TransactionList
                groupedTransactions={groupedTransactions}
                categories={categories}
            />
            </div>
        </div>
    );
};

export default App;