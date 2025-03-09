import React, { useState, useEffect } from "react";
import { Category, Transaction } from "../../models/Models";

type TransactionPopoverProps = {
    color: string;
    transaction: Transaction | null;
    categories: Category[];
    position: { top: number; left: number };
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: Transaction) => Promise<void>;
    onDelete: () => Promise<void>;
};

const TransactionPopover: React.FC<TransactionPopoverProps> = ({
    color,
    transaction,
    categories,
    position,
    visible,
    onClose,
    onSubmit,
    onDelete,
}) => {
    const [formData, setFormData] = useState<Transaction>({
        id: 0,
        name: "",
        finance: 0,
        dateTime: new Date().toISOString(),
        categoryId: 0,
    });

    // Заповнюємо дані при відкритті поповера
    useEffect(() => {
        if (transaction) {
            setFormData(transaction);
        }
    }, [transaction]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <div
            id="popover"
            className={`popover ${visible ? "persona-appear" : "persona-disappear"}`}
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
            }}
        >
            <svg className="persona-dialog" viewBox="0 0 500 250">
                <g id="g" transform="scale(0.75) translate(10,50)">
                    <polygon points="50,90 460,20 470,230 50,210" fill={color} />
                    <foreignObject x="90" y="90" width="400" height="160">
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <input
                                type="text"
                                name="name"
                                autoComplete="off"
                                placeholder="Transaction name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="amount"
                                autoComplete="off"
                                placeholder="Amount"
                                required
                                value={formData.amount}
                                onChange={handleChange}
                            />
                            <input
                                type="datetime-local"
                                name="dateTime"
                                required
                                value={new Date(formData.dateTime).toISOString().slice(0, 16)}
                                onChange={handleChange}
                            />
                            <select name="categoryId" required value={formData.categoryId} onChange={handleChange}>
                                <option value="" disabled>
                                    Select category
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <button type="submit">Save</button>
                        </form>
                    </foreignObject>

                    {transaction && (
                        <>
                            <polygon points="417,57 463,52 466,98 422,103" fill="black" />
                            <polygon
                                points="420,60 520,50 520,90 425,100"
                                fill="#e76c6f"
                                style={{ cursor: "pointer" }}
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    await onDelete();
                                }}
                            />
                            <text
                                x="470"
                                y="78"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="black"
                                fontSize="20"
                                fontWeight="bold"
                                pointerEvents="none"
                            >
                                Delete
                            </text>
                        </>
                    )}
                    <polygon points="-10,150 60,200 120,150 0,130" fill={color} />
                    <polygon points="-20,125 -25,170 -3,170 15,134" fill={color} />
                    <polygon points="-50,160 -7,180 2,160" fill={color} />
                </g>
            </svg>
        </div>
    );
};

export default TransactionPopover;
