localStorage.clear();

document.addEventListener("mouseover", mouseOverDocument, false);
document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target,
        elem = target;
    if (elem.id === "Background" || elem.parentElement.id === "Background" || elem.parentElement.id.includes("cloned")) {
        getSelectedElement(elem)
        modifierConst(elem);
    }else if(elem.id === "text_border"){
        (document.getElementById('text_border').checked) ? borderContainerDiv.style.display = 'block' : borderContainerDiv.style.display = 'none';
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
        document.getElementById(localStorage.selectedObj).style.borderColor = document.getElementById('border_color').value;
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
    let saveButton = document.getElementById("SaveToDB");
    saveButton.removeAttribute("onclick");

    let textContainer = document.getElementById('textContainer');
    textContainer.style.display = "none";
    let backgroundContainer = document.getElementById('backgroundContainer');
    backgroundContainer.style.display = "none";

    textContainer.children[0].setAttribute("id", elem.id + "#mody");
    textContainer.children[0].setAttribute("class", "SelectedElement");
    if (elem.id.includes("label")) {
        saveButton.setAttribute("onclick","saveTextToDB()");
        textContainer.style.display = "block";
    } else if (elem.id.includes("Background")) {
        saveButton.setAttribute("onclick","saveBackgroundToDB()");
        backgroundContainer.style.display = "block";
    }
}