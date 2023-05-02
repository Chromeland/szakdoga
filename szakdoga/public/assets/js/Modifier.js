let globalContainer = {};

function saveTextToDB () {

    let element = document.getElementById("textContainer");
    if (!element) {
        return false;
    }

    // showLoader('Save');
    let elem_id = element.children[0].id;
    let selectedEement_id = elem_id.substring(0, elem_id.indexOf("#"));
    let selectedEement = document.getElementById(selectedEement_id);

    let parentElement = selectedEement.parentElement.id;
    let position = selectedEement.getBoundingClientRect();
    let innerText = document.getElementById('text_inner').value;
    let style = document.getElementById('text_style_select').value;
    let fontFamily = document.getElementById('text_font_family_select').value;
    let fontColor = document.getElementById('text_color').value;
    let fontSize = document.getElementById('text_size').value ? document.getElementById('text_size').value : 12;
    let textAlign = document.getElementById('text_align').value;
    let opacity = document.getElementById('text_opacity').value / 100;
    let borderCheck = document.getElementById('text_border').checked;
    let borderRadius;
    let borderColor;
    let borderStyle;
    let borderSize;
    if (borderCheck) {
        borderRadius = document.getElementById('border_radius').value ? document.getElementById('border_radius').value : 0;
        borderColor = document.getElementById('border_color').value;
        borderStyle = document.getElementById('border_style').value;
        borderSize = document.getElementById('border_size').value ? document.getElementById('border_size').value : 2;
    }

    selectedEement.innerText = innerText;
    if (style === "Bold") {
        selectedEement.style.fontWeight = style;
        selectedEement.style.fontStyle = "normal";
    } else {
        selectedEement.style.fontStyle = style;
        selectedEement.style.fontWeight = "normal";
    }
    selectedEement.style.fontFamily = fontFamily;
    selectedEement.style.color = fontColor;
    selectedEement.style.fontSize = fontSize + "px";
    selectedEement.style.textAlign = textAlign;
    selectedEement.style.opacity = opacity;
    if (borderCheck) {
        selectedEement.style.borderRadius = borderRadius + "px";
        selectedEement.style.borderWidth = borderSize + "px";
        selectedEement.style.borderStyle = borderStyle;
        selectedEement.style.borderColor = borderColor;
    } else {
        selectedEement.style.border = "none";
    }

    //Localstorage is a better in this.

    let data = {
        // type: "TextToDb",
        ID: elem_id,
        Type: "p",
        parentElement: parentElement,
        position: position,
        innerText: innerText,
        style: style,
        fontFamily: fontFamily,
        fontColor: fontColor,
        fontSize: fontSize,
        textFloat: textAlign,
        opacity: opacity,
        borderRadius: borderRadius,
        borderStyle: borderStyle,
        borderSize: borderSize,
        borderColor: borderColor
    };
    //
    // $.ajax({
    //     url: '../src/PrepareClass.php',
    //     type: "POST",
    //     data: data
    // })
    //     .done((response) => {
    //         console.log(response);
    //     })
    //     .always(() => );

    localStorage.setItem(selectedEement_id, JSON.stringify(data));

    // hideLoader('Save');
}

function savePictureToDB() {
    let element = document.getElementById("imageContainer");
    if (!element) {
        return false;
    }

    let elem_id = element.children[0].id;
    let selectedEement_id = elem_id.substring(0, elem_id.indexOf("#"));
    let selectedEement = document.getElementById(selectedEement_id);

    let parentElement = selectedEement.parentElement.id;
    let position = selectedEement.getBoundingClientRect();
    let opacity = document.getElementById('image_opacity').value / 100;
    let src = selectedEement.src;

    selectedEement.style.opacity = opacity;

    let data = {
        // type: 'imageToDB',
        ID: elem_id,
        Type: "img",
        src: src,
        parentElement: parentElement,
        position: position,
        opacity: opacity,
    };

    localStorage.setItem(selectedEement_id, JSON.stringify(data));
}

