<!DOCTYPE html>
<?php
//include ('../src/PrepareClass.php');
?>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/style/style.css">
    <script src="./assets/js/main.js"></script>
    <script src="./assets/js/ToolBar.js"></script>
    <script src="./assets/js/Modifier.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script type="module" src="./assets/js/drag_and_drop.js"></script>

    <title>Szakdoga</title>
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

<div id="toolBox">
    <div id="head">Drag and Drop ToolBox</div>
    <div>
        <button id="texts" onclick="showTexts()" class=toolBoxButtons>Texts</button>
        <div id="texts_container" style="display: none" ;>
            <p id="label1" class="drag_Ex" draggable="true" ondragstart="dragstartHandler(event, 'text/html')"
               ondrag="ondragHandler(event)" ondragend="ondragendHandler(event)" ondragenter="ondragenterHandler(event)"
               ondragleave="ondragleaveHandler(event)">Label</p>
            <p id="label2" class="drag_Ex" draggable="true" ondragstart="dragstartHandler(event, 'text/html')"
               ondrag="ondragHandler(event)" ondragend="ondragendHandler(event)" ondragenter="ondragenterHandler(event)"
               ondragleave="ondragleaveHandler(event)">label 1</p>
        </div>
        <button id="images" onclick="showImages()" class=toolBoxButtons>Images</button>
        <div id="images_container" style="display: none" ;>
            <div id="image" class="drag_Ex" draggable="true" ondragstart="dragstartHandler(event, 'text/html')"
                 ondrag="ondragHandler(event)" ondragend="ondragendHandler(event)"
                 ondragenter="ondragenterHandler(event)" ondragleave="ondragleaveHandler(event)">
                <img src="" alt="">
            </div>
            <div id="video" class="drag_Ex" draggable="true" ondragstart="dragstartHandler(event, 'text/html')"
                 ondrag="ondragHandler(event)" ondragend="ondragendHandler(event)"
                 ondragenter="ondragenterHandler(event)" ondragleave="ondragleaveHandler(event)">
                <img src="" alt="">
            </div>
        </div>
        <button id="shapes" onclick="showShapes()" class=toolBoxButtons>Shapes</button>
        <div id="shapes_container" style="display: none" ;>
            <div id="shape" class="drag_Ex" draggable="true" ondragstart="dragstartHandler(event, 'text/html')"
                 ondrag="ondragHandler(event)" ondragend="ondragendHandler(event)"
                 ondragenter="ondragenterHandler(event)" ondragleave="ondragleaveHandler(event)"></div>
        </div>
        <button id="lists" onclick="showLists()" class=toolBoxButtons>Lists</button>
        <div id="lists_container" style="display: none" ;>
            <div id="list1" class="drag_Ex" draggable="true" ondragstart="dragstartHandler(event, 'text/html')"
                 ondrag="ondragHandler(event)" ondragend="ondragendHandler(event)"
                 ondragenter="ondragenterHandler(event)" ondragleave="ondragleaveHandler(event)">List
            </div>
            <div id="list2" class="drag_Ex" draggable="true" ondragstart="dragstartHandler(event, 'text/html')"
                 ondrag="ondragHandler(event)" ondragend="ondragendHandler(event)"
                 ondragenter="ondragenterHandler(event)" ondragleave="ondragleaveHandler(event)">List 1
            </div>
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
<div id="modifier">
    <div id="head">Selected element modifier
        <button id="SaveToDB" onclick="saveElementModifications()">Save</button>
    </div>
</div>
<div id="Background" class="Background" ondrop="ondropHandler(event)" ondragover="ondragOverHandler(event)">

</div>
<div id="headerFromOther"></div>
<div id="modifiersFromMain"></div>
<div id="toolBoxFromModifier"></div>
<div class="dropdown-content" onclick="showOrHideDropdownMenu(false)">
    <form>
        <a>Write this </a>
        <a>Welcome to my webpage!</a>
        <a>Welcome to my webpage!</a>
        <a>Welcome to my webpage!</a>
        <a>Welcome to my webpage!</a>
    </form>
</div>

</body>
</html>