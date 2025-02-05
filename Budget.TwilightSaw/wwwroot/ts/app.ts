import { Category, Transaction } from "./Models.js";

let categories: Category[] = [];
window.onload = fetchCategories;
fetchDatas();
fetchTransactions();

async function fetchCategories(): Promise<void> {
    const response = await fetch("/api/category");
    const category: Category[] = await response.json();
    categories = category;
    console.log(category);

    const list = document.getElementById("header")!;
    console.log(list);

    if (!list) {
        console.error("Element with ID 'header' not found");
        return;
    }
    if (list) {
        list.innerHTML = "";
        const listFirstItem = document.createElement("div");
        listFirstItem.classList.add("categories");
        category.forEach((category: Category) => {
            const listItem = document.createElement("button");
            listItem.setAttribute("id", "block");
            listItem.style.backgroundColor = getRandomColor();
            listItem.classList.add("block");
            listItem.textContent = category?.name || "Without name";
            listFirstItem.appendChild(listItem);
            list.appendChild(listFirstItem);
        });
        const listItem = document.createElement("button");
        listItem.classList.add("block-add");
        listItem.textContent = "+";
        listFirstItem.appendChild(listItem);
    }
}
function getRandomColor(): string {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 30;
    const lightness = 80;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function createPopover(
    color: string,
    button: HTMLButtonElement,
    content: Category | null
) {
    const existingPopover = document.getElementById("popover");
    if (existingPopover) {
        existingPopover.remove();
    }

    const popover = document.createElement("div");
    popover.id = "popover";
    popover.classList.add("popover", "popover-hidden");

    popover.innerHTML = `
      <div class="popover-arrow"></div>
      <div class="popover-content">
        <form id="popup-form">
          <input type="text" id="fname" name="fname" placeholder="${content ? content.name : "Add category"}" required>
          <button type="submit">></button>
        </form>
      </div>
    `;

    document.body.appendChild(popover);
    popover.style.backgroundColor = color;
    const arrow = popover.querySelector(".popover-arrow") as HTMLElement;
    if (arrow) {
        arrow.style.backgroundColor = color;
    }

    const rect = button.getBoundingClientRect();
    const offsetX = 5;
    const offsetY = 10;

    popover.style.top = `${rect.top + window.scrollY - 50}px`;
    popover.style.left = `${rect.left + window.scrollX - 10}px`;

    setTimeout(() => {
        popover.classList.remove("popover-hidden");
        popover.classList.add("popover-visible");
        button.classList.add("inactive");

        popover.style.top = `${rect.top + window.scrollY + offsetY}px`;
        popover.style.left = `${rect.right + window.scrollX + offsetX}px`;
    }, 10);

    setTimeout(() => {
        document.addEventListener("click", (e) => closePopover(e, button));
        const form = document.getElementById("popup-form") as HTMLFormElement;

        form?.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                if (button.classList.contains("block")) {
                    const response = await fetch(
                        `/api/category/${content?.id}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ Name: data.fname }),
                        }
                    );

                    if (!response.ok) throw new Error("Failed to submit form");

                    const result = await response.json();

                    popover.classList.remove("popover-visible");
                    popover.classList.add("popover-hidden");
                    setTimeout(() => popover.remove(), 300);
                    fetchCategories();
                } else {
                    const response = await fetch(`/api/category`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ Name: data.fname }),
                    });

                    if (!response.ok) throw new Error("Failed to submit form");

                    const result = await response.json();

                    popover.classList.remove("popover-visible");
                    popover.classList.add("popover-hidden");
                    setTimeout(() => popover.remove(), 300);
                    fetchCategories();
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        });
    }, 10);
}

function closePopover(event: MouseEvent, button: HTMLButtonElement) {
    const popover = document.getElementById("popover");
    if (popover && !popover.contains(event.target as Node)) {
        popover.classList.remove("popover-visible");
        popover.classList.add("popover-hidden");
        button.classList.remove("inactive");
        setTimeout(() => popover.remove(), 300);
        document.removeEventListener("click", (e) => closePopover(e, button));
    }
}

document.getElementById("header")?.addEventListener("click", (event) => {
    const target = event.target as HTMLButtonElement;

    if (
        target.classList.contains("block") ||
        target.classList.contains("block-add")
    ) {
        const backgroundColor = getComputedStyle(target).backgroundColor;
        let category = null;

        if (target.classList.contains("block")) {
            category = categories.find((c) => c.name === target.textContent);
            if (!category) {
                console.error("Category not found for:", target.textContent);
                return;
            }
        }

        createPopover(backgroundColor, target, category);
        event.stopPropagation();
    }
});

async function fetchTransactions(): Promise<void> {
    const response = await fetch("/api/transaction");
    const transactions: Transaction[] = await response.json();

    const responseCategory = await fetch("/api/category");
    const category: Category[] = await responseCategory.json();

    const dataElement = document.getElementById("transactions");
    if (!dataElement) return;

    const childElements = dataElement.querySelectorAll(".transaction-line");

    childElements.forEach((element) => {
        const blockDate = element.textContent?.trim();
        console.log("Checking block:", blockDate);

        transactions.forEach((transaction) => {
            const transactionDate = new Date(transaction.dateTime)
                .toLocaleString("en-EN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
                .trim();

            console.log(
                `Comparing: ${transactionDate} with block: ${blockDate}`
            );

            if (blockDate === transactionDate) {
                console.log(
                    "✅ Match found! Adding transaction:",
                    transaction.name
                );

                const data = category.find(
                    (c) => c.id === transaction.categoryId
                );

                const transactionItem = document.createElement("div");
                transactionItem.classList.add("transaction-list");

                const transactionName = document.createElement("div");
                transactionName.classList.add("transaction-line");
                transactionName.textContent = `${transaction.name}`;

                const transactionPrice = document.createElement("div");
                transactionPrice.classList.add("transaction-line", "price");
                transactionPrice.textContent = `${transaction.finance}`;
                
                transactionItem.appendChild(transactionName);
                transactionItem.appendChild(transactionPrice);
                element.appendChild(transactionItem);
            }
        });
    });
}

async function fetchDatas(): Promise<void> {
    const response = await fetch("/api/transaction");
    const transaction: Transaction[] = await response.json();
    const datas: string[] = [];
    transaction.forEach((transactions: Transaction) => {
        const date = new Date(transactions.dateTime);
        const stringDate = date.toLocaleString("en-EN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        if (!datas.includes(stringDate)) {
            datas.push(stringDate);
        }
    });
    console.log("Datas after processing:", datas);

    const list = document.getElementById("transactions")!;
    console.log(list);

    if (!list) {
        console.error("Element with ID 'header' not found");
        return;
    }
    if (list) {
        list.innerHTML = "";

        datas.forEach((datas: string) => {
            const listItem = document.createElement("div");
            listItem.setAttribute("id", "transaction-line");
            listItem.classList.add("transaction-line");

            const listData = document.createElement("div");
            listData.setAttribute("id", "transaction-data");
            listData.classList.add("transaction-data");
            listData.textContent = datas;

            listItem.appendChild(listData);
            list.appendChild(listItem);
        });
    }
}
