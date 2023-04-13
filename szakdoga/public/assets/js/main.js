document.addEventListener("mouseover", mouseOverDocument, false);
document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target,
        elem = target;
    if (elem.id === "Background" || elem.parentElement.id === "Background" || elem.parentElement.id.includes("cloned")) {
        getSelectedElement(elem);
        modifierConst(elem);
    } else if(elem.id === "text_border"){
        (document.getElementById('text_border').checked) ? borderContainerDiv.style.display = 'block' : borderContainerDiv.style.display = 'none';
    } else if(elem.id === "shape_border"){
        (document.getElementById('shape_border').checked) ? shapeBorderContainerDiv.style.display = 'block' : shapeBorderContainerDiv.style.display = 'none';
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

async function saveCanvasAsHTML() {
    let canvas = document.getElementById('Background');
    let div = canvas;
    let styles = window.getComputedStyle(div);
    let html = '<!DOCTYPE html>\n';
    html += '<html>\n<head>\n<title>Webpage</title>\n</head>\n<body>\n';
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
    let fileName = prompt("Enter file name:", "Webpage.html");
    if (fileName !== null) {
        if (!fileName.endsWith('.html')) {
            fileName += '.html';
        }
        await download(fileName, html);
        // Now that the file has been downloaded, you can move it to a specified folder here
        $.ajax({
            url: '../src/PrepareClass.php',
            type: 'POST',
            data: data = {
                type: 'HTMLMove',
                fileName: fileName,
                path: 'C:/xampp/htdocs/szakdolgozat/szakdoga/public/assets/saved_pages'
            },
            success: function (result) {
                if (!result) {
                    console.log("Sometihng went wrong!!!");
                }
            }
        });
    }
}


async function download(filename, text) {
    return new Promise((resolve, reject) => {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        resolve();
    });
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
    let backgroundContainer = document.getElementById('BackgroundContainer');
    backgroundContainer.style.display = "none";
    let imageContainer = document.getElementById('imageContainer');
    imageContainer.style.display = "none";
    let shapeContainer = document.getElementById('shapeContainer');
    shapeContainer.style.display = "none";
    let buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.style.display = "none";

    if (elem.id.includes("label")) {
        saveButton.setAttribute("onclick", "saveTextToDB()");
        textContainer.children[0].setAttribute("id", elem.id + "#mody");
        textContainer.children[0].setAttribute("class", "SelectedElement");
        textContainer.style.display = "block";
        getDataFromDB(elem.id);
    } else if (elem.id.includes("Background")) {
        saveButton.setAttribute("onclick", "saveBackgroundToDB()");
        backgroundContainer.children[0].setAttribute("id", elem.id + "#mody");
        backgroundContainer.style.display = "block";
        getDataFromDB(elem.id);
    } else if (elem.id.includes('image')) {
        saveButton.setAttribute("onclick", "savePictureToDB()");
        imageContainer.children[0].setAttribute("id", elem.id + "#mody");
        imageContainer.children[0].setAttribute("class", "SelectedElement");
        imageContainer.style.display = "block";
        getDataFromDB(elem.id);
    } else if (elem.id.includes("button")){
        saveButton.setAttribute("onclick", "saveButtonToDB()");
        buttonContainer.children[0].setAttribute("id", elem.id + "#mody");
        buttonContainer.children[0].setAttribute("class", "SelectedElement");
        let buttonName = document.getElementById('button_name');
        buttonName.value = elem.innerHTML;
        buttonContainer.style.display = "block";
        getDataFromDB(elem.id);
    } else if(elem.id.includes('shape')){
        saveButton.setAttribute("onclick", "saveShapeToDB()");
        shapeContainer.children[0].setAttribute("id", elem.id + "#mody");
        shapeContainer.style.display = "block";
        getDataFromDB(elem.id);
    }
}

function newProject() {
    let confirmation = confirm("Are you sure you want to create a new page? This will delete all data and files associated with the current project.");

    if (confirmation) {
        localStorage.clear();
        $.ajax({
            url: '../src/PrepareClass.php',
            type: 'POST',
            data: data = {
                type: 'imageFolderClear',
                folder: 'C:/xampp/htdocs/szakdolgozat/szakdoga/public/assets/pictures'
            },
            success: function (result) {
                if (result !== 'Error') {
                    location.reload();
                } else{
                    alert('The pictures folder is missing!');
                }
            }
        });
    }
}
