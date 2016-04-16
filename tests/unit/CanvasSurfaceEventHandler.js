describe('CanvasSurfaceEventHandler', function() {

    var canvas = document.createElement('canvas');
    var canvasSurface = new CanvasSurface(canvas);

    it("calls attached handlers on select", function() {
        var handler = new CanvasSurfaceEventHandler(canvasSurface);
        var value = 0;
        var changeValue = function () {
            value++;
        };
        handler.addSelectEventHandler(changeValue);
        handler.triggerSelect();
        var valueHasChanged = value != 0;
        assert(valueHasChanged);
    });

    it("calls attached handlers on deselect", function() {
        var handler = new CanvasSurfaceEventHandler(canvasSurface);
        var value = 0;
        var changeValue = function () {
            value++;
        };
        handler.addDeselectEventHandler(changeValue);
        handler.triggerDeselect();
        var valueHasChanged = value != 0;
        assert(valueHasChanged);
    });

});