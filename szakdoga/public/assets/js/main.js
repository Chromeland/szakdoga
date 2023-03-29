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

function saveCanvasAsHTML() {
    let canvas = document.getElementById('Background');
    let div = canvas;
    let styles = window.getComputedStyle(div);
    let html = '<!DOCTYPE html>\n';
    html += '<html>\n<head>\n<title>Canvas Export</title>\n</head>\n<body>\n';
    html += '<div style="';
    html += 'width:' + div.offsetWidth + 'px;';
    html += 'height:' + div.offsetHeight + 'px;';
    html += 'background-image:url(' + styles.backgroundImage.replace(/"/g, '') + ');';
    html += 'background-repeat:' + styles.backgroundRepeat + ';';
    html += 'background-position:' + styles.backgroundPosition + ';';
    html += 'background-size:' + styles.backgroundSize + ';';
    html += '">\n';
    html += div.innerHTML;
    html += '</div>\n';
    html += '</body>\n</html>';
    let fileName = prompt("Enter file name:", "canvas-export.html");
    if (fileName != null) {
        download(fileName, html);
    }
}

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function elementDelete(e) {
    e.target.remove();
    localStorage.removeItem(e.target.id);
}

function getSelectedElement(element) {

    if (!localStorage.selectedObj) {
        localStorage.selectedObj = element.id;
        return true;
    } else if (document.getElementById(localStorage.selectedObj)) {
        document.getElementById(localStorage.selectedObj).style.borderColor = document.getElementById('border_color').value;
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
    let imageContainer = document.getElementById('imageContainer');
    imageContainer.style.display = "none";

    if (elem.id.includes("label")) {
        saveButton.setAttribute("onclick", "saveTextToDB()");
        textContainer.children[0].setAttribute("id", elem.id + "#mody");
        textContainer.children[0].setAttribute("class", "SelectedElement");
        textContainer.style.display = "block";
        getDataFromDB(elem.id);
    } else if (elem.id.includes("Background")) {
        saveButton.setAttribute("onclick", "saveBackgroundToDB()");
        backgroundContainer.style.display = "block";
    } else if (elem.id.includes('image')) {
        saveButton.setAttribute("onclick", "savePictureToDB()");
        imageContainer.children[0].setAttribute("id", elem.id + "#mody");
        imageContainer.children[0].setAttribute("class", "SelectedElement");
        imageContainer.style.display = "block";
    }
}