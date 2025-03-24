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
                zoom: 0.5,
            }}
        >
            <svg id="g" width="640" height="480" xmlns="http://www.w3.org/2000/svg">
                <g className="layer">
                    <title>Layer 1</title>
                    <path
                        d="m331.6,13.4c-20,77 -21,78 -21.6,77.6c-0.6,-0.4 96.6,9.4 96,9c-0.6,-0.4 -69.4,35.4 -70,35c-0.6,-0.4 -289.4,-57.6 -290,-58c-0.6,-0.4 23.6,379.4 23,379c-0.6,-0.4 540.6,-36.6 540.6,-37.6c0,-1 -31,-318 -31.6,-318.4c-0.6,-0.4 -58.4,11.4 -59,11c-0.6,-0.4 -3.4,-39.6 -4,-40c-0.6,-0.4 -172.4,-0.6 -173,-1c-0.6,-0.4 -10.4,-56.6 -10.4,-56.6z"
                        fill="#ededed"
                        stroke="#000000"
                        strokeWidth="5"
                    />
                </g>
                <foreignObject x="90" y="150" width="450" height="300">
                    <form
                        id="popup-2-form"
                        onSubmit={handleSubmit}
                        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                    >
                        <input
                            type="text"
                            id="ftext"
                            name="name"
                            autoComplete="off"
                            placeholder="Transaction name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            id="fvalue"
                            name="finance"
                            autoComplete="off"
                            placeholder="Amount"
                            required
                            value={formData.amount}
                            onChange={handleChange}
                        />
                        <input
                            type="datetime-local"
                            id="fdate"
                            name="dateTime"
                            required
                            value={new Date(formData.dateTime).toISOString().slice(0, 16)}
                            onChange={handleChange}
                        />
                        <select
                            id="fcategory"
                            name="categoryId"
                            required
                            value={formData.categoryId}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select category
                            </option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </form>
                </foreignObject>

                {/* 👇 SVG-кнопка "Save", що працює як submit */}
                <>
                    <polygon points="527,187 633,177 633,223 532,233" fill="black" />
                    <polygon
                        points="530,190 630,180 630,220 535,230"
                        fill="#67e76f"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            const form = document.getElementById("popup-2-form");
                            if (form) {
                                form.dispatchEvent(
                                    new Event("submit", { cancelable: true, bubbles: true })
                                );
                            }
                        }}
                    />
                    <text
                        x="580"
                        y="210"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="black"
                        fontSize="20"
                        fontWeight="bold"
                        pointerEvents="none"
                    >
                        Save
                    </text>
                </>
               
                {transaction && (
                    <>
                        <polygon points="527,127 633,117 633,163 532,173" fill="black" />
                        <polygon
                            points="530,130 630,120 630,160 535,170"
                            fill="#e76c6f"
                            style={{ cursor: "pointer" }}
                            onClick={async (e) => {
                                e.stopPropagation();
                                await onDelete();
                            }}
                        />
                        <text
                            x="580"
                            y="150"
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
              
            </svg>
        </div>
    );
};

export default TransactionPopover;
