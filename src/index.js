document.addEventListener('DOMContentLoaded', function() {

    var canvas = document.getElementById('canvas');
    var surface = new CanvasSurface(canvas);
    surface.render();

    // Panel for creating new elements on
    var componentPanel = new ComponentsPanel(surface);
    componentPanel.bindHandlers();

    // Create properties panel
    // and attaching it to canvas events
    var propertiesPanel = new PropertiesPanel(surface);
    propertiesPanel.bindHandlers();

    // Initializing model viewer
    window.modelView = null;
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

    resourcePreparer.startLoading();
});
