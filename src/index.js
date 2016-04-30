document.addEventListener('DOMContentLoaded', function() {

    var canvas = document.getElementById('canvas');
    var surface = new CanvasSurface(canvas);
    surface.render();

    // Create properties panel
    // and attaching it to canvas events
    var propertiesPanel = new PropertiesPanel(surface);
    propertiesPanel.bindHandlers();

    var cupCanvas = document.getElementById('cupCanvas');
    var loader = new ResourceLoader();

    /**
     * @type {ModelView}
     */
    var modelView;

    var resourcePreparer = new ResourcePreparer(loader, [
        {key: 'modelCup1', src: '/models/cup1.json', type: 'json'},
        {key: 'modelCup2', src: '/models/cup2.json', type: 'json'},
        {key: 'vertexShader', src: '/shaders/fragment.glsl', type: 'text'},
        {key: 'fragmentShader', src: '/shaders/vertex.glsl', type: 'text'},
        {key: 'initialTexture', src: '/img/logoGrey.jpg', type: 'image'}
    ], function () {

        // TODO: extract all checks
        var glContext = cupCanvas.getContext('webgl');

        if (!glContext) {
            glContext = cupCanvas.getContext('experimental-webgl')
        }

        if (!glContext) {
            alert('Seems like your browser does not support WebGL. Come back later when you update your browser!');
            throw new Error('WebGL support is required!');
        }

        // key must be same as select option value
        var models = {
            cup1: new Model(glContext, Storage.get('modelCup1')),
            cup2: new Model(glContext, Storage.get('modelCup2'))
        };

        modelView = new ModelView(
            cupCanvas,
            glContext,
            Storage.get('initialTexture'),
            Storage.get('fragmentShader'),
            Storage.get('vertexShader')
        );

        // Setting initial model cup
        modelView.setModel(models.cup1);
        modelView.startRender();

        // Panel for creating new elements on
        var componentPanel = new ComponentsPanel(surface, modelView);
        componentPanel.bindHandlers();

        // Panel for 3D magic
        var modelViewPanel = new ModelViewPanel(modelView, models);
        modelViewPanel.bindHandlers();
    });

    var drawingContainer = document.getElementById('drawingContainer');
    var modelViewContainer = document.getElementById('cupCanvasContainer');

    var fitCanvasSize = function () {
        // Changing size of the drawing
        var drawingCanvasRatio = surface.canvas.width / surface.canvas.height;
        var newWidth = drawingContainer.offsetWidth;
        var newHeight = newWidth / drawingCanvasRatio;

        surface.canvas.width = newWidth;
        surface.canvas.height = newHeight;
        surface.render();

        var modelViewRatio = cupCanvas.width / cupCanvas.height;
        var newWidthModelView = modelViewContainer.offsetWidth;
        cupCanvas.width = newWidthModelView;
        cupCanvas.height = newWidthModelView / modelViewRatio;
        
        if (modelView) {
            modelView.updateViewport();
        }
    };
    fitCanvasSize();

    // Listen for resize event to resize canvas
    window.addEventListener('resize', fitCanvasSize);

    resourcePreparer.startLoading();
});
