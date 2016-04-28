/**
 * Panel for interacting with model view element
 * Zooming, type selector.
 *
 * @param {ModelView} modelView
 * @param {{Model}} models
 * @constructor
 */
function ModelViewPanel(modelView, models)
{
    this._btnZoomIn = document.getElementById('btnZoomIn');
    this._btnZoomOut = document.getElementById('btnZoomOut');
    this._cupTypeSelect = document.getElementById('cupTypeSelect');

    this._modelView = modelView;
    this._models = models;
}

/**
 * Binds all event handlers
 */
ModelViewPanel.prototype.bindHandlers = function ()
{
    var self = this;

    // Zooming buttons
    this._btnZoomIn.addEventListener('click', function () {
        self._modelView.camera.zoomIn();
    });
    this._btnZoomOut.addEventListener('click', function () {
        self._modelView.camera.zoomOut();
    });

    // Changing model type
    this._cupTypeSelect.addEventListener('change', function () {
        var selected = this.value;
        self._modelView.setModel(self._models[selected]);
    });
};