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
describe('Position', function() {

    it("saves its coordinates", function() {
        var pos = new Position(1, 2);
        assert(pos.getX() == 1);
        assert(pos.getY() == 2);
    });

    it("can be moved properly", function() {
        var pos = new Position(1, 2);
        assert(pos.move(1, 2).getX() == 2);
        assert(pos.move(1, 2).getY() == 4);
    });

    it("has default params", function() {
        var pos = new Position();
        assert(pos.getX() == 0);
        assert(pos.getY() == 0);
    });

    it("is an immutable object", function() {
        var pos = new Position();
        assert(pos.getX() == 0);
        assert(pos.getY() == 0);

        var otherPos = pos.move(1, 1);
        assert(pos.getX() == 0);
        assert(pos.getY() == 0);

        assert(otherPos.getX() == 1);
        assert(otherPos.getY() == 1);
    });
});
describe('Size', function() {

    it("saves its size", function() {
        var size = new Size(1, 2);
        assert(size.getWidth() == 1);
        assert(size.getHeight() == 2);
    });

    it("can be multiplied", function() {
        var size = new Size(1, 2);
        assert(size.multiply(2).getWidth() == 2);
        assert(size.multiply(2).getHeight() == 4);
    });

    it("has default params", function() {
        var size = new Size();
        assert(size.getWidth() == Size.defaultWidth);
        assert(size.getHeight() == Size.defaultHeight);
    });
});
describe('UICollection', function() {

    it("allows to add elements and retrieve them", function() {
        var collection = new UICollection();
        collection.add(new UILabelElement(null, null, "text"));
        assert(collection.get(0).getText() == 'text');
    });

    it("adds elements to the end", function () {
        var collection = new UICollection();

        collection.add(new UILabelElement(null, null, "text 0"));
        collection.add(new UILabelElement(null, null, "text 1"));

        assert(collection.get(0).getText() == 'text 0');
        assert(collection.get(1).getText() == 'text 1');
    });

    it("has 'length' property which equals to added elements size", function () {
        var collection = new UICollection();

        assert(collection.length == 0);

        collection.add(new UILabelElement(null, null, "text 0"));
        assert(collection.length == 1);

        collection.add(new UILabelElement(null, null, "text 1"));
        assert(collection.length == 2);
    });

    it("allows to retrieve all elements as array in the right order", function () {
        var collection = new UICollection();

        collection.add(new UILabelElement(null, null, "text 0"));
        collection.add(new UILabelElement(null, null, "text 1"));

        assert(collection.get(0).getText() == 'text 0');
        assert(collection.get(1).getText() == 'text 1');

        var allElements = collection.getAll();

        assert(allElements[0].getText() == 'text 0');
        assert(allElements[1].getText() == 'text 1');
    });

    it("allows to remove an element from itself", function () {
        var collection = new UICollection();

        collection.add(new UILabelElement(null, null, "text 0"));
        collection.add(new UILabelElement(null, null, "text 1"));

    });

    it("allows to remove element", function () {
        var collection = new UICollection();

        var el1 = new UILabelElement(null, null, "text 0");
        var el2 = new UILabelElement(null, null, "text 1");

        collection.add(el1);
        collection.add(el2);

        collection.remove(0);
        assert(collection.length == 1);
        assert(collection.get(0).getText() == "text 1");
    });

    it("allows to swap elements", function () {
        var collection = new UICollection();

        var el1 = new UILabelElement(null, null, "text 0");
        var el2 = new UILabelElement(null, null, "text 1");

        collection.add(el1);
        collection.add(el2);

        collection.swap(0, 1);

        assert(collection.get(0).getText() == "text 1");
        assert(collection.get(1).getText() == "text 0");
    });

    it ("allows to select and remember it", function () {
        var collection = new UICollection();
        var el1 = new UILabelElement(null, null, "text 0");
        var el2 = new UILabelElement(null, null, "text 1");
        collection.add(el1);
        collection.add(el2);

        assert(collection.getSelectedIndex() == -1);

        collection.select(0);
        assert(collection.getSelectedIndex() == 0);
    });

    it("has nothing selected if selected element is removed", function () {
        var collection = new UICollection();
        var el1 = new UILabelElement(null, null, "text 0");
        var el2 = new UILabelElement(null, null, "text 1");
        collection.add(el1);
        collection.add(el2);
        assert(collection.getSelectedIndex() == -1);
        collection.select(0);
        assert(collection.getSelectedIndex() == 0);
        collection.remove(0);
        assert(collection.getSelectedElement() == null);
    });

    it("fetch element by position", function () {
        var collection = new UICollection();
        var el1 = new UILabelElement(new Position(10, 10), new Size(10, 10), "text 0");
        var el2 = new UILabelElement(new Position(15, 15), new Size(10, 10), "text 1");
        collection.add(el1);
        collection.add(el2);
        assert(collection.fetchElementByOffset(15, 15).getText() == "text 1");
        assert(collection.fetchElementByOffset(14, 14).getText() == "text 0");
        assert(collection.fetchElementByOffset(0, 0) == null);
    });

});
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

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaXQvQ2FudmFzRmFjdG9yeS5qcyIsInVuaXQvUG9zaXRpb24uanMiLCJ1bml0L1NpemUuanMiLCJ1bml0L1VJQ29sbGVjdGlvbi5qcyIsInVuaXQvVUlFbGVtZW50LmpzIiwidW5pdC9VSUltYWdlRWxlbWVudC5qcyIsInVuaXQvVUlMYWJlbEVsZW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZXNjcmliZSgnQ2FudmFzRmFjdG9yeScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDYW52YXNVSUZhY3Rvcnl9XHJcbiAgICAgKi9cclxuICAgIHZhciBnZXRGYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ2FudmFzVUlGYWN0b3J5KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJykpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgaXQoXCJzZXRzIHRoZSByaWdodCB2aWV3IGZvciBhIGxhYmVsIGVsZW1lbnRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGxhYmVsID0gZ2V0RmFjdG9yeSgpLmNyZWF0ZUxhYmVsKCk7XHJcbiAgICAgICAgdmFyIHZpZXcgPSBsYWJlbC5nZXRWaWV3KCk7XHJcbiAgICAgICAgYXNzZXJ0KHZpZXcgaW5zdGFuY2VvZiBDYW52YXNVSUxhYmVsVmlldyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcInNldHMgdGhlIHJpZ2h0IHZpZXcgZm9yIGFuIGltYWdlIGVsZW1lbnRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGltZyA9IGdldEZhY3RvcnkoKS5jcmVhdGVJbWFnZShuZXcgSW1hZ2UoKSk7XHJcbiAgICAgICAgdmFyIHZpZXcgPSBpbWcuZ2V0VmlldygpO1xyXG4gICAgICAgIGFzc2VydCh2aWV3IGluc3RhbmNlb2YgQ2FudmFzVUlJbWFnZVZpZXcpO1xyXG4gICAgfSk7XHJcbn0pOyIsImRlc2NyaWJlKCdQb3NpdGlvbicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGl0KFwic2F2ZXMgaXRzIGNvb3JkaW5hdGVzXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwb3MgPSBuZXcgUG9zaXRpb24oMSwgMik7XHJcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRYKCkgPT0gMSk7XHJcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRZKCkgPT0gMik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImNhbiBiZSBtb3ZlZCBwcm9wZXJseVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcG9zID0gbmV3IFBvc2l0aW9uKDEsIDIpO1xyXG4gICAgICAgIGFzc2VydChwb3MubW92ZSgxLCAyKS5nZXRYKCkgPT0gMik7XHJcbiAgICAgICAgYXNzZXJ0KHBvcy5tb3ZlKDEsIDIpLmdldFkoKSA9PSA0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiaGFzIGRlZmF1bHQgcGFyYW1zXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwb3MgPSBuZXcgUG9zaXRpb24oKTtcclxuICAgICAgICBhc3NlcnQocG9zLmdldFgoKSA9PSAwKTtcclxuICAgICAgICBhc3NlcnQocG9zLmdldFkoKSA9PSAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiaXMgYW4gaW1tdXRhYmxlIG9iamVjdFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcG9zID0gbmV3IFBvc2l0aW9uKCk7XHJcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRYKCkgPT0gMCk7XHJcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRZKCkgPT0gMCk7XHJcblxyXG4gICAgICAgIHZhciBvdGhlclBvcyA9IHBvcy5tb3ZlKDEsIDEpO1xyXG4gICAgICAgIGFzc2VydChwb3MuZ2V0WCgpID09IDApO1xyXG4gICAgICAgIGFzc2VydChwb3MuZ2V0WSgpID09IDApO1xyXG5cclxuICAgICAgICBhc3NlcnQob3RoZXJQb3MuZ2V0WCgpID09IDEpO1xyXG4gICAgICAgIGFzc2VydChvdGhlclBvcy5nZXRZKCkgPT0gMSk7XHJcbiAgICB9KTtcclxufSk7IiwiZGVzY3JpYmUoJ1NpemUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpdChcInNhdmVzIGl0cyBzaXplXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzaXplID0gbmV3IFNpemUoMSwgMik7XHJcbiAgICAgICAgYXNzZXJ0KHNpemUuZ2V0V2lkdGgoKSA9PSAxKTtcclxuICAgICAgICBhc3NlcnQoc2l6ZS5nZXRIZWlnaHQoKSA9PSAyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiY2FuIGJlIG11bHRpcGxpZWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSBuZXcgU2l6ZSgxLCAyKTtcclxuICAgICAgICBhc3NlcnQoc2l6ZS5tdWx0aXBseSgyKS5nZXRXaWR0aCgpID09IDIpO1xyXG4gICAgICAgIGFzc2VydChzaXplLm11bHRpcGx5KDIpLmdldEhlaWdodCgpID09IDQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJoYXMgZGVmYXVsdCBwYXJhbXNcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSBuZXcgU2l6ZSgpO1xyXG4gICAgICAgIGFzc2VydChzaXplLmdldFdpZHRoKCkgPT0gU2l6ZS5kZWZhdWx0V2lkdGgpO1xyXG4gICAgICAgIGFzc2VydChzaXplLmdldEhlaWdodCgpID09IFNpemUuZGVmYXVsdEhlaWdodCk7XHJcbiAgICB9KTtcclxufSk7IiwiZGVzY3JpYmUoJ1VJQ29sbGVjdGlvbicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGl0KFwiYWxsb3dzIHRvIGFkZCBlbGVtZW50cyBhbmQgcmV0cmlldmUgdGhlbVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcclxuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0XCIpKTtcclxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMCkuZ2V0VGV4dCgpID09ICd0ZXh0Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImFkZHMgZWxlbWVudHMgdG8gdGhlIGVuZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMFwiKSk7XHJcbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpKTtcclxuXHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDApLmdldFRleHQoKSA9PSAndGV4dCAwJyk7XHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDEpLmdldFRleHQoKSA9PSAndGV4dCAxJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImhhcyAnbGVuZ3RoJyBwcm9wZXJ0eSB3aGljaCBlcXVhbHMgdG8gYWRkZWQgZWxlbWVudHMgc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmxlbmd0aCA9PSAwKTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpKTtcclxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5sZW5ndGggPT0gMSk7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMVwiKSk7XHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24ubGVuZ3RoID09IDIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJhbGxvd3MgdG8gcmV0cmlldmUgYWxsIGVsZW1lbnRzIGFzIGFycmF5IGluIHRoZSByaWdodCBvcmRlclwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMFwiKSk7XHJcbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpKTtcclxuXHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDApLmdldFRleHQoKSA9PSAndGV4dCAwJyk7XHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDEpLmdldFRleHQoKSA9PSAndGV4dCAxJyk7XHJcblxyXG4gICAgICAgIHZhciBhbGxFbGVtZW50cyA9IGNvbGxlY3Rpb24uZ2V0QWxsKCk7XHJcblxyXG4gICAgICAgIGFzc2VydChhbGxFbGVtZW50c1swXS5nZXRUZXh0KCkgPT0gJ3RleHQgMCcpO1xyXG4gICAgICAgIGFzc2VydChhbGxFbGVtZW50c1sxXS5nZXRUZXh0KCkgPT0gJ3RleHQgMScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJhbGxvd3MgdG8gcmVtb3ZlIGFuIGVsZW1lbnQgZnJvbSBpdHNlbGZcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDBcIikpO1xyXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMVwiKSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJhbGxvd3MgdG8gcmVtb3ZlIGVsZW1lbnRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xyXG5cclxuICAgICAgICB2YXIgZWwxID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpO1xyXG4gICAgICAgIHZhciBlbDIgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDFcIik7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMSk7XHJcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwyKTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5yZW1vdmUoMCk7XHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24ubGVuZ3RoID09IDEpO1xyXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldCgwKS5nZXRUZXh0KCkgPT0gXCJ0ZXh0IDFcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImFsbG93cyB0byBzd2FwIGVsZW1lbnRzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgdmFyIGVsMSA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMFwiKTtcclxuICAgICAgICB2YXIgZWwyID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDEpO1xyXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMik7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uc3dhcCgwLCAxKTtcclxuXHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDApLmdldFRleHQoKSA9PSBcInRleHQgMVwiKTtcclxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMSkuZ2V0VGV4dCgpID09IFwidGV4dCAwXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQgKFwiYWxsb3dzIHRvIHNlbGVjdCBhbmQgcmVtZW1iZXIgaXRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xyXG4gICAgICAgIHZhciBlbDEgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDBcIik7XHJcbiAgICAgICAgdmFyIGVsMiA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMVwiKTtcclxuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDEpO1xyXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMik7XHJcblxyXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldFNlbGVjdGVkSW5kZXgoKSA9PSAtMSk7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uc2VsZWN0KDApO1xyXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldFNlbGVjdGVkSW5kZXgoKSA9PSAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiaGFzIG5vdGhpbmcgc2VsZWN0ZWQgaWYgc2VsZWN0ZWQgZWxlbWVudCBpcyByZW1vdmVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcclxuICAgICAgICB2YXIgZWwxID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpO1xyXG4gICAgICAgIHZhciBlbDIgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDFcIik7XHJcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwxKTtcclxuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDIpO1xyXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldFNlbGVjdGVkSW5kZXgoKSA9PSAtMSk7XHJcbiAgICAgICAgY29sbGVjdGlvbi5zZWxlY3QoMCk7XHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0U2VsZWN0ZWRJbmRleCgpID09IDApO1xyXG4gICAgICAgIGNvbGxlY3Rpb24ucmVtb3ZlKDApO1xyXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldFNlbGVjdGVkRWxlbWVudCgpID09IG51bGwpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJmZXRjaCBlbGVtZW50IGJ5IHBvc2l0aW9uXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcclxuICAgICAgICB2YXIgZWwxID0gbmV3IFVJTGFiZWxFbGVtZW50KG5ldyBQb3NpdGlvbigxMCwgMTApLCBuZXcgU2l6ZSgxMCwgMTApLCBcInRleHQgMFwiKTtcclxuICAgICAgICB2YXIgZWwyID0gbmV3IFVJTGFiZWxFbGVtZW50KG5ldyBQb3NpdGlvbigxNSwgMTUpLCBuZXcgU2l6ZSgxMCwgMTApLCBcInRleHQgMVwiKTtcclxuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDEpO1xyXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMik7XHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZmV0Y2hFbGVtZW50QnlPZmZzZXQoMTUsIDE1KS5nZXRUZXh0KCkgPT0gXCJ0ZXh0IDFcIik7XHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZmV0Y2hFbGVtZW50QnlPZmZzZXQoMTQsIDE0KS5nZXRUZXh0KCkgPT0gXCJ0ZXh0IDBcIik7XHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZmV0Y2hFbGVtZW50QnlPZmZzZXQoMCwgMCkgPT0gbnVsbCk7XHJcbiAgICB9KTtcclxuXHJcbn0pOyIsImRlc2NyaWJlKCdVSUVsZW1lbnQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpdChcImhhcyBkZWZhdWx0IHBvc2l0aW9uXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJRWxlbWVudCgpO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFBvc2l0aW9uKCkgaW5zdGFuY2VvZiBQb3NpdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImhhcyBkZWZhdWx0IHNpemVcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0U2l6ZSgpIGluc3RhbmNlb2YgU2l6ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImhhcyBubyB2aWV3IGJ5IGRlZmF1bHRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VmlldygpID09PSB1bmRlZmluZWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJzdG9yZXMgcGFzc2VkIHZpZXdcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XHJcbiAgICAgICAgdmFyIGV4YW1wbGVWaWV3ID0gbmV3IFVJRWxlbWVudFZpZXcoKTtcclxuICAgICAgICBlbGVtZW50LnNldFZpZXcoZXhhbXBsZVZpZXcpO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFZpZXcoKSBpbnN0YW5jZW9mICBVSUVsZW1lbnRWaWV3KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiY2FuIGNoYW5nZSBwb3NpdGlvblwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSA9PSAwKTtcclxuICAgICAgICB2YXIgcG9zaXRpb24gPSBuZXcgUG9zaXRpb24oMSwgMSk7XHJcbiAgICAgICAgZWxlbWVudC5tb3ZlVG8ocG9zaXRpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpID09IDEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJjYW4gY2hhbmdlIHNpemVcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCkgPT0gU2l6ZS5kZWZhdWx0V2lkdGgpO1xyXG4gICAgICAgIHZhciBuZXdTaXplID0gbmV3IFNpemUoMSwgMSk7XHJcbiAgICAgICAgZWxlbWVudC5zZXRTaXplKG5ld1NpemUpO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpID09IDEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJrbm93cyB0aGF0IG9mZnNldCBtYXRjaGVzL2RvZXNuJ3QgbWF0Y2hlcyBpdHMgcG9zaXRpb24gYW5kIHNpemVcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XHJcbiAgICAgICAgZWxlbWVudC5tb3ZlVG8obmV3IFBvc2l0aW9uKDAsIDApKTtcclxuICAgICAgICBlbGVtZW50LnNldFNpemUobmV3IFNpemUoMTAsIDEwKSk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuaXNPZmZzZXRJbig1LCA1KSA9PSB0cnVlKTtcclxuICAgICAgICBlbGVtZW50Lm1vdmVUbyhuZXcgUG9zaXRpb24oMTAsIDEwKSk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuaXNPZmZzZXRJbig1LCA1KSA9PSBmYWxzZSk7XHJcbiAgICB9KTtcclxufSk7IiwiZGVzY3JpYmUoJ1VJSW1hZ2VFbGVtZW50JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuICAgIGl0KFwiZXh0ZW5kcyBVSUVsZW1lbnQgYW5kIGhhcyBhbGwgb2YgaXRzIG1ldGhvZHNcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlJbWFnZUVsZW1lbnQobnVsbCwgbnVsbCwgbmV3IEltYWdlKCkpO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFNpemUgaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuc2V0U2l6ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5tb3ZlVG8gaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0UG9zaXRpb24gaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQubW92ZVRvIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LnNldFZpZXcgaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VmlldyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiY2FuJ3QgYmUgY3JlYXRlZCB3aXRob3V0IGFuIGltYWdlXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBleGNlcHRpb24gPSBudWxsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJSW1hZ2VFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGV4Y2VwdGlvbiA9IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFzc2VydChleGNlcHRpb24gIT0gbnVsbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImNhbiByZXR1cm4gYW4gaW1hZ2UgY29uc3RydWN0ZWQgd2l0aFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUltYWdlRWxlbWVudChudWxsLCBudWxsLCBuZXcgSW1hZ2UoKSk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0SW1hZ2UoKSBpbnN0YW5jZW9mIEltYWdlKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbn0pOyIsImRlc2NyaWJlKCdVSUxhYmVsRWxlbWVudCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGl0KFwiZXh0ZW5kcyBVSUVsZW1lbnQgYW5kIGhhcyBhbGwgb2YgaXRzIG1ldGhvZHNcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LnNldFNpemUgaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQubW92ZVRvIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFBvc2l0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50Lm1vdmVUbyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5zZXRWaWV3IGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFZpZXcgaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImFsc28gaGFzIGRlZmF1bHQgc2l6ZSBhbmQgcG9zaXRpb25cIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplKCkgaW5zdGFuY2VvZiBTaXplKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRQb3NpdGlvbigpaW5zdGFuY2VvZiBQb3NpdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImhhcyBkZWZhdWx0IHRleHRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRUZXh0KCkgPT0gVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFRleHQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJzdG9yZXMgdGV4dFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHRcIik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VGV4dCgpID09IFwidGV4dFwiKTtcclxuICAgICAgICBlbGVtZW50LnNldFRleHQoXCJvdGhlciB0ZXh0XCIpO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFRleHQoKSA9PSBcIm90aGVyIHRleHRcIik7XHJcbiAgICB9KTtcclxuXHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
