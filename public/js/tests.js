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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaXQvQ2FudmFzRmFjdG9yeS5qcyIsInVuaXQvUG9zaXRpb24uanMiLCJ1bml0L1NpemUuanMiLCJ1bml0L1VJRWxlbWVudC5qcyIsInVuaXQvVUlJbWFnZUVsZW1lbnQuanMiLCJ1bml0L1VJTGFiZWxFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZXNjcmliZSgnQ2FudmFzRmFjdG9yeScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtDYW52YXNVSUZhY3Rvcnl9XHJcbiAgICAgKi9cclxuICAgIHZhciBnZXRGYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ2FudmFzVUlGYWN0b3J5KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJykpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgaXQoXCJzZXRzIHRoZSByaWdodCB2aWV3IGZvciBhIGxhYmVsIGVsZW1lbnRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGxhYmVsID0gZ2V0RmFjdG9yeSgpLmNyZWF0ZUxhYmVsKCk7XHJcbiAgICAgICAgdmFyIHZpZXcgPSBsYWJlbC5nZXRWaWV3KCk7XHJcbiAgICAgICAgYXNzZXJ0KHZpZXcgaW5zdGFuY2VvZiBDYW52YXNVSUxhYmVsVmlldyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcInNldHMgdGhlIHJpZ2h0IHZpZXcgZm9yIGFuIGltYWdlIGVsZW1lbnRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGltZyA9IGdldEZhY3RvcnkoKS5jcmVhdGVJbWFnZShuZXcgSW1hZ2UoKSk7XHJcbiAgICAgICAgdmFyIHZpZXcgPSBpbWcuZ2V0VmlldygpO1xyXG4gICAgICAgIGFzc2VydCh2aWV3IGluc3RhbmNlb2YgQ2FudmFzVUlJbWFnZVZpZXcpO1xyXG4gICAgfSk7XHJcbn0pOyIsImRlc2NyaWJlKCdQb3NpdGlvbicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGl0KFwic2F2ZXMgaXRzIGNvb3JkaW5hdGVzXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwb3MgPSBuZXcgUG9zaXRpb24oMSwgMik7XHJcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRYKCkgPT0gMSk7XHJcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRZKCkgPT0gMik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImNhbiBiZSBtb3ZlZCBwcm9wZXJseVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcG9zID0gbmV3IFBvc2l0aW9uKDEsIDIpO1xyXG4gICAgICAgIGFzc2VydChwb3MubW92ZSgxLCAyKS5nZXRYKCkgPT0gMik7XHJcbiAgICAgICAgYXNzZXJ0KHBvcy5tb3ZlKDEsIDIpLmdldFkoKSA9PSA0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiaGFzIGRlZmF1bHQgcGFyYW1zXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwb3MgPSBuZXcgUG9zaXRpb24oKTtcclxuICAgICAgICBhc3NlcnQocG9zLmdldFgoKSA9PSAwKTtcclxuICAgICAgICBhc3NlcnQocG9zLmdldFkoKSA9PSAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiaXMgYW4gaW1tdXRhYmxlIG9iamVjdFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcG9zID0gbmV3IFBvc2l0aW9uKCk7XHJcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRYKCkgPT0gMCk7XHJcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRZKCkgPT0gMCk7XHJcblxyXG4gICAgICAgIHZhciBvdGhlclBvcyA9IHBvcy5tb3ZlKDEsIDEpO1xyXG4gICAgICAgIGFzc2VydChwb3MuZ2V0WCgpID09IDApO1xyXG4gICAgICAgIGFzc2VydChwb3MuZ2V0WSgpID09IDApO1xyXG5cclxuICAgICAgICBhc3NlcnQob3RoZXJQb3MuZ2V0WCgpID09IDEpO1xyXG4gICAgICAgIGFzc2VydChvdGhlclBvcy5nZXRZKCkgPT0gMSk7XHJcbiAgICB9KTtcclxufSk7IiwiZGVzY3JpYmUoJ1NpemUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpdChcInNhdmVzIGl0cyBzaXplXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzaXplID0gbmV3IFNpemUoMSwgMik7XHJcbiAgICAgICAgYXNzZXJ0KHNpemUuZ2V0V2lkdGgoKSA9PSAxKTtcclxuICAgICAgICBhc3NlcnQoc2l6ZS5nZXRIZWlnaHQoKSA9PSAyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiY2FuIGJlIG11bHRpcGxpZWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSBuZXcgU2l6ZSgxLCAyKTtcclxuICAgICAgICBhc3NlcnQoc2l6ZS5tdWx0aXBseSgyKS5nZXRXaWR0aCgpID09IDIpO1xyXG4gICAgICAgIGFzc2VydChzaXplLm11bHRpcGx5KDIpLmdldEhlaWdodCgpID09IDQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJoYXMgZGVmYXVsdCBwYXJhbXNcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSBuZXcgU2l6ZSgpO1xyXG4gICAgICAgIGFzc2VydChzaXplLmdldFdpZHRoKCkgPT0gU2l6ZS5kZWZhdWx0V2lkdGgpO1xyXG4gICAgICAgIGFzc2VydChzaXplLmdldEhlaWdodCgpID09IFNpemUuZGVmYXVsdEhlaWdodCk7XHJcbiAgICB9KTtcclxufSk7IiwiZGVzY3JpYmUoJ1VJRWxlbWVudCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGl0KFwiaGFzIGRlZmF1bHQgcG9zaXRpb25cIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0UG9zaXRpb24oKSBpbnN0YW5jZW9mIFBvc2l0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiaGFzIGRlZmF1bHQgc2l6ZVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplKCkgaW5zdGFuY2VvZiBTaXplKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiaGFzIG5vIHZpZXcgYnkgZGVmYXVsdFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRWaWV3KCkgPT09IHVuZGVmaW5lZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcInN0b3JlcyBwYXNzZWQgdmlld1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcclxuICAgICAgICB2YXIgZXhhbXBsZVZpZXcgPSBuZXcgVUlFbGVtZW50VmlldygpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0VmlldyhleGFtcGxlVmlldyk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VmlldygpIGluc3RhbmNlb2YgIFVJRWxlbWVudFZpZXcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJjYW4gY2hhbmdlIHBvc2l0aW9uXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJRWxlbWVudCgpO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpID09IDApO1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigxLCAxKTtcclxuICAgICAgICBlbGVtZW50Lm1vdmVUbyhwb3NpdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCkgPT0gMSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImNhbiBjaGFuZ2Ugc2l6ZVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSA9PSBTaXplLmRlZmF1bHRXaWR0aCk7XHJcbiAgICAgICAgdmFyIG5ld1NpemUgPSBuZXcgU2l6ZSgxLCAxKTtcclxuICAgICAgICBlbGVtZW50LnNldFNpemUobmV3U2l6ZSk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCkgPT0gMSk7XHJcbiAgICB9KTtcclxufSk7IiwiZGVzY3JpYmUoJ1VJSW1hZ2VFbGVtZW50JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuICAgIGl0KFwiZXh0ZW5kcyBVSUVsZW1lbnQgYW5kIGhhcyBhbGwgb2YgaXRzIG1ldGhvZHNcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlJbWFnZUVsZW1lbnQobnVsbCwgbnVsbCwgbmV3IEltYWdlKCkpO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFNpemUgaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuc2V0U2l6ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5tb3ZlVG8gaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0UG9zaXRpb24gaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQubW92ZVRvIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LnNldFZpZXcgaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VmlldyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiY2FuJ3QgYmUgY3JlYXRlZCB3aXRob3V0IGFuIGltYWdlXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBleGNlcHRpb24gPSBudWxsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJSW1hZ2VFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGV4Y2VwdGlvbiA9IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFzc2VydChleGNlcHRpb24gIT0gbnVsbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImNhbiByZXR1cm4gYW4gaW1hZ2UgY29uc3RydWN0ZWQgd2l0aFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUltYWdlRWxlbWVudChudWxsLCBudWxsLCBuZXcgSW1hZ2UoKSk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0SW1hZ2UoKSBpbnN0YW5jZW9mIEltYWdlKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbn0pOyIsImRlc2NyaWJlKCdVSUxhYmVsRWxlbWVudCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGl0KFwiZXh0ZW5kcyBVSUVsZW1lbnQgYW5kIGhhcyBhbGwgb2YgaXRzIG1ldGhvZHNcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LnNldFNpemUgaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQubW92ZVRvIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFBvc2l0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50Lm1vdmVUbyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5zZXRWaWV3IGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFZpZXcgaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImFsc28gaGFzIGRlZmF1bHQgc2l6ZSBhbmQgcG9zaXRpb25cIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplKCkgaW5zdGFuY2VvZiBTaXplKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRQb3NpdGlvbigpaW5zdGFuY2VvZiBQb3NpdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImhhcyBkZWZhdWx0IHRleHRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRUZXh0KCkgPT0gVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFRleHQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJzdG9yZXMgdGV4dFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHRcIik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VGV4dCgpID09IFwidGV4dFwiKTtcclxuICAgICAgICBlbGVtZW50LnNldFRleHQoXCJvdGhlciB0ZXh0XCIpO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFRleHQoKSA9PSBcIm90aGVyIHRleHRcIik7XHJcbiAgICB9KTtcclxuXHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
