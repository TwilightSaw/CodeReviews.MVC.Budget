import React, { useEffect, useState } from "react";
import { Category } from "../models/Models";

type CategoryListProps = {
    categories: Category[];
    onCategoryClick: (
        e: React.MouseEvent<HTMLButtonElement>,
        category: Category | null
    ) => void;
};

// Генерація випадкового кольору (перейменовано в camelCase)
const getRandomColor = (): string => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 30;
    const lightness = 80;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategoryClick }) => {
    // ✅ Зберігаємо кольори у стані, щоб вони не змінювалися при ререндері
    const [colors, setColors] = useState<Record<string, string>>({});

    useEffect(() => {
        // ✅ Якщо кольори ще не були згенеровані, генеруємо їх
        setColors((prevColors) => {
            if (Object.keys(prevColors).length === 0) {
                const initialColors = categories.reduce((acc, cat) => {
                    acc[cat.id] = getRandomColor();
                    return acc;
                }, {} as Record<string, string>);

                return initialColors;
            }
            return prevColors;
        });
    }, [categories]); // Виконується лише при першому завантаженні категорій

    return (
        <div className="categories">
            {categories.map((cat) => (
                <div key={cat.id}>
                    <button
                        id="block"
                        className="block"
                        style={{ backgroundColor: colors[cat.id] || "gray" }} // Якщо кольору ще немає, буде "gray"
                        onClick={(e) => onCategoryClick(e, cat)}
                    >
                        {cat.name || "Without name"}
                    </button>
                </div>
            ))}

            <button className="block-add" onClick={(e) => onCategoryClick(e, null)}>
                +
            </button>
        </div>
    );
};

export default CategoryList;
