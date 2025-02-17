import React from "react";
import { Category } from "../models/Models";

type CategoryListProps = {
    categories: Category[];
    getRandomColor: () => string;
    onCategoryClick: (
        e: React.MouseEvent<HTMLButtonElement>,
        category: Category | null
    ) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({
    categories,
    getRandomColor,
    onCategoryClick,
}) => {
    return (     
            <div className="categories">
                {categories.map((cat) => (
                    <div key={cat.id}>
                        <button
                            id="block"
                            className="block"
                            style={{ backgroundColor: getRandomColor() }}
                            onClick={(e) => onCategoryClick(e, cat)}
                        >
                            {cat.name || "Without name"}
                        </button>
                    </div>
                ))}
                <button
                    className="block-add"
                    onClick={(e) => onCategoryClick(e, null)}
                >
                    +
                </button>
            </div>
    );
};

export default CategoryList;