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
        {key: 'modelCup1', src: '/models/cup1.json', type: 'json'},
        {key: 'modelCup2', src: '/models/cup2.json', type: 'json'},
        {key: 'vertexShader', src: '/shaders/fragment.glsl', type: 'text'},
        {key: 'fragmentShader', src: '/shaders/vertex.glsl', type: 'text'},
        {key: 'initialTexture', src: '/img/logoGrey.jpg', type: 'image'}
    ], function () {

        // TODO: extract
        var glContext = cupSurface.getContext('webgl');

        if (!glContext) {
            glContext = cupSurface.getContext('experimental-webgl')
        }

        if (!glContext) {
            alert('Seems like your browser does not support WebGL. Come back when you update your browser!');
            throw new Error('WebGL support is required!');
        }

        window.modelCup1 = new Model(glContext, Storage.get('modelCup1'));
        window.modelCup2 = new Model(glContext, Storage.get('modelCup2'));

        modelView = new ModelView(
            cupSurface,
            glContext,
            Storage.get('initialTexture'),
            Storage.get('fragmentShader'),
            Storage.get('vertexShader')
        );

        modelView.setModel(window.modelCup1);
        modelView.startRender();
    });

    resourcePreparer.startLoading();
});
