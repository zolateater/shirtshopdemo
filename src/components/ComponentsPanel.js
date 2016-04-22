/**
 *
 * @param {CanvasSurface} surface
 * @constructor
 */
function ComponentsPanel(surface)
{
    this._surface = surface;
    
    this._fileInput = document.getElementById('fileUploader');
    this._btnUpdateTexture = document.getElementById('updateTexture');
    this._btnAddText = document.getElementById('btnAddText');
    this._selectBackground = document.getElementById('selectBackground');
}

ComponentsPanel.prototype.bindHandlers = function () {
    var self = this;
    
    // Add event listener for click on text button
    this._btnAddText.addEventListener('click', function () {
        self._surface.pushLabel();
    });
    
    // Update current texture button
    this._btnUpdateTexture.addEventListener('click', function () {
        modelView.setTexture(self._surface.toImage());
    });

    // On click we set value to empty and the reason
    // why we are doing this is because we want to
    // add new image on the surface even if it is the
    // same file (in case user selected it earlier)
    this._fileInput.addEventListener('click', function (e) {
        this.value = '';
    });

    // Setting clear color for canvas surface
    this._selectBackground.addEventListener('change', function () {
        // There is an empty value in the list
        if (this.value) {
            self._surface.setClearColor(this.value);
            self._surface.render();
        }
    });

    // On change we loading file.
    this._fileInput.addEventListener('change', function (e) {
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
