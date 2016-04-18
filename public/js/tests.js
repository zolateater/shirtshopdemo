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
describe('Storage', function() {

    it("remembers anything you will pass", function() {
        var text = 'Some text example';
        Storage.remember('text', text);
        assert(Storage.get('text') == text);
    });

    it("throws an exception if nothing passed", function () {
        assert.throws(function () {
            Storage.get('someValue');
        });
    });

    it("won't not allow you to create an instance", function () {
        assert.throws(function () {
            new Storage('someValue');
        });
    })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaXQvQ2FudmFzRmFjdG9yeS5qcyIsInVuaXQvQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5qcyIsInVuaXQvUG9zaXRpb24uanMiLCJ1bml0L1NpemUuanMiLCJ1bml0L1N0b3JhZ2UuanMiLCJ1bml0L1VJQ29sbGVjdGlvbi5qcyIsInVuaXQvVUlFbGVtZW50LmpzIiwidW5pdC9VSUltYWdlRWxlbWVudC5qcyIsInVuaXQvVUlMYWJlbEVsZW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZXNjcmliZSgnQ2FudmFzRmFjdG9yeScsIGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Q2FudmFzVUlGYWN0b3J5fVxuICAgICAqL1xuICAgIHZhciBnZXRGYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IENhbnZhc1VJRmFjdG9yeShkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpKTtcbiAgICB9O1xuXG5cbiAgICBpdChcInNldHMgdGhlIHJpZ2h0IHZpZXcgZm9yIGEgbGFiZWwgZWxlbWVudFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxhYmVsID0gZ2V0RmFjdG9yeSgpLmNyZWF0ZUxhYmVsKCk7XG4gICAgICAgIHZhciB2aWV3ID0gbGFiZWwuZ2V0VmlldygpO1xuICAgICAgICBhc3NlcnQodmlldyBpbnN0YW5jZW9mIENhbnZhc1VJTGFiZWxWaWV3KTtcbiAgICB9KTtcblxuICAgIGl0KFwic2V0cyB0aGUgcmlnaHQgdmlldyBmb3IgYW4gaW1hZ2UgZWxlbWVudFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGltZyA9IGdldEZhY3RvcnkoKS5jcmVhdGVJbWFnZShuZXcgSW1hZ2UoKSk7XG4gICAgICAgIHZhciB2aWV3ID0gaW1nLmdldFZpZXcoKTtcbiAgICAgICAgYXNzZXJ0KHZpZXcgaW5zdGFuY2VvZiBDYW52YXNVSUltYWdlVmlldyk7XG4gICAgfSk7XG59KTsiLCJkZXNjcmliZSgnQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlcicsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHZhciBjYW52YXNTdXJmYWNlID0gbmV3IENhbnZhc1N1cmZhY2UoY2FudmFzKTtcblxuICAgIGl0KFwiY2FsbHMgYXR0YWNoZWQgaGFuZGxlcnMgb24gc2VsZWN0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaGFuZGxlciA9IG5ldyBDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyKGNhbnZhc1N1cmZhY2UpO1xuICAgICAgICB2YXIgdmFsdWUgPSAwO1xuICAgICAgICB2YXIgY2hhbmdlVmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YWx1ZSsrO1xuICAgICAgICB9O1xuICAgICAgICBoYW5kbGVyLmFkZFNlbGVjdEV2ZW50SGFuZGxlcihjaGFuZ2VWYWx1ZSk7XG4gICAgICAgIGhhbmRsZXIudHJpZ2dlclNlbGVjdCgpO1xuICAgICAgICB2YXIgdmFsdWVIYXNDaGFuZ2VkID0gdmFsdWUgIT0gMDtcbiAgICAgICAgYXNzZXJ0KHZhbHVlSGFzQ2hhbmdlZCk7XG4gICAgfSk7XG5cbiAgICBpdChcImNhbGxzIGF0dGFjaGVkIGhhbmRsZXJzIG9uIGRlc2VsZWN0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaGFuZGxlciA9IG5ldyBDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyKGNhbnZhc1N1cmZhY2UpO1xuICAgICAgICB2YXIgdmFsdWUgPSAwO1xuICAgICAgICB2YXIgY2hhbmdlVmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YWx1ZSsrO1xuICAgICAgICB9O1xuICAgICAgICBoYW5kbGVyLmFkZERlc2VsZWN0RXZlbnRIYW5kbGVyKGNoYW5nZVZhbHVlKTtcbiAgICAgICAgaGFuZGxlci50cmlnZ2VyRGVzZWxlY3QoKTtcbiAgICAgICAgdmFyIHZhbHVlSGFzQ2hhbmdlZCA9IHZhbHVlICE9IDA7XG4gICAgICAgIGFzc2VydCh2YWx1ZUhhc0NoYW5nZWQpO1xuICAgIH0pO1xuXG59KTsiLCJkZXNjcmliZSgnUG9zaXRpb24nLCBmdW5jdGlvbigpIHtcblxuICAgIGl0KFwic2F2ZXMgaXRzIGNvb3JkaW5hdGVzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcG9zID0gbmV3IFBvc2l0aW9uKDEsIDIpO1xuICAgICAgICBhc3NlcnQocG9zLmdldFgoKSA9PSAxKTtcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRZKCkgPT0gMik7XG4gICAgfSk7XG5cbiAgICBpdChcImNhbiBiZSBtb3ZlZCBwcm9wZXJseVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBvcyA9IG5ldyBQb3NpdGlvbigxLCAyKTtcbiAgICAgICAgYXNzZXJ0KHBvcy5tb3ZlKDEsIDIpLmdldFgoKSA9PSAyKTtcbiAgICAgICAgYXNzZXJ0KHBvcy5tb3ZlKDEsIDIpLmdldFkoKSA9PSA0KTtcbiAgICB9KTtcblxuICAgIGl0KFwiaGFzIGRlZmF1bHQgcGFyYW1zXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcG9zID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgICAgIGFzc2VydChwb3MuZ2V0WCgpID09IDApO1xuICAgICAgICBhc3NlcnQocG9zLmdldFkoKSA9PSAwKTtcbiAgICB9KTtcblxuICAgIGl0KFwiaXMgYW4gaW1tdXRhYmxlIG9iamVjdFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBvcyA9IG5ldyBQb3NpdGlvbigpO1xuICAgICAgICBhc3NlcnQocG9zLmdldFgoKSA9PSAwKTtcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRZKCkgPT0gMCk7XG5cbiAgICAgICAgdmFyIG90aGVyUG9zID0gcG9zLm1vdmUoMSwgMSk7XG4gICAgICAgIGFzc2VydChwb3MuZ2V0WCgpID09IDApO1xuICAgICAgICBhc3NlcnQocG9zLmdldFkoKSA9PSAwKTtcblxuICAgICAgICBhc3NlcnQob3RoZXJQb3MuZ2V0WCgpID09IDEpO1xuICAgICAgICBhc3NlcnQob3RoZXJQb3MuZ2V0WSgpID09IDEpO1xuICAgIH0pO1xufSk7IiwiZGVzY3JpYmUoJ1NpemUnLCBmdW5jdGlvbigpIHtcblxuICAgIGl0KFwic2F2ZXMgaXRzIHNpemVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzaXplID0gbmV3IFNpemUoMSwgMik7XG4gICAgICAgIGFzc2VydChzaXplLmdldFdpZHRoKCkgPT0gMSk7XG4gICAgICAgIGFzc2VydChzaXplLmdldEhlaWdodCgpID09IDIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJjYW4gYmUgbXVsdGlwbGllZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNpemUgPSBuZXcgU2l6ZSgxLCAyKTtcbiAgICAgICAgYXNzZXJ0KHNpemUubXVsdGlwbHkoMikuZ2V0V2lkdGgoKSA9PSAyKTtcbiAgICAgICAgYXNzZXJ0KHNpemUubXVsdGlwbHkoMikuZ2V0SGVpZ2h0KCkgPT0gNCk7XG4gICAgfSk7XG5cbiAgICBpdChcImhhcyBkZWZhdWx0IHBhcmFtc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNpemUgPSBuZXcgU2l6ZSgpO1xuICAgICAgICBhc3NlcnQoc2l6ZS5nZXRXaWR0aCgpID09IFNpemUuZGVmYXVsdFdpZHRoKTtcbiAgICAgICAgYXNzZXJ0KHNpemUuZ2V0SGVpZ2h0KCkgPT0gU2l6ZS5kZWZhdWx0SGVpZ2h0KTtcbiAgICB9KTtcbn0pOyIsImRlc2NyaWJlKCdTdG9yYWdlJywgZnVuY3Rpb24oKSB7XG5cbiAgICBpdChcInJlbWVtYmVycyBhbnl0aGluZyB5b3Ugd2lsbCBwYXNzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGV4dCA9ICdTb21lIHRleHQgZXhhbXBsZSc7XG4gICAgICAgIFN0b3JhZ2UucmVtZW1iZXIoJ3RleHQnLCB0ZXh0KTtcbiAgICAgICAgYXNzZXJ0KFN0b3JhZ2UuZ2V0KCd0ZXh0JykgPT0gdGV4dCk7XG4gICAgfSk7XG5cbiAgICBpdChcInRocm93cyBhbiBleGNlcHRpb24gaWYgbm90aGluZyBwYXNzZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBhc3NlcnQudGhyb3dzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFN0b3JhZ2UuZ2V0KCdzb21lVmFsdWUnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdChcIndvbid0IG5vdCBhbGxvdyB5b3UgdG8gY3JlYXRlIGFuIGluc3RhbmNlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXNzZXJ0LnRocm93cyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBuZXcgU3RvcmFnZSgnc29tZVZhbHVlJyk7XG4gICAgICAgIH0pO1xuICAgIH0pXG59KTsiLCJkZXNjcmliZSgnVUlDb2xsZWN0aW9uJywgZnVuY3Rpb24oKSB7XG5cbiAgICBpdChcImFsbG93cyB0byBhZGQgZWxlbWVudHMgYW5kIHJldHJpZXZlIHRoZW1cIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0XCIpKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDApLmdldFRleHQoKSA9PSAndGV4dCcpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJhZGRzIGVsZW1lbnRzIHRvIHRoZSBlbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcblxuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDBcIikpO1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDFcIikpO1xuXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldCgwKS5nZXRUZXh0KCkgPT0gJ3RleHQgMCcpO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMSkuZ2V0VGV4dCgpID09ICd0ZXh0IDEnKTtcbiAgICB9KTtcblxuICAgIGl0KFwiaGFzICdsZW5ndGgnIHByb3BlcnR5IHdoaWNoIGVxdWFscyB0byBhZGRlZCBlbGVtZW50cyBzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XG5cbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24ubGVuZ3RoID09IDApO1xuXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMFwiKSk7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmxlbmd0aCA9PSAxKTtcblxuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDFcIikpO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5sZW5ndGggPT0gMik7XG4gICAgfSk7XG5cbiAgICBpdChcImFsbG93cyB0byByZXRyaWV2ZSBhbGwgZWxlbWVudHMgYXMgYXJyYXkgaW4gdGhlIHJpZ2h0IG9yZGVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XG5cbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpKTtcbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpKTtcblxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMCkuZ2V0VGV4dCgpID09ICd0ZXh0IDAnKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDEpLmdldFRleHQoKSA9PSAndGV4dCAxJyk7XG5cbiAgICAgICAgdmFyIGFsbEVsZW1lbnRzID0gY29sbGVjdGlvbi5nZXRBbGwoKTtcblxuICAgICAgICBhc3NlcnQoYWxsRWxlbWVudHNbMF0uZ2V0VGV4dCgpID09ICd0ZXh0IDAnKTtcbiAgICAgICAgYXNzZXJ0KGFsbEVsZW1lbnRzWzFdLmdldFRleHQoKSA9PSAndGV4dCAxJyk7XG4gICAgfSk7XG5cbiAgICBpdChcImFsbG93cyB0byByZW1vdmUgYW4gZWxlbWVudCBmcm9tIGl0c2VsZlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xuXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMFwiKSk7XG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMVwiKSk7XG5cbiAgICB9KTtcblxuICAgIGl0KFwiYWxsb3dzIHRvIHJlbW92ZSBlbGVtZW50XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XG5cbiAgICAgICAgdmFyIGVsMSA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMFwiKTtcbiAgICAgICAgdmFyIGVsMiA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMVwiKTtcblxuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDEpO1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDIpO1xuXG4gICAgICAgIGNvbGxlY3Rpb24ucmVtb3ZlKDApO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5sZW5ndGggPT0gMSk7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldCgwKS5nZXRUZXh0KCkgPT0gXCJ0ZXh0IDFcIik7XG4gICAgfSk7XG5cbiAgICBpdChcImFsbG93cyB0byBzd2FwIGVsZW1lbnRzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XG5cbiAgICAgICAgdmFyIGVsMSA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMFwiKTtcbiAgICAgICAgdmFyIGVsMiA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMVwiKTtcblxuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDEpO1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDIpO1xuXG4gICAgICAgIGNvbGxlY3Rpb24uc3dhcCgwLCAxKTtcblxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMCkuZ2V0VGV4dCgpID09IFwidGV4dCAxXCIpO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMSkuZ2V0VGV4dCgpID09IFwidGV4dCAwXCIpO1xuICAgIH0pO1xuXG4gICAgaXQgKFwiYWxsb3dzIHRvIHNlbGVjdCBhbmQgcmVtZW1iZXIgaXRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcbiAgICAgICAgdmFyIGVsMSA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMFwiKTtcbiAgICAgICAgdmFyIGVsMiA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMVwiKTtcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwxKTtcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwyKTtcblxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXRTZWxlY3RlZEluZGV4KCkgPT0gLTEpO1xuXG4gICAgICAgIGNvbGxlY3Rpb24uc2VsZWN0KDApO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXRTZWxlY3RlZEluZGV4KCkgPT0gMCk7XG4gICAgfSk7XG5cbiAgICBpdChcImhhcyBub3RoaW5nIHNlbGVjdGVkIGlmIHNlbGVjdGVkIGVsZW1lbnQgaXMgcmVtb3ZlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xuICAgICAgICB2YXIgZWwxID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpO1xuICAgICAgICB2YXIgZWwyID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpO1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDEpO1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDIpO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXRTZWxlY3RlZEluZGV4KCkgPT0gLTEpO1xuICAgICAgICBjb2xsZWN0aW9uLnNlbGVjdCgwKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0U2VsZWN0ZWRJbmRleCgpID09IDApO1xuICAgICAgICBjb2xsZWN0aW9uLnJlbW92ZSgwKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0U2VsZWN0ZWRFbGVtZW50KCkgPT0gbnVsbCk7XG4gICAgfSk7XG5cbiAgICBpdChcImZldGNoIGVsZW1lbnQgYnkgcG9zaXRpb25cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcbiAgICAgICAgdmFyIGVsMSA9IG5ldyBVSUxhYmVsRWxlbWVudChuZXcgUG9zaXRpb24oMTAsIDEwKSwgbmV3IFNpemUoMTAsIDEwKSwgXCJ0ZXh0IDBcIik7XG4gICAgICAgIHZhciBlbDIgPSBuZXcgVUlMYWJlbEVsZW1lbnQobmV3IFBvc2l0aW9uKDE1LCAxNSksIG5ldyBTaXplKDEwLCAxMCksIFwidGV4dCAxXCIpO1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDEpO1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDIpO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5mZXRjaEVsZW1lbnRCeU9mZnNldCgxNSwgMTUpLmdldFRleHQoKSA9PSBcInRleHQgMVwiKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZmV0Y2hFbGVtZW50QnlPZmZzZXQoMTQsIDE0KS5nZXRUZXh0KCkgPT0gXCJ0ZXh0IDBcIik7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmZldGNoRWxlbWVudEJ5T2Zmc2V0KDAsIDApID09IG51bGwpO1xuICAgIH0pO1xuXG59KTsiLCJkZXNjcmliZSgnVUlFbGVtZW50JywgZnVuY3Rpb24oKSB7XG5cbiAgICBpdChcImhhcyBkZWZhdWx0IHBvc2l0aW9uXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0UG9zaXRpb24oKSBpbnN0YW5jZW9mIFBvc2l0aW9uKTtcbiAgICB9KTtcblxuICAgIGl0KFwiaGFzIGRlZmF1bHQgc2l6ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFNpemUoKSBpbnN0YW5jZW9mIFNpemUpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJoYXMgbm8gdmlldyBieSBkZWZhdWx0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VmlldygpID09PSB1bmRlZmluZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJzdG9yZXMgcGFzc2VkIHZpZXdcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJRWxlbWVudCgpO1xuICAgICAgICB2YXIgZXhhbXBsZVZpZXcgPSBuZXcgVUlFbGVtZW50VmlldygpO1xuICAgICAgICBlbGVtZW50LnNldFZpZXcoZXhhbXBsZVZpZXcpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRWaWV3KCkgaW5zdGFuY2VvZiAgVUlFbGVtZW50Vmlldyk7XG4gICAgfSk7XG5cbiAgICBpdChcImNhbiBjaGFuZ2UgcG9zaXRpb25cIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJRWxlbWVudCgpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSA9PSAwKTtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKDEsIDEpO1xuICAgICAgICBlbGVtZW50Lm1vdmVUbyhwb3NpdGlvbik7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpID09IDEpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJjYW4gY2hhbmdlIHNpemVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJRWxlbWVudCgpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSA9PSBTaXplLmRlZmF1bHRXaWR0aCk7XG4gICAgICAgIHZhciBuZXdTaXplID0gbmV3IFNpemUoMSwgMSk7XG4gICAgICAgIGVsZW1lbnQuc2V0U2l6ZShuZXdTaXplKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCkgPT0gMSk7XG4gICAgfSk7XG5cbiAgICBpdChcImtub3dzIHRoYXQgb2Zmc2V0IG1hdGNoZXMvZG9lc24ndCBtYXRjaGVzIGl0cyBwb3NpdGlvbiBhbmQgc2l6ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XG4gICAgICAgIGVsZW1lbnQubW92ZVRvKG5ldyBQb3NpdGlvbigwLCAwKSk7XG4gICAgICAgIGVsZW1lbnQuc2V0U2l6ZShuZXcgU2l6ZSgxMCwgMTApKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuaXNPZmZzZXRJbig1LCA1KSA9PSB0cnVlKTtcbiAgICAgICAgZWxlbWVudC5tb3ZlVG8obmV3IFBvc2l0aW9uKDEwLCAxMCkpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5pc09mZnNldEluKDUsIDUpID09IGZhbHNlKTtcbiAgICB9KTtcbn0pOyIsImRlc2NyaWJlKCdVSUltYWdlRWxlbWVudCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKVxuXG4gICAgaXQoXCJleHRlbmRzIFVJRWxlbWVudCBhbmQgaGFzIGFsbCBvZiBpdHMgbWV0aG9kc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlJbWFnZUVsZW1lbnQobnVsbCwgbnVsbCwgbmV3IEltYWdlKCkpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5zZXRTaXplIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5tb3ZlVG8gaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFBvc2l0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5tb3ZlVG8gaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgICAgIGFzc2VydChlbGVtZW50LnNldFZpZXcgaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFZpZXcgaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgfSk7XG5cbiAgICBpdChcImNhbid0IGJlIGNyZWF0ZWQgd2l0aG91dCBhbiBpbWFnZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGV4Y2VwdGlvbiA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUltYWdlRWxlbWVudCgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBleGNlcHRpb24gPSBlO1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydChleGNlcHRpb24gIT0gbnVsbCk7XG4gICAgfSk7XG5cbiAgICBpdChcImNhbiByZXR1cm4gYW4gaW1hZ2UgY29uc3RydWN0ZWQgd2l0aFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlJbWFnZUVsZW1lbnQobnVsbCwgbnVsbCwgbmV3IEltYWdlKCkpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRJbWFnZSgpIGluc3RhbmNlb2YgSW1hZ2UpO1xuICAgIH0pO1xuXG5cbn0pOyIsImRlc2NyaWJlKCdVSUxhYmVsRWxlbWVudCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgaXQoXCJleHRlbmRzIFVJRWxlbWVudCBhbmQgaGFzIGFsbCBvZiBpdHMgbWV0aG9kc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQoKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0U2l6ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuc2V0U2l6ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQubW92ZVRvIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRQb3NpdGlvbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQubW92ZVRvIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5zZXRWaWV3IGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRWaWV3IGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgIH0pO1xuXG4gICAgaXQoXCJhbHNvIGhhcyBkZWZhdWx0IHNpemUgYW5kIHBvc2l0aW9uXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUxhYmVsRWxlbWVudCgpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplKCkgaW5zdGFuY2VvZiBTaXplKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0UG9zaXRpb24oKWluc3RhbmNlb2YgUG9zaXRpb24pO1xuICAgIH0pO1xuXG4gICAgaXQoXCJoYXMgZGVmYXVsdCB0ZXh0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUxhYmVsRWxlbWVudCgpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRUZXh0KCkgPT0gVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFRleHQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJzdG9yZXMgdGV4dFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0XCIpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRUZXh0KCkgPT0gXCJ0ZXh0XCIpO1xuICAgICAgICBlbGVtZW50LnNldFRleHQoXCJvdGhlciB0ZXh0XCIpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRUZXh0KCkgPT0gXCJvdGhlciB0ZXh0XCIpO1xuICAgIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
