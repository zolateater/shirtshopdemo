describe('UIElement', function() {

    it("has default position", function() {
        var element = new UIElement();
        assert(element.getPosition() instanceof Position);
    });

    it("has default size", function() {
        var element = new UIElement();
        assert(element.getSize() instanceof Size);
    });

    it("has no view by default", function() {
        var element = new UIElement();
        assert(element.getView() === undefined);
    });

    it("stores passed view", function() {
        var element = new UIElement();
        var exampleView = new UIElementView();
        element.setView(exampleView);
        assert(element.getView() instanceof  UIElementView);
    });

    it("can change position", function() {
        var element = new UIElement();
        assert(element.getPosition().getX() == 0);
        var position = new Position(1, 1);
        element.moveTo(position);
        assert(element.getPosition().getX() == 1);
    });

    it("can change size", function() {
        var element = new UIElement();
        assert(element.getSize().getWidth() == Size.defaultWidth);
        var newSize = new Size(1, 1);
        element.setSize(newSize);
        assert(element.getSize().getWidth() == 1);
    });

    it("knows that offset matches/doesn't matches its position and size", function() {
        var element = new UIElement();
        element.moveTo(new Position(0, 0));
        element.setSize(new Size(10, 10));
        assert(element.isOffsetIn(5, 5) == true);
        element.moveTo(new Position(10, 10));
        assert(element.isOffsetIn(5, 5) == false);
    });
});