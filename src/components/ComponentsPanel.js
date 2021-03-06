/**
 * This is the place where magic happens.
 * Handling events
 *
 * @param {CanvasSurface} surface
 * @param {ModelView} modelView
 * @constructor
 */
function ComponentsPanel(surface, modelView)
{
    this._surface = surface;
    
    this._fileInput = document.getElementById('fileUploader');
    this._btnUpdateTexture = document.getElementById('updateTexture');
    this._btnAddText = document.getElementById('btnAddText');
    this._selectBackground = document.getElementById('selectBackground');
    this._modelView = modelView;
}

ComponentsPanel.prototype.bindHandlers = function () {
    var self = this;
    
    // Add listener for a click event on text button
    this._btnAddText.addEventListener('click', function () {
        self._surface.pushLabel();
    });
    
    // Update current texture button
    this._btnUpdateTexture.addEventListener('click', function () {
        self._modelView.setTexture(self._surface.toImage());
        self._modelView.drawScene();
    });

    // On click we set current value to empty and the reason
    // why we are doing this is because we want to
    // add new image on the surface, even if it is the
    // same file (in case if user selected it earlier)
    this._fileInput.addEventListener('click', function (e) {
        this.value = '';
    });

    // Setting clear color for a canvas surface
    this._selectBackground.addEventListener('change', function () {
        // There is an empty value in the list
        if (this.value) {
            self._surface.setClearColor(this.value);
            self._surface.render();
        }
    });

    // On change we are loading a file.
    this._fileInput.addEventListener('change', function (e) {
        // We need only one file.
        // The first one.
        var file = e.target.files[0];
        var fileReader = new FileReader();

        fileReader.onload = function (event) {
            var dataImage = event.currentTarget.result;
            var image = new Image();
            image.src = dataImage;
            
            // adding uploaded image to the surface
            self._surface.pushImage(image);
        };

        fileReader.readAsDataURL(file);
    });
};
