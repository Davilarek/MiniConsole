/* Davilarek's Windowed Console */
var windowTemplate;
function request(url) {
    var xml = new XMLHttpRequest();
    xml.open("GET", url, false);
    xml.send();
    return xml;
}
// windowTemplate = request("https://github.com/Davilarek/LinuxJSViewer/raw/master/html-gui/window-template.html").responseText;
windowTemplate =
    `<span class="window" style="position: absolute; width: 400px; height: 200px;">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" rel="stylesheet">

    <div class="w-title-bar"
        style="position: absolute; width: 100%; height: 20px; border: solid black; border-width: 2px 2px; box-sizing: border-box; font-size: 15px; background: white;">
        <span class="w-title"
            style="position: absolute; left: 8px; top: -16px; text-align: justify; font-family: 'Lato', sans-serif; white-space: nowrap; overflow: hidden;">
            <p style="color: #000000;">
                Title
            </p>
        </span>
        <span class="w-close-button"
            style="position: absolute; right: 10px;  top: -16px; text-align: justify; font-family: 'Lato', sans-serif;">
            <p style="color: #000000;">
                X
            </p>
        </span>
    </div>
    <div class="w-content"
        style="position: absolute; width: 100%; height: 90%; top: 20px; background-color: lightgray; overflow: scroll;">
        <p style="color: #000000;display: inline;white-space: pre;">
            Content
        </p>
    </div>
    <div class="w-input-bar"
        style="position: absolute; width: 100%; height: 20px; top: 100%; border: 2px solid black; box-sizing: border-box; font-size: 15px; background: white;">
        <span class="w-input"
            style="position: absolute; /*! left: 8px; */ top: -2px; text-align: justify; font-family: 'Lato', sans-serif; white-space: nowrap; overflow: hidden; width: 100%;">
            <input type="text" style="color: rgb(0, 0, 0);height: 14px;width: 100%;">
        </span>
    </div>
</span>`;

// https://codepen.io/marcusparsons/pen/NMyzgR
function makeDraggable(elmnt) {
    // Make an element draggable (or if it has a .window-top class, drag based on the .window-top element)
    let currentPosX = 0, currentPosY = 0, previousPosX = 0, previousPosY = 0;

    // If there is a window-top classed element, attach to that element instead of full window
    if (elmnt.querySelector('.w-title-bar')) {
        // If present, the window-top element is where you move the parent element from
        elmnt.querySelector('.w-title-bar').onmousedown = dragMouseDown;
    }
    else {
        // Otherwise, move the element itself
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        // Prevent any default action on this element (you can remove if you need this element to perform its default action)
        e.preventDefault();
        // Get the mouse cursor position and set the initial previous positions to begin
        previousPosX = e.clientX;
        previousPosY = e.clientY;
        // When the mouse is let go, call the closing event
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        // Prevent any default action on this element (you can remove if you need this element to perform its default action)
        e.preventDefault();
        // Calculate the new cursor position by using the previous x and y positions of the mouse
        currentPosX = previousPosX - e.clientX;
        currentPosY = previousPosY - e.clientY;
        // Replace the previous positions with the new x and y positions of the mouse
        previousPosX = e.clientX;
        previousPosY = e.clientY;
        // Set the element's new position
        elmnt.style.top = (elmnt.offsetTop - currentPosY) + 'px';
        elmnt.style.left = (elmnt.offsetLeft - currentPosX) + 'px';
    }

    function closeDragElement() {
        // Stop moving when mouse button is released and release events
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function start() {
    const parser = new DOMParser().parseFromString(windowTemplate, 'text/html').children[0].children[1].children[0];
    document.body.appendChild(parser);
    /**
     * @type {Element[]}
     */
    let childs = [].slice.call(document.body.children);
    let windowElement = childs[childs.indexOf(parser)]
    windowElement.getElementsByClassName("w-content")[0].children[0].textContent = '';
    const tmp = console.log;
    console.log = function (...args) {
        windowElement.getElementsByClassName("w-content")[0].children[0].textContent += args + '\n';
        tmp(...args);
    }
    const tmp2 = console.error;
    console.error = function (...args) {
        windowElement.getElementsByClassName("w-content")[0].children[0].textContent += args + '\n';
        tmp2(...args)
    }
    windowElement.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            try {
                console.log(windowElement.getElementsByTagName("input")[0].value);
                // console.log(eval(windowElement.getElementsByTagName("input")[0].value) + "");
                console.log(Function('"use strict";return (' + windowElement.getElementsByTagName("input")[0].value + ')')() + "");
            } catch (error) {
                console.error(error);
            }
            windowElement.getElementsByTagName("input")[0].value = "";
        }
    });
    windowElement.children[3].children[1].addEventListener("click", () => {
        windowElement.remove();
    });
    windowElement.getElementsByClassName("w-title")[0].children[0].textContent = "Mini Console";
    makeDraggable(windowElement);
}
start();