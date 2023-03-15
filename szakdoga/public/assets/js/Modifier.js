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
    if(borderCheck){
        borderRadius = document.getElementById('border_radius').value ? document.getElementById('border_radius').value : 0;
        borderColor = document.getElementById('border_color').value;
        borderStyle = document.getElementById('border_style').value;
        borderSize = document.getElementById('border_size').value ? document.getElementById('border_size').value : 2;
    }

    selectedEement.innerText = innerText;
    if(style === "Bold"){
        selectedEement.style.fontWeight = style;
        selectedEement.style.fontStyle = "normal";
    }else{
        selectedEement.style.fontStyle = style;
        selectedEement.style.fontWeight =  "normal";
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
    }else{
        selectedEement.style.border = "none";
    }

    //Localstorage is a better in this.

    let data = {
        // type: "TextToDb",
        ID: elem_id,
        Type: "Label",
        parentElement: parentElement,
        posotion: position,
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
function savePictureToDB(){
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

    selectedEement.style.opacity = opacity;

    let data = {
        // type: 'imageToDB',
        ID: elem_id,
        Type: "Image",
        parentElement: parentElement,
        posotion: position,
        opacity: opacity,
    };

    localStorage.setItem(selectedEement_id, JSON.stringify(data));
}

function getDataFromDB(id) {

    let objData = JSON.parse(localStorage.getItem(id));

    if (objData) {
        document.getElementById('text_inner').value = objData['innerText'] ? objData['innerText'] : "";
        document.getElementById('text_style_select').value = objData['style'] ? objData['style'] : "normal";
        document.getElementById('text_font_family_select').value = objData['fontFamily'] ? objData['fontFamily'] : "Arial";
        document.getElementById('text_color').value = objData['fontColor'] ? objData['fontColor'] : "#000000";
        document.getElementById('text_size').value = objData['fontSize'] ? objData['fontSize'] : "12";
        document.getElementById('text_align').value = objData['textFloat'] ? objData['textFloat'] : "center";
        document.getElementById('text_opacity').value = objData['opacity'] ? objData['opacity'] : "1";
        if (objData['borderColor']) {
            borderRadius = document.getElementById('border_radius').value = objData['borderRadius'];
            borderColor = document.getElementById('border_color').value = objData['borderColor'];
            borderStyle = document.getElementById('border_style').value = objData['borderStyle'];
            borderSize = document.getElementById('border_size').value = objData['borderSize'];
        }
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