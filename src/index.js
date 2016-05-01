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
    var modelView = null;

    /**
     * @type {PreviewPanel}
     */
    var previewPanel = null;

    var resourcePreparer = new ResourcePreparer(loader, [
        {key: 'modelCup1', src: '/models/cup1.json', type: 'json'},
        {key: 'modelCup2', src: '/models/cup2.json', type: 'json'},
        {key: 'vertexShader', src: '/shaders/fragment.glsl', type: 'text'},
        {key: 'fragmentShader', src: '/shaders/vertex.glsl', type: 'text'},
        {key: 'initialTexture', src: '/img/logoGrey.jpg', type: 'image'},
        {key: 'previewMan', src: '/img/previewMan.jpg', type: 'image'},
        {key: 'previewManFront', src: '/img/previewManFront.png', type: 'image'}
    ], function () {

        // TODO: extract all checks
        var options = {
            preserveDrawingBuffer: true
        };
        var glContext = cupCanvas.getContext('webgl', options);
        
        if (!glContext) {
            glContext = cupCanvas.getContext('experimental-webgl', options);
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

        // Panel for preview
        previewPanel = new PreviewPanel(modelView);
        previewPanel.bindHandlers();
    });

    var drawingContainer = document.getElementById('drawingContainer');
    var modelViewContainer = document.getElementById('cupCanvasContainer');
    var panelPreviewCanvas = document.getElementById('previewCanvas');
    
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
        var newHeightModelView = newWidthModelView / modelViewRatio;
        cupCanvas.width = newWidthModelView;
        cupCanvas.height = newHeightModelView;

        panelPreviewCanvas.width = newWidthModelView;
        panelPreviewCanvas.height = newHeightModelView;

        if (modelView) {
            modelView.updateViewport();
        }

        if (previewPanel) {
            previewPanel.requestImage();
        }
    };

    fitCanvasSize();

    window.addEventListener('resize', fitCanvasSize);

    resourcePreparer.startLoading();
});
