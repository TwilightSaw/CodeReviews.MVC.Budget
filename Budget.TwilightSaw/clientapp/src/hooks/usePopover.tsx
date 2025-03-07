import { useState, useEffect } from "react";

export function usePopover<T>() {
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

    function openPopover(e: React.MouseEvent<HTMLElement>, data: T | null) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const offsetX = 200;
        const offsetY = 120;
        const top = rect.top + window.scrollY - offsetY;
        const left = rect.right + window.scrollX - offsetX;
        const backgroundColor = getComputedStyle(button).backgroundColor;

        setPopoverState({
            visible: true,
            color: backgroundColor,
            data,
            position: { top, left },
        });
    }

    function closePopover() {
        console.log("Закриваємо поповер...");
        setPopoverState((prev) => ({ ...prev, visible: false }));
    }

    // Закриття поповера при кліку поза його межами
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        const handleDocumentClick = (e: MouseEvent) => {
            const target = e.target as Element;
            const popoverEl = document.getElementById("g");

            if (popoverEl && !popoverEl.contains(target)) {
                console.log("Клік поза поповером -> Закриваємо через 200мс");
                timer = setTimeout(() => {
                    closePopover();
                }, 200);
            }
        };

        if (popoverState.visible) {
            // Додаємо обробник події після короткої затримки, щоб уникнути моментального закриття
            timer = setTimeout(() => {
                document.addEventListener("click", handleDocumentClick);
            }, 10);
        }

        return () => {
            clearTimeout(timer);
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [popoverState.visible]);

    return { popoverState, openPopover, closePopover };
}
