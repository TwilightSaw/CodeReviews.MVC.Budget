import { useState, useEffect } from "react";
import { Category } from "../models/Models";

const API_URL = "https://localhost:7202/api/category";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);

    async function fetchCategories() {
        try {
            const response = await fetch(API_URL);
            const data: Category[] = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    async function addCategory(name: string) {
        try {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Name: name }),
            });
            fetchCategories();
        } catch (error) {
            console.error("Error adding category:", error);
        }
    }

    async function updateCategory(id: number, name: string) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Name: name }),
            });
            fetchCategories();
        } catch (error) {
            console.error("Error updating category:", error);
        }
    }

    async function deleteCategory(id: number) {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, fetchCategories, addCategory, updateCategory, deleteCategory };
}