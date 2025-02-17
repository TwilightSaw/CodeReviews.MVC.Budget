import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://localhost:7202/api/transaction");
                console.log("Response Status:", response.status); // ✅ Лог статусу відповіді

                const textData = await response.text(); // ✅ Отримуємо raw текст (JSON або HTML)
                console.log("Response Data:", textData); // ✅ Дивимось, що реально повертається

                if (!response.ok) throw new Error("Failed to fetch data");

                const jsonData = JSON.parse(textData); // ✅ Парсимо JSON тільки якщо відповідь коректна
                setData(jsonData);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}