/**
 * 
 * @param {ModelView} modelView
 * @constructor
 */
function PreviewPanel(modelView)
{
    this.modelView = modelView;

    this.panel = document.getElementById('previewPanel');

    /**
     * @type {HTMLCanvasElement}
     */
    this.canvas = document.getElementById('previewCanvas');

    this._btnToggle = document.getElementById('btnTogglePreview');
    this.isShown = false;
}

PreviewPanel.prototype.bindHandlers = function () {
    var self = this;

    this._btnToggle.addEventListener('click', function () {

        if (self.isShown) {
            self.panel.classList.remove('active');
        }
        else {
            self.panel.classList.add('active');
            self.requestImage();
        }
        self.isShown = !self.isShown;
    });
};

/**
 * Requests image from model view and updates it on canvas
 */
PreviewPanel.prototype.requestImage = function () 
{
    var image = this.modelView.makePreviewImage();
    var ctx = this.canvas.getContext('2d');

    ctx.fillStyle = "#FFF";

    var imageMan = Storage.get('previewMan');

    var rotateAngle = 0.09;
    var drawOffset = { x: this.canvas.height / -16, y: this.canvas.height / 10 };

    // clear
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // man should be on center
    var widthOffset = (this.canvas.width - this.canvas.height) / 2;

    // Draw man image
    ctx.drawImage(imageMan, widthOffset, 0, this.canvas.height, this.canvas.height);

    // Draw cup image
    ctx.rotate(rotateAngle);
    ctx.drawImage(image, drawOffset.x, drawOffset.y, image.width, image.height);
    ctx.rotate(-rotateAngle);

    // Draw man front image
    var imageManFront = Storage.get('previewManFront');
    ctx.drawImage(imageManFront, widthOffset, 0, this.canvas.height, this.canvas.height);

};