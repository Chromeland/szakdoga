<!DOCTYPE html>
<?php
?>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/style/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="./assets/js/main.js"></script>
    <script src="./assets/js/ToolBar.js"></script>
    <script src="./assets/js/Modifier.js"></script>
    <script type="module" src="./assets/js/drag_and_drop.js"></script>


    <title>Szakdolgozat</title>
</head>
<body>
<div id="loader_canvas" style="display: none">
    <div class="loader"></div>
</div>
<div id="header"> Welcome To My Webpage!
    <div class="dropdown" onmouseover="showOrHideDropdownMenu(true)">
        <img src="./assets/icons/Menu.svg" style="width: 24px; height: 24px;"/>
    </div>
</div>

<!--Toolbox-->
<div id="toolBox">
    <div id="head">Drag and Drop ToolBox</div>
    <div>
        <button id="texts" onclick="showTexts()" class=toolBoxButtons>Texts</button>
        <div id="texts_container" style="display: none" ;>
            <p id="label1" class="drag_Ex" draggable="true" ondragstart="dragstartHandler(event, 'text/html')"
               ondrag="ondragHandler(event)" ondragend="ondragendHandler(event)" ondragenter="ondragenterHandler(event)"
               ondragleave="ondragleaveHandler(event)">Label</p>
        </div>
        <button id="images" onclick="showImages()" class=toolBoxButtons>Images</button>
        <div id="images_container" style="display: none" ;>
            <div id="image" class="drag_Ex" draggable="true" ondragstart="dragstartHandler(event, 'text/html')"
                 ondrag="ondragHandler(event)" ondragend="ondragendHandler(event)"
                 ondragenter="ondragenterHandler(event)" ondragleave="ondragleaveHandler(event)">
            </div>
            <div id="image_bin" class="drag_Ex" ondrop="ondropHandler(event)" ondragover="ondragOverHandler(event)">
                <img src="./assets/icons/bin.png" alt="">
            </div>
            <label for="pictureUpload" class="custom-file-upload">
                Picture Upload
            </label>
            <input id="pictureUpload" type="file" style="display: none"/>
        </div>
        <button id="videos" onclick="showVideos()" class=toolBoxButtons>Videos</button>
        <div id="videos_container" style="display: none" ;>
            <video id="video" class="drag_Ex" draggable="true" ondragstart="dragstartHandler(event, 'text/html')"
                 ondrag="ondragHandler(event)" ondragend="ondragendHandler(event)"
                 ondragenter="ondragenterHandler(event)" ondragleave="ondragleaveHandler(event)" controls>
            <source type="video/mp4">
            </video>
        </div>
        <button id="shapes" onclick="showShapes()" class=toolBoxButtons>Shapes</button>
        <div id="shapes_container" style="display: none" ;>
            <div id="shape" class="drag_Ex" draggable="true" ondragstart="dragstartHandler(event, 'text/html')"
                 ondrag="ondragHandler(event)" ondragend="ondragendHandler(event)"
                 ondragenter="ondragenterHandler(event)" ondragleave="ondragleaveHandler(event)"></div>
        </div>
        <button id="buttons" onclick="showButtons()" class=toolBoxButtons>Buttons</button>
        <div id="buttons_container" style="display: none" ;>
            <button id="button1" class=drag_Ex draggable="true" ondragstart="dragstartHandler(event, 'text/html')"
                    ondrag="ondragHandler(event)" ondragend="ondragendHandler(event)"
                    ondragenter="ondragenterHandler(event)" ondragleave="ondragleaveHandler(event)">Button
            </button>
        </div>
    </div>
</div>

