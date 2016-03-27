describe('UIImageElement', function() {

    // document.createElement('canvas').getContext('2d')

    it("extends UIElement and has all of its methods", function() {
        var element = new UIImageElement(null, null, new Image());
        assert(element.getSize instanceof Function);
        assert(element.setSize instanceof Function);
        assert(element.moveTo instanceof Function);
        assert(element.getPosition instanceof Function);
        assert(element.moveTo instanceof Function);
        assert(element.setView instanceof Function);
        assert(element.getView instanceof Function);
    });

    it("can't be created without an image", function() {
        var exception = null;
        try {
            var element = new UIImageElement();
        }
        catch (e) {
            exception = e;
        }
        assert(exception != null);
    });

    it("can return an image constructed with", function() {
        var element = new UIImageElement(null, null, new Image());
        assert(element.getImage() instanceof Image);
    });


});