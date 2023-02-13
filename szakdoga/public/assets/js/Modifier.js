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
    let parentElement = selectedEement.parentElement.id;
    let posX = selectedEement.getAttribute("data-x");
    let posY = selectedEement.getAttribute("data-y");
    let innerText = document.getElementById('text_inner').value;
    let style = document.getElementById('text_style_select').value;
    let fontFamily = document.getElementById('text_font_family_select').value;
    let fontColor = document.getElementById('text_color').value;
    let fontSize = document.getElementById('text_size').value ? document.getElementById('text_size').value : 12;
    let textAlign = document.getElementById('text_align').value;
    let opacity = document.getElementById('text_opacity').value ? document.getElementById('text_opacity').value : 1;
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
    let data = {
        type: "TextToDb",
        ID: elem_id,
        Type: elem_type,
        parentElement: parentElement,
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
        borderSize: borderSize,
        borderColor: borderColor
    };

    $.ajax({
        url: '../src/PrepareClass.php',
        type: "POST",
        data: data
    })
        .done((response) => {
            console.log(response);
        })
        .always(() => hideLoader('Save'));

}

function getDataFromDB(table,id) {
    let data = {
        type: 'ReadFromDB',
        Table: table,
        ID: id
    }
    $.ajax({
        url: '../src/PrepareClass.php',
        type: "POST",
        data: data,
        success: function (result) {
            let objData = JSON.parse(result);
            if(objData === 'Error'){
                return null;
            }
            document.getElementById('text_inner').value = objData[5];
            document.getElementById('text_style_select').value = objData[6];
            document.getElementById('text_font_family_select').value = objData[7];
            document.getElementById('text_color').value = objData[8];
            document.getElementById('text_size').value = objData[9];
            document.getElementById('text_align').value = objData[10];
            document.getElementById('text_opacity').value = objData[11];

            console.log(objData);
        }

    })
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