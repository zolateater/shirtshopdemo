describe('UILabelElement', function() {

    it("extends UIElement and has all of its methods", function() {
        var element = new UILabelElement();
        assert(element.getSize instanceof Function);
        assert(element.setSize instanceof Function);
        assert(element.moveTo instanceof Function);
        assert(element.getPosition instanceof Function);
        assert(element.moveTo instanceof Function);
        assert(element.setView instanceof Function);
        assert(element.getView instanceof Function);
    });

    it("also has default size and position", function() {
        var element = new UILabelElement();
        assert(element.getSize() instanceof Size);
        assert(element.getPosition()instanceof Position);
    });

    it("has default text", function() {
        var element = new UILabelElement();
        assert(element.getText() == UILabelElement.defaultText);
    });

    it("stores text", function() {
        var element = new UILabelElement(null, null, "text");
        assert(element.getText() == "text");
        element.setText("other text");
        assert(element.getText() == "other text");
    });

    it("has style options allowed to be changed", function () {
        var element = new UILabelElement(null, null, "text");
        assert(element.getFont() != null);

        element.setFont('Comic Sans');
        assert(element.getFont() == 'Comic Sans');

        element.setColor('Black');
        assert(element.getColor() == 'Black');
    });
});