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

    this._btnShow = document.getElementById('btnShowPreview');
    this._btnHide = document.getElementById('btnHidePreview');
}

PreviewPanel.prototype.bindHandlers = function () {
    var self = this;

    this._btnShow.addEventListener('click', function () {
        self.panel.classList.add('active');

        var image = self.modelView.makePreviewImage();
        self.drawImage(image);
    });

    this._btnHide.addEventListener('click', function () {
        self.panel.classList.remove('active');
    });
};


PreviewPanel.prototype.drawImage = function (image) 
{
    var ctx = this.canvas.getContext('2d');

    ctx.fillStyle = "#FFF";

    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(Storage.get('previewMan'), 0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
};