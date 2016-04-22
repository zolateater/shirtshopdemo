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
