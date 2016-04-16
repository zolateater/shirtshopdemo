document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('canvas');
    window.surface = new CanvasSurface(canvas);

    var buttonAddElement = document.getElementById('btnAddText');
    buttonAddElement.addEventListener('click', function () {
        surface.pushLabel();
        var elemens = surface.getElements();
        surface.getElements().select(elemens.length - 1);
        surface.render();
    });




    surface.render();
});
