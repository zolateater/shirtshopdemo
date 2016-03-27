describe('CanvasFactory', function() {

    /**
     *
     * @returns {CanvasUIFactory}
     */
    var getFactory = function () {
        return new CanvasUIFactory(document.createElement('canvas').getContext('2d'));
    };


    it("sets the right view for a label element", function() {
        var label = getFactory().createLabel();
        var view = label.getView();
        assert(view instanceof CanvasUILabelView);
    });

    it("sets the right view for an image element", function() {
        var img = getFactory().createImage(new Image());
        var view = img.getView();
        assert(view instanceof CanvasUIImageView);
    });
});