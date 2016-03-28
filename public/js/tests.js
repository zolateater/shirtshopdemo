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
    })

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaXQvQ2FudmFzRmFjdG9yeS5qcyIsInVuaXQvUG9zaXRpb24uanMiLCJ1bml0L1NpemUuanMiLCJ1bml0L1VJQ29sbGVjdGlvbi5qcyIsInVuaXQvVUlFbGVtZW50LmpzIiwidW5pdC9VSUltYWdlRWxlbWVudC5qcyIsInVuaXQvVUlMYWJlbEVsZW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0ZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlc2NyaWJlKCdDYW52YXNGYWN0b3J5JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0NhbnZhc1VJRmFjdG9yeX1cclxuICAgICAqL1xyXG4gICAgdmFyIGdldEZhY3RvcnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDYW52YXNVSUZhY3RvcnkoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBpdChcInNldHMgdGhlIHJpZ2h0IHZpZXcgZm9yIGEgbGFiZWwgZWxlbWVudFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgbGFiZWwgPSBnZXRGYWN0b3J5KCkuY3JlYXRlTGFiZWwoKTtcclxuICAgICAgICB2YXIgdmlldyA9IGxhYmVsLmdldFZpZXcoKTtcclxuICAgICAgICBhc3NlcnQodmlldyBpbnN0YW5jZW9mIENhbnZhc1VJTGFiZWxWaWV3KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwic2V0cyB0aGUgcmlnaHQgdmlldyBmb3IgYW4gaW1hZ2UgZWxlbWVudFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaW1nID0gZ2V0RmFjdG9yeSgpLmNyZWF0ZUltYWdlKG5ldyBJbWFnZSgpKTtcclxuICAgICAgICB2YXIgdmlldyA9IGltZy5nZXRWaWV3KCk7XHJcbiAgICAgICAgYXNzZXJ0KHZpZXcgaW5zdGFuY2VvZiBDYW52YXNVSUltYWdlVmlldyk7XHJcbiAgICB9KTtcclxufSk7IiwiZGVzY3JpYmUoJ1Bvc2l0aW9uJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaXQoXCJzYXZlcyBpdHMgY29vcmRpbmF0ZXNcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IG5ldyBQb3NpdGlvbigxLCAyKTtcclxuICAgICAgICBhc3NlcnQocG9zLmdldFgoKSA9PSAxKTtcclxuICAgICAgICBhc3NlcnQocG9zLmdldFkoKSA9PSAyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiY2FuIGJlIG1vdmVkIHByb3Blcmx5XCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwb3MgPSBuZXcgUG9zaXRpb24oMSwgMik7XHJcbiAgICAgICAgYXNzZXJ0KHBvcy5tb3ZlKDEsIDIpLmdldFgoKSA9PSAyKTtcclxuICAgICAgICBhc3NlcnQocG9zLm1vdmUoMSwgMikuZ2V0WSgpID09IDQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJoYXMgZGVmYXVsdCBwYXJhbXNcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IG5ldyBQb3NpdGlvbigpO1xyXG4gICAgICAgIGFzc2VydChwb3MuZ2V0WCgpID09IDApO1xyXG4gICAgICAgIGFzc2VydChwb3MuZ2V0WSgpID09IDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJpcyBhbiBpbW11dGFibGUgb2JqZWN0XCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwb3MgPSBuZXcgUG9zaXRpb24oKTtcclxuICAgICAgICBhc3NlcnQocG9zLmdldFgoKSA9PSAwKTtcclxuICAgICAgICBhc3NlcnQocG9zLmdldFkoKSA9PSAwKTtcclxuXHJcbiAgICAgICAgdmFyIG90aGVyUG9zID0gcG9zLm1vdmUoMSwgMSk7XHJcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRYKCkgPT0gMCk7XHJcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRZKCkgPT0gMCk7XHJcblxyXG4gICAgICAgIGFzc2VydChvdGhlclBvcy5nZXRYKCkgPT0gMSk7XHJcbiAgICAgICAgYXNzZXJ0KG90aGVyUG9zLmdldFkoKSA9PSAxKTtcclxuICAgIH0pO1xyXG59KTsiLCJkZXNjcmliZSgnU2l6ZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGl0KFwic2F2ZXMgaXRzIHNpemVcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSBuZXcgU2l6ZSgxLCAyKTtcclxuICAgICAgICBhc3NlcnQoc2l6ZS5nZXRXaWR0aCgpID09IDEpO1xyXG4gICAgICAgIGFzc2VydChzaXplLmdldEhlaWdodCgpID09IDIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJjYW4gYmUgbXVsdGlwbGllZFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2l6ZSA9IG5ldyBTaXplKDEsIDIpO1xyXG4gICAgICAgIGFzc2VydChzaXplLm11bHRpcGx5KDIpLmdldFdpZHRoKCkgPT0gMik7XHJcbiAgICAgICAgYXNzZXJ0KHNpemUubXVsdGlwbHkoMikuZ2V0SGVpZ2h0KCkgPT0gNCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImhhcyBkZWZhdWx0IHBhcmFtc1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2l6ZSA9IG5ldyBTaXplKCk7XHJcbiAgICAgICAgYXNzZXJ0KHNpemUuZ2V0V2lkdGgoKSA9PSBTaXplLmRlZmF1bHRXaWR0aCk7XHJcbiAgICAgICAgYXNzZXJ0KHNpemUuZ2V0SGVpZ2h0KCkgPT0gU2l6ZS5kZWZhdWx0SGVpZ2h0KTtcclxuICAgIH0pO1xyXG59KTsiLCJkZXNjcmliZSgnVUlDb2xsZWN0aW9uJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaXQoXCJhbGxvd3MgdG8gYWRkIGVsZW1lbnRzIGFuZCByZXRyaWV2ZSB0aGVtXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xyXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHRcIikpO1xyXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldCgwKS5nZXRUZXh0KCkgPT0gJ3RleHQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiYWRkcyBlbGVtZW50cyB0byB0aGUgZW5kXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpKTtcclxuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDFcIikpO1xyXG5cclxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMCkuZ2V0VGV4dCgpID09ICd0ZXh0IDAnKTtcclxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMSkuZ2V0VGV4dCgpID09ICd0ZXh0IDEnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiaGFzICdsZW5ndGgnIHByb3BlcnR5IHdoaWNoIGVxdWFscyB0byBhZGRlZCBlbGVtZW50cyBzaXplXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24ubGVuZ3RoID09IDApO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDBcIikpO1xyXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmxlbmd0aCA9PSAxKTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpKTtcclxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5sZW5ndGggPT0gMik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImFsbG93cyB0byByZXRyaWV2ZSBhbGwgZWxlbWVudHMgYXMgYXJyYXkgaW4gdGhlIHJpZ2h0IG9yZGVyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpKTtcclxuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDFcIikpO1xyXG5cclxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMCkuZ2V0VGV4dCgpID09ICd0ZXh0IDAnKTtcclxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMSkuZ2V0VGV4dCgpID09ICd0ZXh0IDEnKTtcclxuXHJcbiAgICAgICAgdmFyIGFsbEVsZW1lbnRzID0gY29sbGVjdGlvbi5nZXRBbGwoKTtcclxuXHJcbiAgICAgICAgYXNzZXJ0KGFsbEVsZW1lbnRzWzBdLmdldFRleHQoKSA9PSAndGV4dCAwJyk7XHJcbiAgICAgICAgYXNzZXJ0KGFsbEVsZW1lbnRzWzFdLmdldFRleHQoKSA9PSAndGV4dCAxJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImFsbG93cyB0byByZW1vdmUgYW4gZWxlbWVudCBmcm9tIGl0c2VsZlwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMFwiKSk7XHJcbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImFsbG93cyB0byByZW1vdmUgZWxlbWVudFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XHJcblxyXG4gICAgICAgIHZhciBlbDEgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDBcIik7XHJcbiAgICAgICAgdmFyIGVsMiA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMVwiKTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwxKTtcclxuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDIpO1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uLnJlbW92ZSgwKTtcclxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5sZW5ndGggPT0gMSk7XHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDApLmdldFRleHQoKSA9PSBcInRleHQgMVwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiYWxsb3dzIHRvIHN3YXAgZWxlbWVudHNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xyXG5cclxuICAgICAgICB2YXIgZWwxID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpO1xyXG4gICAgICAgIHZhciBlbDIgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDFcIik7XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMSk7XHJcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwyKTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5zd2FwKDAsIDEpO1xyXG5cclxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMCkuZ2V0VGV4dCgpID09IFwidGV4dCAxXCIpO1xyXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldCgxKS5nZXRUZXh0KCkgPT0gXCJ0ZXh0IDBcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCAoXCJhbGxvd3MgdG8gc2VsZWN0IGFuZCByZW1lbWJlciBpdFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XHJcbiAgICAgICAgdmFyIGVsMSA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMFwiKTtcclxuICAgICAgICB2YXIgZWwyID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpO1xyXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMSk7XHJcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwyKTtcclxuXHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0U2VsZWN0ZWRJbmRleCgpID09IC0xKTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbi5zZWxlY3QoMCk7XHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0U2VsZWN0ZWRJbmRleCgpID09IDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJoYXMgbm90aGluZyBzZWxlY3RlZCBpZiBzZWxlY3RlZCBlbGVtZW50IGlzIHJlbW92ZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xyXG4gICAgICAgIHZhciBlbDEgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDBcIik7XHJcbiAgICAgICAgdmFyIGVsMiA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMVwiKTtcclxuICAgICAgICBjb2xsZWN0aW9uLmFkZChlbDEpO1xyXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMik7XHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0U2VsZWN0ZWRJbmRleCgpID09IC0xKTtcclxuICAgICAgICBjb2xsZWN0aW9uLnNlbGVjdCgwKTtcclxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXRTZWxlY3RlZEluZGV4KCkgPT0gMCk7XHJcbiAgICAgICAgY29sbGVjdGlvbi5yZW1vdmUoMCk7XHJcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0U2VsZWN0ZWRFbGVtZW50KCkgPT0gbnVsbCk7XHJcbiAgICB9KVxyXG5cclxufSk7IiwiZGVzY3JpYmUoJ1VJRWxlbWVudCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGl0KFwiaGFzIGRlZmF1bHQgcG9zaXRpb25cIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0UG9zaXRpb24oKSBpbnN0YW5jZW9mIFBvc2l0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiaGFzIGRlZmF1bHQgc2l6ZVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplKCkgaW5zdGFuY2VvZiBTaXplKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiaGFzIG5vIHZpZXcgYnkgZGVmYXVsdFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRWaWV3KCkgPT09IHVuZGVmaW5lZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcInN0b3JlcyBwYXNzZWQgdmlld1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcclxuICAgICAgICB2YXIgZXhhbXBsZVZpZXcgPSBuZXcgVUlFbGVtZW50VmlldygpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0VmlldyhleGFtcGxlVmlldyk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VmlldygpIGluc3RhbmNlb2YgIFVJRWxlbWVudFZpZXcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJjYW4gY2hhbmdlIHBvc2l0aW9uXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJRWxlbWVudCgpO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpID09IDApO1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigxLCAxKTtcclxuICAgICAgICBlbGVtZW50Lm1vdmVUbyhwb3NpdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCkgPT0gMSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImNhbiBjaGFuZ2Ugc2l6ZVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSA9PSBTaXplLmRlZmF1bHRXaWR0aCk7XHJcbiAgICAgICAgdmFyIG5ld1NpemUgPSBuZXcgU2l6ZSgxLCAxKTtcclxuICAgICAgICBlbGVtZW50LnNldFNpemUobmV3U2l6ZSk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCkgPT0gMSk7XHJcbiAgICB9KTtcclxufSk7IiwiZGVzY3JpYmUoJ1VJSW1hZ2VFbGVtZW50JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuICAgIGl0KFwiZXh0ZW5kcyBVSUVsZW1lbnQgYW5kIGhhcyBhbGwgb2YgaXRzIG1ldGhvZHNcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlJbWFnZUVsZW1lbnQobnVsbCwgbnVsbCwgbmV3IEltYWdlKCkpO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFNpemUgaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuc2V0U2l6ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5tb3ZlVG8gaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0UG9zaXRpb24gaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQubW92ZVRvIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LnNldFZpZXcgaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VmlldyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiY2FuJ3QgYmUgY3JlYXRlZCB3aXRob3V0IGFuIGltYWdlXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBleGNlcHRpb24gPSBudWxsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJSW1hZ2VFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGV4Y2VwdGlvbiA9IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFzc2VydChleGNlcHRpb24gIT0gbnVsbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImNhbiByZXR1cm4gYW4gaW1hZ2UgY29uc3RydWN0ZWQgd2l0aFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUltYWdlRWxlbWVudChudWxsLCBudWxsLCBuZXcgSW1hZ2UoKSk7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0SW1hZ2UoKSBpbnN0YW5jZW9mIEltYWdlKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbn0pOyIsImRlc2NyaWJlKCdVSUxhYmVsRWxlbWVudCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGl0KFwiZXh0ZW5kcyBVSUVsZW1lbnQgYW5kIGhhcyBhbGwgb2YgaXRzIG1ldGhvZHNcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LnNldFNpemUgaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQubW92ZVRvIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFBvc2l0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50Lm1vdmVUbyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5zZXRWaWV3IGluc3RhbmNlb2YgRnVuY3Rpb24pO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFZpZXcgaW5zdGFuY2VvZiBGdW5jdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImFsc28gaGFzIGRlZmF1bHQgc2l6ZSBhbmQgcG9zaXRpb25cIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplKCkgaW5zdGFuY2VvZiBTaXplKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRQb3NpdGlvbigpaW5zdGFuY2VvZiBQb3NpdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcImhhcyBkZWZhdWx0IHRleHRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQoKTtcclxuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRUZXh0KCkgPT0gVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFRleHQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJzdG9yZXMgdGV4dFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHRcIik7XHJcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VGV4dCgpID09IFwidGV4dFwiKTtcclxuICAgICAgICBlbGVtZW50LnNldFRleHQoXCJvdGhlciB0ZXh0XCIpO1xyXG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFRleHQoKSA9PSBcIm90aGVyIHRleHRcIik7XHJcbiAgICB9KTtcclxuXHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