<!--Modifier-->
<div id="modifier">
    <div id="head">Modifier Window
        <button id="SaveToDB">Save</button>
    </div>
    <div id="backgroundContainer" style="display: none" class="modifierFieldContainer">

    </div>
    <div id="textContainer" class="modifierFieldContainer" style="display: none">
        <h3 id="label_settings">Label Settings</h3>
        <div>
            <h4 class="mody_label">Text:</h4>
            <label for="text_inner" style="display: none"></label>
            <textarea id="text_inner" name="text_inner" rows="4" cols="40"></textarea>
        </div>
        <div>
            <h4 class="mody_label">Text Style</h4>
            <select id="text_style_select">
                <option id="itlaic" style="font-style: italic">Italic</option>
                <option id="bold" style="font-weight: bold">Bold</option>
                <option selected id="normal" style="font-style: normal">Normal</option>
            </select>
        </div>
        <div>
            <h4 class="mody_label">Text family</h4>
            <select id="text_font_family_select">
                <option selected id="arial" style="font-family: Arial">Arial</option>
                <option id="times" style="font-family: 'Times New Roman'">Times New Roman</option>
                <option id="courier" style="font-family: 'Courier New'">Courier New</option>
                <option id="georgia" style="font-family: Georgia">Georgia</option>
                <option id="brush" style="font-family: 'Brush Script MT'">Brush Script MT</option>
            </select>
        </div>
        <div>
            <h4 class="mody_label">Text color</h4>
            <input id="text_color" type="color">
        </div>
        <div>
            <h4 class="mody_label">Text Size</h4>
            <input id="text_size" type="number" placeholder="12">
        </div>
        <div>
            <h4 class="mody_label">Text Align</h4>
            <select id="text_align">
                <option id="align_left" style="text-align: left">Left</option>
                <option id="align_right" style="text-align: right">Right</option>
                <option selected id="align_center" style="text-align: center">Center</option>
                <option id="align_justify" style="text-align: justify">Justify</option>
            </select>
        </div>
        <div>
            <h4 class="mody_label">Text Opacity</h4>
            <input type="range" id="text_opacity" name="vol" min="0" max="100" value="100">
            <label for="text_opacity">100%</label>
        </div>
        <div id="borderDiv">
            <label for="text_border" id="text_border_label">Border</label>
            <input id="text_border" type="checkbox">
        </div>
        <div id="borderContainerDiv" style="display: none">
            <div>
                <h4 class="mody_label">Border Style</h4>
                <select id="border_style">
                    <option id="border_solid" style="border-style: solid">Solid</option>
                    <option id="border_dashed" style="border-style: dashed">Dashed</option>
                    <option id="border_dotted" style="border-style: dotted">Dotted</option>
                    <option id="border_double" style="border-style: double">Double</option>
                    <option id="border_inset" style="border-style: inset">Inset</option>
                    <option id="border_outset" style="border-style: outset">Outset</option>
                    <option id="border_groove" style="border-style: groove">Groove</option>
                    <option id="border_dot-dash" style="border-style: dot-dash">Dot-Dash</option>
                    <option id="border_dot-dot-dash" style="border-style: dot-dot-dash">Dot-Dot-Dash</option>
                </select>
            </div>
            <div>
                <h4 class="mody_label">Border Edges</h4>
                <label for="border_radius"><small>(Number - How round the border corners will be.)</small></label>
                <input id="border_radius" type="number">
            </div>
            <div>
                <h4 class="mody_label">Border Thickness</h4>
                <input id="border_size" type="number">
            </div>
            <div>
                <h4 class="mody_label">Border Color</h4>
                <input id="border_color" type="color">
            </div>
        </div>
    </div>
    <div id="imageContainer" class="modifierFieldContainer" style="display: none">
        <h3 id="label_settings">Image Settings</h3>
        <div>
            <h4 class="mody_label">Image Opacity</h4>
            <input type="range" id="image_opacity" name="vol" min="0" max="100" value="100">
            <label id="image_opacity_label" for="image_opacity">100%</label>
        </div>
    </div>
    <div id="BackgroundContainer" class="modifierFieldContainer" style="display: none">
        <h3 id="label_settings">Background Settings</h3>
        <div>
            <h4 class="mody_label">Background Color</h4>
            <input id="background_color" type="color">
        </div>
    </div>
    <div id="shapeContainer" class="modifierFieldContainer" style="display: none">
        <h3 id="label_settings">Shape Settings</h3>
        <div>
            <h4 class="mody_label">Shape color</h4>
            <input id="shape_color" type="color">
        </div>
        <div>
            <h4 class="mody_label">Shape Opacity</h4>
            <input type="range" id="shape_opacity" name="vol" min="0" max="100" value="100">
            <label id="shape_opacity_label" for="shape_opacity">100%</label>
        </div>
        <div id="borderDiv">
            <label for="shape_border" id="shape_border_label">Border</label>
            <input id="shape_border" type="checkbox">
        </div>
        <div id="shapeBorderContainerDiv" style="display: none">
            <div>
                <h4 class="mody_label">Border Style</h4>
                <select id="shapeBorder_style">
                    <option id="shapeBorder_solid" style="border-style: solid">Solid</option>
                    <option id="shapeBorder_dashed" style="border-style: dashed">Dashed</option>
                    <option id="shapeBorder_dotted" style="border-style: dotted">Dotted</option>
                    <option id="shapeBorder_double" style="border-style: double">Double</option>
                    <option id="shapeBorder_inset" style="border-style: inset">Inset</option>
                    <option id="shapeBorder_outset" style="border-style: outset">Outset</option>
                    <option id="shapeBorder_groove" style="border-style: groove">Groove</option>
                    <option id="shapeBorder_dot-dash" style="border-style: dot-dash">Dot-Dash</option>
                    <option id="shapeBorder_dot-dot-dash" style="border-style: dot-dot-dash">Dot-Dot-Dash</option>
                </select>
            </div>
            <div>
                <h4 class="mody_label">Border Edges</h4>
                <label for="shapeBorder_radius"><small>(Number - How round the border corners will be.)</small></label>
                <input id="shapeBorder_radius" type="number">
            </div>
            <div>
                <h4 class="mody_label">Border Thickness</h4>
                <input id="shapeBorder_size" type="number">
            </div>
            <div>
                <h4 class="mody_label">Border Color</h4>
                <input id="shapeBorder_color" type="color">
            </div>
        </div>
    </div>
    <div id="buttonContainer" class="modifierFieldContainer" style="display: none">
        <h3 id="label_settings">Button Settings</h3>
        <div>
            <h4 class="mody_label">Button Name</h4>
            <input id="button_name" type="text" placeholder="Button">
            <h4 class="mody_label">Button Style</h4>
                <select id="button_style">
                    <option id="basic_style">Basic</option>
                    <option id="modern_style">Modern</option>
                </select>
            <h4 class="mody_label">Button Color</h4>
            <input id="button_color" type="color" value="#ffffff"">
            <h4 class="mody_label">Button Text Color</h4>
            <input id="button_text_color" type="color">
            <h4 class="mody_label">Function</h4>
            <div>
                <label for="action_select">Action:</label>
                <select id="action_select">
                    <option value="close">Close</option>
                    <option value="page">Go to page</option>
                </select>
            </div>
            <div id="page_options" style="display: none;">
                <div>
                    <label for="page_select">Page option:</label>
                    <select id="page_select">
                        <option value="url">URL</option>
                        <option value="file">HTML file</option>
                    </select>
                </div>
                <div id="url_option">
                    <label for="url-input">URL:</label>
                    <input type="text" id="goto_url">
                </div>
                <div id="file_option" style="display: none;">
                    <label for="file-input">HTML file:</label>
                    <input type="file" id="goto_file">
                </div>
            </div>
        </div>
    </div>
    <div id="videoContainer" class="modifierFieldContainer" style="display: none">
        <h3 id="label_settings">Video Settings</h3>
        <div>
            <div id="source_options">
                <div id="file_option">
                    <label for="file-input">MP4 file:</label>
                    <input type="file" id="file_source">
                </div>
            </div>
        </div>
    </div>
