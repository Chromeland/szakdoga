let globalContainer = {};

function saveElementModifications() {

    let element = document.getElementById("selected");
    if (!element) {
        return false;
    }

    let elem_id = element.firstChild.id;
    console.log(elem_id);

    showLoader('Save');

    $.ajax({
        url: '../src/PrepareClass.php',
        type: "POST",
        data: {
            type: "SaveToDb",
            ID: elem_id
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