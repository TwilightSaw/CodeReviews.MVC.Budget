var _a;
let categories = [];
window.onload = fetchCategories;
async function fetchCategories() {
    const response = await fetch("/api/category");
    const category = await response.json();
    categories = category;
    console.log(category);
    const list = document.getElementById("header");
    console.log(list);
    if (!list) {
        console.error("Element with ID 'header' not found");
        return;
    }
    if (list) {
        list.innerHTML = "";
        const listFirstItem = document.createElement("div");
        listFirstItem.classList.add("categories");
        category.forEach((category) => {
            const listItem = document.createElement("button");
            listItem.setAttribute("id", "block");
            listItem.style.backgroundColor = getRandomColor();
            listItem.classList.add("block");
            listItem.textContent = (category === null || category === void 0 ? void 0 : category.name) || "Without name";
            listFirstItem.appendChild(listItem);
            list.appendChild(listFirstItem);
        });
        const listItem = document.createElement("button");
        listItem.classList.add("block-add");
        listItem.textContent = "+";
        listFirstItem.appendChild(listItem);
    }
}
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 30;
    const lightness = 80;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
function createPopover(color, button, content) {
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
          <input type="text" id="fname" name="fname" placeholder="${content.name}" required>
          <button type="submit">Submit</button>
        </form>
      </div>
    `;
    document.body.appendChild(popover);
    popover.style.backgroundColor = color;
    const arrow = popover.querySelector(".popover-arrow");
    if (arrow) {
        arrow.style.backgroundColor = color;
    }
    const rect = button.getBoundingClientRect();
    const offsetX = 5; // Відступ між кнопкою і popover по горизонталі
    const offsetY = 10; // Відступ між кнопкою і popover по вертикалі
    // Встановлюємо початкову позицію
    popover.style.top = `${rect.top + window.scrollY - 50}px`; // Починаємо над кнопкою
    popover.style.left = `${rect.left + window.scrollX - 10}px`;
    // Невеликий таймаут, щоб анімація спрацювала після додавання в DOM
    setTimeout(() => {
        popover.classList.remove("popover-hidden");
        popover.classList.add("popover-visible");
        popover.style.top = `${rect.top + window.scrollY + offsetY}px`;
        popover.style.left = `${rect.right + window.scrollX + offsetX}px`;
    }, 10);
    setTimeout(() => {
        document.addEventListener("click", closePopover);
        const form = document.getElementById("popup-form");
        form === null || form === void 0 ? void 0 : form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            try {
                const response = await fetch(`/api/category/${content.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Name: data.fname }),
                });
                if (!response.ok)
                    throw new Error("Failed to submit form");
                const result = await response.json();
                popover.classList.remove("popover-visible");
                popover.classList.add("popover-hidden");
                setTimeout(() => popover.remove(), 300); //
                fetchCategories();
            }
            catch (error) {
                console.error("Error submitting form:", error);
            }
        });
    }, 10);
}
function closePopover(event) {
    const popover = document.getElementById("popover");
    if (popover && !popover.contains(event.target)) {
        popover.remove();
        document.removeEventListener("click", closePopover);
    }
}
(_a = document.getElementById("header")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("block")) {
        const backgroundColor = getComputedStyle(target).backgroundColor;
        const category = categories.find(c => c.name === target.textContent);
        if (category) {
            createPopover(backgroundColor, target, category);
        }
        else {
            console.error("Category not found for:", target.textContent);
        }
        event.stopPropagation();
    }
});
export {};
//# sourceMappingURL=app.js.map