export function createModal(containerId, color, button, content) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "persona-dialog");
    svg.setAttribute("width", "600");
    svg.setAttribute("height", "200");
    svg.setAttribute("viewBox", "0 0 500 200");
    // --- Створення <defs> та фільтра для зовнішнього контуру ---
    const defs = document.createElementNS(svgNS, "defs");
    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", "outerStroke");
    filter.setAttribute("filterUnits", "userSpaceOnUse");
    // Розширення форми за допомогою feMorphology
    const feMorphology = document.createElementNS(svgNS, "feMorphology");
    feMorphology.setAttribute("in", "SourceAlpha");
    feMorphology.setAttribute("operator", "dilate");
    feMorphology.setAttribute("radius", "3");
    feMorphology.setAttribute("result", "dilated");
    filter.appendChild(feMorphology);
    // Віднімання початкової форми (залишається лише «пояс»)
    const feComposite1 = document.createElementNS(svgNS, "feComposite");
    feComposite1.setAttribute("in", "dilated");
    feComposite1.setAttribute("in2", "SourceAlpha");
    feComposite1.setAttribute("operator", "out");
    feComposite1.setAttribute("result", "outline");
    filter.appendChild(feComposite1);
    // Фарбування контуру у білий колір
    const feFlood = document.createElementNS(svgNS, "feFlood");
    feFlood.setAttribute("flood-color", "white");
    feFlood.setAttribute("result", "floodColor");
    filter.appendChild(feFlood);
    const feComposite2 = document.createElementNS(svgNS, "feComposite");
    feComposite2.setAttribute("in", "floodColor");
    feComposite2.setAttribute("in2", "outline");
    feComposite2.setAttribute("operator", "in");
    feComposite2.setAttribute("result", "coloredOutline");
    filter.appendChild(feComposite2);
    // Об'єднання отриманого контуру з початковою графікою
    const feMerge = document.createElementNS(svgNS, "feMerge");
    const feMergeNode1 = document.createElementNS(svgNS, "feMergeNode");
    feMergeNode1.setAttribute("in", "coloredOutline");
    feMerge.appendChild(feMergeNode1);
    const feMergeNode2 = document.createElementNS(svgNS, "feMergeNode");
    feMergeNode2.setAttribute("in", "SourceGraphic");
    feMerge.appendChild(feMergeNode2);
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    svg.appendChild(defs);
    // --- Створення групи <g> зі змінами (масштаб та зміщення) і застосуванням фільтра ---
    const group = document.createElementNS(svgNS, "g");
    // Спочатку scale(0.5), потім translate(175,50) для коректного розміщення
    group.setAttribute("transform", "scale(0.5) translate(175,50)");
    group.setAttribute("filter", "url(#outerStroke)");
    // Основна чорна область (полігон)
    const polygonMain = document.createElementNS(svgNS, "polygon");
    polygonMain.setAttribute("points", "50,90 460,20 470,200 50,180");
    polygonMain.setAttribute("fill", "black");
    group.appendChild(polygonMain);
    // Основний текст
    const text = document.createElementNS(svgNS, "text");
    text.innerHTML = `<form id="popup-form">
          <input type="text" id="fname" name="fname" placeholder="${content ? content.name : "Add category"}" required>
          <button type="submit">></button>
        </form>
    `;
    text.setAttribute("x", "90");
    text.setAttribute("y", "130");
    text.setAttribute("fill", "white");
    text.setAttribute("font-family", "Poiret One");
    text.setAttribute("font-weight", "bold");
    text.setAttribute("font-size", "22");
    group.appendChild(text);
    // Ліва "блискавка" – перший полігон
    const lightning1 = document.createElementNS(svgNS, "polygon");
    lightning1.setAttribute("points", "-10,150 60,200 120,150 0,130");
    lightning1.setAttribute("fill", "black");
    group.appendChild(lightning1);
    // Ліва "блискавка" – другий полігон
    const lightning2 = document.createElementNS(svgNS, "polygon");
    lightning2.setAttribute("points", "-20,125 -25,170 -3,170 15,134");
    lightning2.setAttribute("fill", "black");
    group.appendChild(lightning2);
    // Ліва "блискавка" – третій полігон
    const lightning3 = document.createElementNS(svgNS, "polygon");
    lightning3.setAttribute("points", "-50,160 -7,180 2,160");
    lightning3.setAttribute("fill", "black");
    group.appendChild(lightning3);
    svg.appendChild(group);
    // Додаємо SVG до контейнера з id, який передано у параметрі
    const container = document.getElementById(containerId);
    if (container) {
        container.appendChild(svg);
    }
    else {
        console.error(`Контейнер з id "${containerId}" не знайдено.`);
    }
}
//# sourceMappingURL=p-modal.js.map