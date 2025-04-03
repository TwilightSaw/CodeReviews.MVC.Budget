import { useState, useEffect } from "react";

export function useTransactionPopover<T>() {
    const [popoverState, setPopoverState] = useState<{
        visible: boolean;
        color: string;
        data: T | null;
        position: { top: number; left: number };
    }>({
        visible: false,
        color: "",
        data: null,
        position: { top: 0, left: 0 },
    });

    const [isAnimating, setIsAnimating] = useState(false);

    function openPopover(e: React.MouseEvent<HTMLElement>, data: T | null) {
        const button = e.currentTarget;
        const backgroundColor = getComputedStyle(button).backgroundColor;

        setPopoverState({
            visible: true,
            color: backgroundColor,
            data,
            position: {
                top: button.offsetTop + button.offsetHeight - 130, // Трохи нижче кнопки
                left: button.offsetLeft + 100, // Трохи правіше кнопки
            },
        });
        setIsAnimating(false);
    }

    function closePopover() {
        setIsAnimating(true); // Запускаємо анімацію закриття

        setTimeout(() => {
            setIsAnimating(false);
            setPopoverState((prev) => ({ ...prev, visible: false })); // Видаляємо з DOM після анімації
            // Скидаємо стан анімації
        }, 300); // 300 мс - це тривалість анімації в CSS

        console.log("Закриваємо поповер...");
    }

    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const target = e.target as Element;
            const popoverEl = document.getElementById("g");

            if (popoverEl && !popoverEl.contains(target)) {
                console.log("Клік поза поповером -> Закриваємо через 300мс");
                closePopover();
            }
        };

        if (popoverState.visible) {
            setTimeout(() => {
                document.addEventListener("click", handleDocumentClick);
            }, 10);
        }

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [popoverState.visible]);

    return { popoverState, isAnimating, openPopover, closePopover };
}
