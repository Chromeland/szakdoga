import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js'


interact('.cloned')
    .resizable({
        // resize from all edges and corners
        edges: {left: true, right: true, bottom: true, top: true},

        listeners: {
            move(event) {
                var target = event.target
                var x = (parseFloat(target.getAttribute('data-x')) || 0)
                var y = (parseFloat(target.getAttribute('data-y')) || 0)

                // update the element's style
                target.style.width = event.rect.width + 'px'
                target.style.height = event.rect.height + 'px'

                // translate when resizing from top or left edges
                x += event.deltaRect.left
                y += event.deltaRect.top

                target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
            }
        },
        modifiers: [
            // minimum size
            interact.modifiers.restrictSize({
                min: {width: 50, height: 20}
            })
        ],

        inertia: false
    })
    .draggable({
        listeners: {move: dragMoveListener},
        inertia: false,
        autoScroll: true,

    })

function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

window.dragMoveListener = dragMoveListener

interact('.cloned').dropzone({
    // only accept elements matching this CSS selector
    accept: '.cloned',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget
        var dropzoneElement = event.target
        let x = event.relatedTarget.getAttribute('data-x')
        let y = event.relatedTarget.getAttribute('data-y')

        event.relatedTarget.setAttribute('data-x', x)
        event.relatedTarget.setAttribute('data-y', y)

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target')
        draggableElement.classList.add('can-drop')
        draggableElement.style.borderColor = 'green'
    },
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('can-drop')
        event.relatedTarget.style.borderColor = 'red'
    },
    ondrop: function (event) {
        if (event.relatedTarget.parentElement !== event.target) {
            event.target.insertBefore(event.relatedTarget, null)
            let x = event.relatedTarget.getAttribute('data-x')
            let y = event.relatedTarget.getAttribute('data-y')
            let z = event.target.getAttribute('data-x')
            let k = event.target.getAttribute('data-y')

            if (((x - z) < 0) || ((y - k) < 0)) {
                event.relatedTarget.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
                event.relatedTarget.setAttribute('data-x', x)
                event.relatedTarget.setAttribute('data-y', y)
            } else {
                x -= z
                y -= k

                event.relatedTarget.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
                event.relatedTarget.setAttribute('data-x', x)
                event.relatedTarget.setAttribute('data-y', y)
            }


        }
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active')
        event.target.classList.remove('drop-target')
        event.relatedTarget.style.borderColor = document.getElementById('border_color').value;
    }
})