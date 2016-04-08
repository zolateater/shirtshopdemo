document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('elementsCanvas');
    window.surface = new CanvasSurface(canvas);

    surface.render();


    // Get A WebGL context
    var webCanvas = document.getElementById("webglCanvas");
    var gl = webCanvas.getContext("experimental-webgl");

    // Clearing
    gl.clearColor(0.85, 0.85, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // draw

});
