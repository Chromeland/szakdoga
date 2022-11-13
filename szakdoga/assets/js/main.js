localStorage.clear();

document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target,
        elem = target;
    if (elem.id === "Background" || elem.parentElement.id === "Background" || elem.parentElement.id.includes("cloned")) {


        if (getSelectedElement(elem)) {
            let modifier = document.getElementById("modifier");

            if (modifier.childElementCount <= 1) {
                modifierConst(elem);
            } else {
                document.getElementById("selected").remove();
                modifierConst(elem);
                //test
            }
        }
    }
}, false);

function showOrHideDropdownMenu(isShow = true) {
    for (let ctn of document.querySelectorAll('.dropdown-content')) {
        ctn.style.display = isShow ? 'block' : 'none';
    }
}

function mouseOverDocument(evt) {
    if (document.getElementsByClassName("dropdown-content")[0]) {
        if (!document.getElementsByClassName("dropdown")[0].contains(evt.target) &&
            !document.getElementsByClassName("dropdown-content")[0].contains(evt.target)) {
            showOrHideDropdownMenu(false);
        }
    }
}

function elementDelete(e) {
    e.target.remove();
}

function getSelectedElement(element) {

    if (!localStorage.selectedObj) {
        element.style.borderColor = "red";
        localStorage.selectedObj = element.id;
        return true;
    } else if (element.id === localStorage.selectedObj) {
        element.style.borderColor = "red";
        return false;
    } else if (document.getElementById(localStorage.selectedObj)) {
        document.getElementById(localStorage.selectedObj).style.borderColor = "black";
        element.style.borderColor = "red";
        localStorage.selectedObj = element.id;
        return true;
    } else {
        localStorage.selectedObj = element.id;
        return true;
    }

}

function modifierConst(elem) {
    let modifier = document.getElementById("modifier");

    let containerDiv = document.createElement("div");
    containerDiv.setAttribute("id", "selected");
    containerDiv.classList.add("modifierFieldContainer");

    let label = document.createElement("h3")
    label.setAttribute("id", elem.id + "#mody");
    label.setAttribute("class", "SelectedElement");
    if (elem.id.includes("label")) {
        label.innerText = "Label Settings:";
    } else if (elem.id.includes("Background")) {
        label.innerText = "Background Settings:";
    }
    containerDiv.appendChild(label);
    modifier.appendChild(containerDiv);
}