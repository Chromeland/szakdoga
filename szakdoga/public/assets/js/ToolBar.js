function showTexts() {
    let show = document.getElementById("texts_container");
    if (show.style.display === "none") {
        show.removeAttribute("style");
    } else {
        show.style.display = "none";
    }
}

function showImages() {
    let show = document.getElementById("images_container");
    if (show.style.display === "none") {
        show.removeAttribute("style");
    } else {
        show.style.display = "none";
    }
}

function showShapes() {
    let show = document.getElementById("shapes_container");
    if (show.style.display === "none") {
        show.removeAttribute("style");
    } else {
        show.style.display = "none";
    }
}

function showLists() {
    let show = document.getElementById("lists_container");
    if (show.style.display === "none") {
        show.removeAttribute("style");
    } else {
        show.style.display = "none";
    }
}

function showButtons() {
    let show = document.getElementById("buttons_container");
    if (show.style.display === "none") {
        show.removeAttribute("style");
    } else {
        show.style.display = "none";
    }
}

let cloned;

function dragstartHandler(ev, type) {
    ev.target.style.border = "solid";
    ev.dataTransfer.setData(type, ev.target.id);
}

function ondragHandler(ev) {
}

function ondragenterHandler(ev) {
    ev.preventDefault();
}

function ondragOverHandler(ev) {
    ev.preventDefault();
}

function ondragleaveHandler(ev) {
}

function ondropHandler(ev) {

    ev.preventDefault();
    try {
        let dataVal;
        let ele;
        if (ev.target.id === "Background") {
            if (ev.dataTransfer.getData("text/html")) {
                dataVal = ev.dataTransfer.getData("text/html");
            } else if (ev.dataTransfer.getData("text/plain")) {
                dataVal = ev.dataTransfer.getData("text/plain");
            }

            ele = document.getElementById(dataVal);
            if (!ele) {
                return null;
            }
            cloned = ele.cloneNode(true);
            cloned.setAttribute("id", ele.getAttribute("id") + "_cloned_" + (Math.floor(Math.random() * 10000)));
            ev.target.appendChild(cloned);
        }
    } catch (err) {
        console.error(err);
    }
}

function ondragendHandler(ev) {
    let oldClass = cloned.getAttribute("id");
    cloned.removeAttribute("class");
    cloned.removeAttribute("style");
    if (oldClass.includes("png") || oldClass.includes("jpg")) {
        let imgID = oldClass.substr(0,oldClass.indexOf('_cloned_'));
        cloned.src ='http://localhost/szakdolgozat/szakdoga/public/assets/pictures/' + imgID;
    }
    cloned.setAttribute("class", "cloned");
    cloned.removeAttribute('draggable');
    cloned.removeAttribute('ondragstart');
    cloned.removeAttribute("ondrag");
    cloned.removeAttribute("ondragend");
    cloned.removeAttribute("ondragenter");
    cloned.removeAttribute("ondragleave");
    cloned.setAttribute("ondblclick", "elementDelete(event)");
    cloned.style.fontStyle = "italic"

    ev.target.removeAttribute("style");
}

//TODO: Képek rendes méretben való feltöltése mert így nagyon pixeles lesz,mikor felnagyítjuk, szóval ne a picit másoljuk hanem írjuk át a méreteit.
window.onload = function() {
    const imagesContainer = document.getElementById("images_container");

    const image = document.querySelector("#image");
    let imageCount = 1;
    const inputImage = document.getElementById("pictureUpload");
    inputImage.setAttribute("type", "file");
    inputImage.setAttribute("accept", "image/*");
    inputImage.addEventListener("change", (event) => {
        const imageLastChild = document.createElement("img");
        image.appendChild(imageLastChild);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let width = img.width;
                let height = img.height;
                let maxWidth = 50;
                let maxHeight = 50;
                let ratio = 0;

                if (width > height) {
                    ratio = maxWidth / width;
                    height = height * ratio;
                    width = maxWidth;
                } else {
                    ratio = maxHeight / height;
                    width = width * ratio;
                    height = maxHeight;
                }

                let canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                let resizedImage = canvas.toDataURL();
                image.lastElementChild.src = resizedImage;
                image.style.display = "block";

                // generate a unique ID for the image
                let id = file['name'];

                // set the ID attribute after the image has been added to the container
                image.lastElementChild.id = id;

                const data = new FormData();
                data.append('type', 'imageMove');
                data.append('file', file);
                $.ajax({
                    url: '../src/PrepareClass.php',
                    type: 'POST',
                    data: data,
                    contentType: false,
                    processData: false,
                    success: function(result) {
                        let objData = JSON.parse(result);
                        if(objData === 'Error'){
                            return null;
                        }
                    }
                });

            };
        };
        reader.readAsDataURL(file);
    });

    const video = document.querySelector("#video");
    const inputVideo = document.getElementById("videoUpload");
    inputVideo.setAttribute("id", "videoInput");
    inputVideo.setAttribute("class", "srcInput");
    inputVideo.setAttribute("type", "file");
    inputVideo.setAttribute("accept", "video/*");
    inputVideo.addEventListener("change", (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const videoURL = URL.createObjectURL(file);
            video.firstElementChild.src = videoURL;
            video.style.display = "block";
        };
        reader.readAsDataURL(file);
    });

    imagesContainer.appendChild(inputImage);
    imagesContainer.appendChild(inputVideo);
};