function saveShapeToDB() {
    let element = document.getElementById("shapeContainer");
    if (!element) {
        return false;
    }

    let elem_id = element.children[0].id;
    let selectedEement_id = elem_id.substring(0, elem_id.indexOf("#"));
    let selectedEement = document.getElementById(selectedEement_id);
    let parentElement = selectedEement.parentElement.id;
    let position = selectedEement.getBoundingClientRect();
    let opacity = document.getElementById('shape_opacity').value / 100;
    let shapeColor = document.getElementById('shape_color').value;
    let borderCheck = document.getElementById('shape_border').checked;
    let borderRadius;
    let borderColor;
    let borderStyle;
    let borderSize;
    if (borderCheck) {
        borderRadius = document.getElementById('shapeBorder_radius').value ? document.getElementById('shapeBorder_radius').value : 0;
        borderColor = document.getElementById('shapeBorder_color').value;
        borderStyle = document.getElementById('shapeBorder_style').value;
        borderSize = document.getElementById('shapeBorder_size').value ? document.getElementById('shapeBorder_size').value : 2;
    }

    selectedEement.style.backgroundColor = shapeColor;
    selectedEement.style.opacity = opacity;
    if (borderCheck) {
        selectedEement.style.borderRadius = borderRadius + "px";
        selectedEement.style.borderWidth = borderSize + "px";
        selectedEement.style.borderStyle = borderStyle;
        selectedEement.style.borderColor = borderColor;
    } else {
        selectedEement.style.border = "none";
    }

    let data = {
        // type: 'shapeToDB',
        ID: elem_id,
        Type: "div",
        parentElement: parentElement,
        position: position,
        shapeColor: shapeColor,
        opacity: opacity,
        borderRadius: borderRadius,
        borderStyle: borderStyle,
        borderSize: borderSize,
        borderColor: borderColor
    };

    localStorage.setItem(selectedEement_id, JSON.stringify(data));
}

function saveBackgroundToDB() {
    let element = document.getElementById("BackgroundContainer");
    if (!element) {
        return false;
    }

    let elem_id = element.children[0].id;
    let selectedElement_id = elem_id.substring(0, elem_id.indexOf("#"));
    let selectedEement = document.getElementById(selectedElement_id);
    let backGroundColor = document.getElementById('background_color').value;

    selectedEement.style.backgroundColor = backGroundColor;

    let data = {
        // type: 'BackgroundToDB',
        ID: elem_id,
        Type: "Background",
        backGroundColor: backGroundColor,
    };

    localStorage.setItem(selectedElement_id, JSON.stringify(data));
}

function saveButtonToDB() {
    let element = document.getElementById("buttonContainer");
    if (!element) {
        return false;
    }

    let elem_id = element.children[0].id;
    let selectedElement_id = elem_id.substring(0, elem_id.indexOf("#"));
    let selectedElement = document.getElementById(selectedElement_id);
    let buttonName = document.getElementById('button_name').value;
    let buttonTextColor = document.getElementById('button_text_color').value;
    let buttonColor = document.getElementById('button_color').value;
    let buttonStyle = document.getElementById('button_style').value;
    let parentElement = selectedElement.parentElement.id;
    let position = selectedElement.getBoundingClientRect();
    let buttonFunction = document.getElementById('action_select').value;
    let goTo = "";

    selectedElement.innerHTML = buttonName;
    if (buttonStyle !== 'Basic') {
        selectedElement.classList.add(buttonStyle);
        selectedElement.style.background = '#3e64ff';
        selectedElement.style.borderColor = '#3e64ff';
        selectedElement.style.color = '#fff';
        selectedElement.style.borderRadius = '40px';
    } else {
        selectedElement.style.background = buttonColor;
        selectedElement.style.color = buttonTextColor;
        selectedElement.style.borderRadius = '0px';
        selectedElement.style.borderColor = 'black';
    }
    if (buttonFunction === 'close') {
        selectedElement.setAttribute('onclick', 'window.close();');
    } else if (buttonFunction === 'page') {
        let destinationType = document.getElementById('page_select').value
        if (destinationType === 'url') {
            goTo = document.getElementById('goto_url').value;
            if (!/^https?:\/\//i.test(goTo)) {
                goTo = 'http://' + goTo;
            }
            let URL = "window.location.href = '" + goTo + "';";
            selectedElement.setAttribute('onclick', URL);
        } else if (destinationType === 'file') {
            let fileInput = document.getElementById('goto_file');
            let selectedFile = fileInput.files[0]['name'];
            goTo = '../public/assets/saved_pages/' + selectedFile;
            selectedElement.setAttribute('onclick', "window.location.href = '" + goTo + "'");
        }
    }

    let data = {
        // type: 'imageToDB',
        ID: elem_id,
        Type: "button",
        parentElement: parentElement,
        position: position,
        buttonName: buttonName,
        buttonTextColor: buttonTextColor,
        buttonColor: buttonColor,
        buttonStyle: buttonStyle,
        function: buttonFunction,
        goTo: goTo
    };

    localStorage.setItem(selectedElement_id, JSON.stringify(data));
}

