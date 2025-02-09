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
            const listContainer = document.createElement("div");



            const listItem = document.createElement("button");
            listItem.setAttribute("id", "block");
            listItem.style.backgroundColor = getRandomColor();
            listItem.classList.add("block");
            listItem.textContent = category?.name || "Without name";


            const listDeleteItem = document.createElement("button");
           
            listDeleteItem.textContent = "x";


            listContainer.appendChild(listItem);
            listContainer.appendChild(listDeleteItem);
            listFirstItem.appendChild(listContainer);
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
): void {
    const existingPopover = document.getElementById("popover");
    if (existingPopover) {
        existingPopover.remove();
    }

    const popover = document.createElement("div");
    popover.id = "popover";
    popover.classList.add("popover"); 

    const rect = button.getBoundingClientRect();
    const offsetX = 5;
    const offsetY = 50;
    popover.style.top = `${rect.top + window.scrollY - offsetY}px`;
    popover.style.left = `${rect.right + window.scrollX - offsetX}px`;


    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "persona-dialog");
    svg.setAttribute("viewBox", "0 0 500 200");

    const defs = document.createElementNS(svgNS, "defs");
    const filter = createSvgElement("filter", {
        id: "outerStroke",
        filterUnits: "userSpaceOnUse"
    });
    filter.appendChild(
        createSvgElement("feMorphology", {
            in: "SourceAlpha",
            operator: "dilate",
            radius: "3",
            result: "dilated"
        })
    );
    filter.appendChild(
        createSvgElement("feComposite", {
            in: "dilated",
            in2: "SourceAlpha",
            operator: "out",
            result: "outline"
        })
    );
    filter.appendChild(
        createSvgElement("feFlood", {
            "flood-color": "black",
            result: "floodColor"
        })
    );
    filter.appendChild(
        createSvgElement("feComposite", {
            in: "floodColor",
            in2: "outline",
            operator: "in",
            result: "coloredOutline"
        })
    );
    const feMerge = createSvgElement("feMerge");
    feMerge.appendChild(createSvgElement("feMergeNode", { in: "coloredOutline" }));
    feMerge.appendChild(createSvgElement("feMergeNode", { in: "SourceGraphic" }));
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    svg.appendChild(defs);


    const group = createSvgElement("g", {
        transform: "scale(0.75) translate(10,50)",
        filter: "url(#outerStroke)"
    });


    group.appendChild(
        createSvgElement("polygon", {
            points: "50,90 460,20 470,200 50,180",
            fill: color
        })
    );


    const foreignObject = createSvgElement("foreignObject", {
        x: "90",
        y: "110",
        width: "400",
        height: "100"
    });
    const formContainer = document.createElement("div");
    formContainer.style.width = "100%";
    formContainer.style.height = "100%";
    formContainer.style.display = "flex";
    formContainer.style.alignItems = "center";
    formContainer.style.justifyContent = "space-between";

    formContainer.innerHTML = `
    <form id="popup-form">
      <input type="text" id="fname" name="fname"  autocomplete="off" placeholder="${content ? content.name : "Add category"}" required
            />
      <button type="submit" >&gt;</button>
    </form>
  `;
    foreignObject.appendChild(formContainer);
    group.appendChild(foreignObject);

    group.appendChild(
        createSvgElement("polygon", {
            points: "-10,150 60,200 120,150 0,130",
            fill: color
        })
    );
    group.appendChild(
        createSvgElement("polygon", {
            points: "-20,125 -25,170 -3,170 15,134",
            fill: color
        })
    );
    group.appendChild(
        createSvgElement("polygon", {
            points: "-50,160 -7,180 2,160",
            fill: color
        })
    );

    svg.appendChild(group);
    popover.appendChild(svg);
    document.body.appendChild(popover);


    requestAnimationFrame(() => {
        popover.classList.add("persona-appear");
    });

    button.classList.add("inactive");

  
    const onDocumentClick = (e: MouseEvent) => {
        if (!popover.contains(e.target as Node)) {
            closePopover(button);
            document.removeEventListener("click", onDocumentClick);
        }
    };
    setTimeout(() => {
        document.addEventListener("click", onDocumentClick);
    }, 10);


    const form = popover.querySelector("#popup-form") as HTMLFormElement;
    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            if (button.classList.contains("block")) {
                const response = await fetch(`/api/category/${content?.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ Name: data.fname })
                });
                if (!response.ok) throw new Error("Failed to submit form");
                await response.json();
                closePopover(button);
                fetchCategories();
            } else {
                const response = await fetch(`/api/category`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ Name: data.fname })
                });
                if (!response.ok) throw new Error("Failed to submit form");
                await response.json();
                closePopover(button);
                fetchCategories();
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    });
}

function closePopover(button: HTMLButtonElement): void {
    const popover = document.getElementById("popover");
    if (popover) {
        
        popover.classList.remove("persona-appear");
        popover.classList.add("persona-disappear");

 
        setTimeout(() => {
            popover.remove();
            button.classList.remove("inactive");
        }, 200);
    }
}

function createSvgElement(
    elementName: string,
    attributes?: { [key: string]: string }
): SVGElement {
    const svgNS = "http://www.w3.org/2000/svg";
    const elem = document.createElementNS(svgNS, elementName);
    if (attributes) {
        for (const [attr, value] of Object.entries(attributes)) {
            elem.setAttribute(attr, value);
        }
    }
    return elem;
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
