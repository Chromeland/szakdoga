let globalContainer = {};

function saveTextToDB () {

    let element = document.getElementById("textContainer");
    if (!element) {
        return false;
    }

    showLoader('Save');
    let elem_id = element.children[0].id;
    let selectedEement_id = elem_id.substring(0, elem_id.indexOf("#"));
    let selectedEement = document.getElementById(selectedEement_id);

    let elem_type;
    if (selectedEement_id.includes('label')) {
        elem_type = "label";
    } else if (selectedEement_id.includes('Background')) {
        elem_type = "background";
    } else if (selectedEement_id.includes('button')) {
        elem_type = "button";
    } else if (selectedEement_id.includes('image')) {
        elem_type = "image";
    } else if (selectedEement_id.includes('shape')) {
        elem_type = "shape";
    } else {
        elem_type = "list"
    }
    let parentElemet = selectedEement.parentElement.id;
    let posX = selectedEement.getAttribute("data-x");
    let posY = selectedEement.getAttribute("data-y");
    let innerText = document.getElementById('text_inner').value;
    let style = document.getElementById('text_style_select').value;
    let fontFamily = document.getElementById('text_font_family_select').value;
    let fontColor = document.getElementById('text_color').value;
    let fontSize = document.getElementById('text_size').value;
    let textAlign = document.getElementById('text_align').value;
    let opacity = document.getElementById('text_opacity').value;
    let borderCheck = document.getElementById('text_border').checked;
    let borderRadius = document.getElementById('border_radius').value;
    let borderStyle = document.getElementById('border_style').value;
    let borderSize = document.getElementById('border_size').value;

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
    }else{
        selectedEement.style.border = "none";
    }

    $.ajax({
        url: '../src/PrepareClass.php',
        type: "POST",
        data: {
            type: "saveTextToDB",
            ID: elem_id,
            type: elem_type,
            parentElemet: parentElemet,
            posX: posX,
            posY: posY,
            innerText: innerText,
            style: style,
            fontFamily: fontFamily,
            fontColor: fontColor,
            fontSize: fontSize,
            textFloat: textAlign,
            opacity: opacity,
            borderRadius: borderRadius,
            borderStyle: borderStyle,
            borderSize: borderSize
        }
    })
        .always(() => hideLoader('Save'));

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