function saveVideoToDB() {
    let element = document.getElementById("videoContainer");
    if (!element) {
        return false;
    }

    let elem_id = element.children[0].id;
    let selectedElement_id = elem_id.substring(0, elem_id.indexOf("#"));
    let selectedElement = document.getElementById(selectedElement_id);
    let parentElement = selectedElement.parentElement.id;
    let position = selectedElement.getBoundingClientRect();
    let src = selectedElement.children[0].getAttribute('src');

    if (!src) {
        let fileInput = document.getElementById('file_source');
        let selectedFile = fileInput.files[0]['name'];
        const data = {
                type: 'getVideoSrc',
                videoName: selectedFile
            };
        $.ajax({
            url: '../src/PrepareClass.php',
            type: 'POST',
            data: data,
            success: function (result) {
                if (result) {
                    src = result;

                    selectedElement.children[0].setAttribute('src', src);

                    let data = {
                        // type: 'imageToDB',
                        ID: elem_id,
                        Type: "video",
                        parentElement: parentElement,
                        position: position,
                        src: src

                    };

                    localStorage.setItem(selectedElement_id, JSON.stringify(data));
                }
            }
        });
    }

}

function getDataFromDB(id) {

    let objData = JSON.parse(localStorage.getItem(id));
    if (!objData) {
        return false;
    }

    if (id.includes('label')) {
        document.getElementById('text_inner').value = objData['innerText'] ? objData['innerText'] : "";
        document.getElementById('text_style_select').value = objData['style'] ? objData['style'] : "normal";
        document.getElementById('text_font_family_select').value = objData['fontFamily'] ? objData['fontFamily'] : "Arial";
        document.getElementById('text_color').value = objData['fontColor'] ? objData['fontColor'] : "#000000";
        document.getElementById('text_size').value = objData['fontSize'] ? objData['fontSize'] : "12";
        document.getElementById('text_align').value = objData['textFloat'] ? objData['textFloat'] : "center";
        document.getElementById('text_opacity').value = objData['opacity'] ? objData['opacity'] : "100";
        if (objData['borderColor']) {
            borderRadius = document.getElementById('border_radius').value = objData['borderRadius'];
            borderColor = document.getElementById('border_color').value = objData['borderColor'];
            borderStyle = document.getElementById('border_style').value = objData['borderStyle'];
            borderSize = document.getElementById('border_size').value = objData['borderSize'];
        }
    } else if (id.includes('image')) {
        document.getElementById('image_opacity').value = objData['opacity'] ? objData['opacity'] * 100 : "100";
        document.getElementById('image_opacity_label').innerHTML = objData['opacity'] ? objData['opacity'] * 100 + "%" : "100%";
    } else if (id.includes('button')) {
        document.getElementById('button_name').value = objData['buttonName'];
        document.getElementById('button_color').value = objData['buttonColor'];
        document.getElementById('button_text_color').value = objData['buttonTextColor'];
        document.getElementById('button_style').value = objData['buttonStyle'];
        document.getElementById('action_select').value = objData['function'];
        if (objData['function'] !== 'close') {
            document.getElementById('page_select').value = objData['goTo'];
        }
    } else if (id.includes('shape')) {
        document.getElementById('shape_color').value = objData['shapeColor'];
        document.getElementById('shape_opacity').value = objData['opacity'] ? objData['opacity'] * 100 : "100";
        if (objData['borderColor']) {
            borderRadius = document.getElementById('border_radius').value = objData['borderRadius'];
            borderColor = document.getElementById('border_color').value = objData['borderColor'];
            borderStyle = document.getElementById('border_style').value = objData['borderStyle'];
            borderSize = document.getElementById('border_size').value = objData['borderSize'];
        }
    } else if (id.includes('Background')) {
        document.getElementById('background_color').value = objData['backGroundColor'];
    }
}

/**
 * If id is given, loader can only be hidden when this id is passed as parameter
 * @param id string
 */
function showLoader(id = null) {
    document.getElementById("loader_canvas").style.display = "block";
    if (id) {
        globalContainer.showLoaderId = id;
    }
}

/**
 * See showLoader(...)
 * @param id string
 */
function hideLoader(id) {
    if (globalContainer.showLoaderId) {
        if (id === globalContainer.showLoaderId) {
            document.getElementById("loader_canvas").style.display = "none";
            globalContainer.showLoaderId = null;
        }
    } else {
        document.getElementById("loader_canvas").style.display = "none";
    }
}