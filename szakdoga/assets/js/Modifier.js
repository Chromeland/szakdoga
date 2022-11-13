let globalContainer = {};

function saveElementModifications() {

    let element = document.getElementById("selected");
    if (!element) {
        return false;
    }

    console.log(element.firstChild.id);

    showLoader("Save");

    $.ajax({
        url: 'RequestHandler.php',
        data: {
            type: 'SaveToDb',
            ID: element.firstChild.id,
        },
    })
        .done((params) => {
            if (params) {
                console.log(params);
            }
        })
        .always(() => {
            hideLoader('Save');
        });

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