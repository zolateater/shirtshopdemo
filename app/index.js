document.addEventListener('DOMContentLoaded', function() {

    var canvas = document.getElementById('canvas');
    surface = new CanvasSurface(canvas);

    var buttonAddElement = document.getElementById('btnAddText');

    // Add event listener for click
    buttonAddElement.addEventListener('click', function () {
        surface.pushLabel();
    });

    surface.render();

    modelView = null;
    
    var cupSurface = document.getElementById('cupSurface');
    var loader = new ResourceLoader();

    var resourcePreparer = new ResourcePreparer(loader, [
        {key: 'model', src: '/models/cupModel.json', type: 'json'},
        {key: 'vertexShader', src: '/shaders/fragment.glsl', type: 'text'},
        {key: 'fragmentShader', src: '/shaders/vertex.glsl', type: 'text'},
        {key: 'initialTexture', src: '/img/logoGrey.jpg', type: 'image'}
    ], function () {
        modelView = new ModelView(
            cupSurface,
            Storage.get('model'),
            Storage.get('initialTexture'),

            Storage.get('fragmentShader'),
            Storage.get('vertexShader')
        );
        modelView.startRender();
    });

    document.getElementById('updateTexture').addEventListener('click', function () {
        modelView.setTexture(surface.toImage());
    });

    resourcePreparer.startLoading();
});
