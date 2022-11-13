function showTexts() {
    let show = document.getElementById("texts_container");
    if (show.style.display === "none") {
        show.removeAttribute("style");
    } else {
        show.style.display = "none";
    }
}

function showImages() {
    let show = document.getElementById("images_container");
    if (show.style.display === "none") {
        show.removeAttribute("style");
    } else {
        show.style.display = "none";
    }
}

function showShapes() {
    let show = document.getElementById("shapes_container");
    if (show.style.display === "none") {
        show.removeAttribute("style");
    } else {
        show.style.display = "none";
    }
}

function showLists() {
    let show = document.getElementById("lists_container");
    if (show.style.display === "none") {
        show.removeAttribute("style");
    } else {
        show.style.display = "none";
    }
}

function showButtons() {
    let show = document.getElementById("buttons_container");
    if (show.style.display === "none") {
        show.removeAttribute("style");
    } else {
        show.style.display = "none";
    }
}

let cloned;

function dragstartHandler(ev, type) {
    console.log('----------------ondragstart - drag started');
    ev.target.style.border = "solid";
    ev.dataTransfer.setData(type, ev.target.id);


}

function ondragHandler(ev) {
}

function ondragenterHandler(ev) {
    ev.preventDefault();
}

function ondragOverHandler(ev) {
    ev.preventDefault();
}

function ondragleaveHandler(ev) {
}

function ondropHandler(ev) {

    ev.preventDefault();
    try {
        let dataVal;
        let ele;
        if (ev.target.id === "Background") {
            if (ev.dataTransfer.getData("text/html")) {
                dataVal = ev.dataTransfer.getData("text/html");
            } else if (ev.dataTransfer.getData("text/plain")) {
                dataVal = ev.dataTransfer.getData("text/plain");
            }

            ele = document.getElementById(dataVal);
            if (!ele) {
                return null;
            }
            cloned = ele.cloneNode(true);
            cloned.setAttribute("id", ele.getAttribute("id") + "_cloned_" + (Math.floor(Math.random() * 10000)));
            ev.target.appendChild(cloned);
        }
    } catch (err) {
        console.error(err);
    }
}

function ondragendHandler(ev) {
    let oldClass = cloned.getAttribute("id");
    cloned.removeAttribute("class");
    cloned.removeAttribute("style");
    if (oldClass.includes("image") || oldClass.includes("shape")) {
        cloned.style.height = "20px";
    }
    cloned.setAttribute("class", "cloned");
    cloned.removeAttribute('draggable');
    cloned.removeAttribute('ondragstart');
    cloned.removeAttribute("ondrag");
    cloned.removeAttribute("ondragend");
    cloned.removeAttribute("ondragenter");
    cloned.removeAttribute("ondragleave");
    cloned.setAttribute("ondblclick", "elementDelete(event)");
    cloned.style.fontStyle = "italic"

    ev.target.removeAttribute("style");
}