</div>

<!--Other Elements-->
<div id="Background" class="Background" ondrop="ondropHandler(event)" ondragover="ondragOverHandler(event)">
</div>
<div id="headerFromOther"></div>
<div id="modifiersFromMain"></div>
<div id="toolBoxFromModifier"></div>
<div class="dropdown-content" onclick="showOrHideDropdownMenu(false)">
    <form>
        <a onclick="newProject()">New Page</a>
        <a onclick="saveCanvasAsHTML()">Save my page!</a>
    </form>
</div>
<script>
    $("#Background").on("mouseover", ".cloned", function() {
        $(this).css("border-color", "red");
        $(this).css("border-width", "1px");
        $(this).css("border-style", "Solid");
    });

    $("#Background").on("mouseleave", ".cloned", function(event) {
        if (localStorage.getItem(event.target.id) && JSON.parse(localStorage.getItem(event.target.id)).borderColor) {
            $(this).css("border-color", JSON.parse(localStorage.getItem(event.target.id)).borderColor);
            $(this).css("border-width", JSON.parse(localStorage.getItem(event.target.id)).borderSize + "px");
            $(this).css("border-style", JSON.parse(localStorage.getItem(event.target.id)).borderStyle);
            $(this).css("border-radius", JSON.parse(localStorage.getItem(event.target.id)).borderRadius + "px");
        } else if (event.target.id.includes('button')) {
            //TODO: Ezt meg kellene oldani hogy ne legyen mindig kék hanem függjön a style-tól
            $(this).css("border-color", "#3e64ff");
        } else {
            $(this).css("border", "none");
        }
    });

    const rangeInputImage = document.getElementById("image_opacity");
    const rangeLabelImage = document.querySelector("label[for='image_opacity']");

    rangeInputImage.addEventListener("input", () => {
        rangeLabelImage.textContent = rangeInputImage.value + "%";
    });

    const rangeInputText = document.getElementById("text_opacity");
    const rangeLabelText = document.querySelector("label[for='text_opacity']");

    rangeInputText.addEventListener("input", () => {
        rangeLabelText.textContent = rangeInputText.value + "%";
    });

    const rangeInputShape = document.getElementById("shape_opacity");
    const rangeLabelShape = document.querySelector("label[for='shape_opacity']");

    rangeInputShape.addEventListener("input", () => {
        rangeLabelShape.textContent = rangeInputShape.value + "%";
    });
</script>
</body>
</html>