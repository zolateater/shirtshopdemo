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
describe('ResourceLoader', function() {

    it("loads requested image", function (done) {
        var image = null;

        var loader = new ResourceLoader();

        loader.loadImage('/img/logoGrey.jpg', function () {
            image = this;
        });

        setTimeout(function () {
            assert(image instanceof Image);
            done();
        }, 300);
    });

    it("loads requested text", function (done) {
        var text = '';

        var loader = new ResourceLoader();

        loader.loadText('/index.html', function (responseText) {
            text = responseText;
        });

        setTimeout(function () {
            assert(text.length != 0);
            done();
        }, 500);
    });

});
describe('ResourcePreparer', function() {

    var getMock = function () {
        return {
            loadImage: function (src, callback) {
                var image = new Image();
                callback.bind(image)();
            },
            loadText: function (src, callback) {
                callback(src)
            },
            loadJsonObject: function (src, callback) {
                callback(src);
            }
        }
    };

    it("loads all objects you want and calls function you have passed as callback", function (done) {
        var isCallbackCalled = false;

        var resourcePreparer = new ResourcePreparer(getMock(), [
            { key: 'image', src: 'something.png', type: 'image'},
            { key: 'text', src: 'text', type: 'text'},
            { key: 'json', src: 'json', type: 'json'}
        ], function () {
            isCallbackCalled = true;
        });

        resourcePreparer.startLoading();

        assert(isCallbackCalled == true);
        done();
    });

    it("throws an exception if type is not passed", function () {
         var resourcePreparer = new ResourcePreparer(getMock(), [
             {key : 'someKey', src: 'somePath'}
         ], function() {});

        assert.throws(function () {
            resourcePreparer.startLoading();
        })
    });

    it("saves all loaded resources to the storage", function () {
        var resourcePreparer = new ResourcePreparer(getMock(), [
            { key: 'image', src: 'something.png', type: 'image'},
            { key: 'text', src: 'text', type: 'text'},
            { key: 'json', src: 'json', type: 'json'}
        ], function () {});

        resourcePreparer.startLoading();

        assert(Storage.get('image') instanceof Image);
        assert.equal(Storage.get('text'), 'text');
        assert.equal(Storage.get('json'), 'json');
    })
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

    it("has style options allowed to be changed", function () {
        var element = new UILabelElement(null, null, "text");
        assert(element.getFont() != null);

        element.setFont('Comic Sans');
        assert(element.getFont() == 'Comic Sans');

        element.setColor('Black');
        assert(element.getColor() == 'Black');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaXQvQ2FudmFzRmFjdG9yeS5qcyIsInVuaXQvQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5qcyIsInVuaXQvUG9zaXRpb24uanMiLCJ1bml0L1Jlc291cmNlTG9hZGVyLmpzIiwidW5pdC9SZXNvdXJjZVByZXBhcmVyLmpzIiwidW5pdC9TaXplLmpzIiwidW5pdC9TdG9yYWdlLmpzIiwidW5pdC9VSUNvbGxlY3Rpb24uanMiLCJ1bml0L1VJRWxlbWVudC5qcyIsInVuaXQvVUlJbWFnZUVsZW1lbnQuanMiLCJ1bml0L1VJTGFiZWxFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVzY3JpYmUoJ0NhbnZhc0ZhY3RvcnknLCBmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge0NhbnZhc1VJRmFjdG9yeX1cbiAgICAgKi9cbiAgICB2YXIgZ2V0RmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDYW52YXNVSUZhY3RvcnkoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKSk7XG4gICAgfTtcblxuXG4gICAgaXQoXCJzZXRzIHRoZSByaWdodCB2aWV3IGZvciBhIGxhYmVsIGVsZW1lbnRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsYWJlbCA9IGdldEZhY3RvcnkoKS5jcmVhdGVMYWJlbCgpO1xuICAgICAgICB2YXIgdmlldyA9IGxhYmVsLmdldFZpZXcoKTtcbiAgICAgICAgYXNzZXJ0KHZpZXcgaW5zdGFuY2VvZiBDYW52YXNVSUxhYmVsVmlldyk7XG4gICAgfSk7XG5cbiAgICBpdChcInNldHMgdGhlIHJpZ2h0IHZpZXcgZm9yIGFuIGltYWdlIGVsZW1lbnRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpbWcgPSBnZXRGYWN0b3J5KCkuY3JlYXRlSW1hZ2UobmV3IEltYWdlKCkpO1xuICAgICAgICB2YXIgdmlldyA9IGltZy5nZXRWaWV3KCk7XG4gICAgICAgIGFzc2VydCh2aWV3IGluc3RhbmNlb2YgQ2FudmFzVUlJbWFnZVZpZXcpO1xuICAgIH0pO1xufSk7IiwiZGVzY3JpYmUoJ0NhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXInLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB2YXIgY2FudmFzU3VyZmFjZSA9IG5ldyBDYW52YXNTdXJmYWNlKGNhbnZhcyk7XG5cbiAgICBpdChcImNhbGxzIGF0dGFjaGVkIGhhbmRsZXJzIG9uIHNlbGVjdFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBuZXcgQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlcihjYW52YXNTdXJmYWNlKTtcbiAgICAgICAgdmFyIHZhbHVlID0gMDtcbiAgICAgICAgdmFyIGNoYW5nZVZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFsdWUrKztcbiAgICAgICAgfTtcbiAgICAgICAgaGFuZGxlci5hZGRTZWxlY3RFdmVudEhhbmRsZXIoY2hhbmdlVmFsdWUpO1xuICAgICAgICBoYW5kbGVyLnRyaWdnZXJTZWxlY3QoKTtcbiAgICAgICAgdmFyIHZhbHVlSGFzQ2hhbmdlZCA9IHZhbHVlICE9IDA7XG4gICAgICAgIGFzc2VydCh2YWx1ZUhhc0NoYW5nZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJjYWxscyBhdHRhY2hlZCBoYW5kbGVycyBvbiBkZXNlbGVjdFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBuZXcgQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlcihjYW52YXNTdXJmYWNlKTtcbiAgICAgICAgdmFyIHZhbHVlID0gMDtcbiAgICAgICAgdmFyIGNoYW5nZVZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFsdWUrKztcbiAgICAgICAgfTtcbiAgICAgICAgaGFuZGxlci5hZGREZXNlbGVjdEV2ZW50SGFuZGxlcihjaGFuZ2VWYWx1ZSk7XG4gICAgICAgIGhhbmRsZXIudHJpZ2dlckRlc2VsZWN0KCk7XG4gICAgICAgIHZhciB2YWx1ZUhhc0NoYW5nZWQgPSB2YWx1ZSAhPSAwO1xuICAgICAgICBhc3NlcnQodmFsdWVIYXNDaGFuZ2VkKTtcbiAgICB9KTtcblxufSk7IiwiZGVzY3JpYmUoJ1Bvc2l0aW9uJywgZnVuY3Rpb24oKSB7XG5cbiAgICBpdChcInNhdmVzIGl0cyBjb29yZGluYXRlc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBvcyA9IG5ldyBQb3NpdGlvbigxLCAyKTtcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRYKCkgPT0gMSk7XG4gICAgICAgIGFzc2VydChwb3MuZ2V0WSgpID09IDIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJjYW4gYmUgbW92ZWQgcHJvcGVybHlcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwb3MgPSBuZXcgUG9zaXRpb24oMSwgMik7XG4gICAgICAgIGFzc2VydChwb3MubW92ZSgxLCAyKS5nZXRYKCkgPT0gMik7XG4gICAgICAgIGFzc2VydChwb3MubW92ZSgxLCAyKS5nZXRZKCkgPT0gNCk7XG4gICAgfSk7XG5cbiAgICBpdChcImhhcyBkZWZhdWx0IHBhcmFtc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBvcyA9IG5ldyBQb3NpdGlvbigpO1xuICAgICAgICBhc3NlcnQocG9zLmdldFgoKSA9PSAwKTtcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRZKCkgPT0gMCk7XG4gICAgfSk7XG5cbiAgICBpdChcImlzIGFuIGltbXV0YWJsZSBvYmplY3RcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwb3MgPSBuZXcgUG9zaXRpb24oKTtcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRYKCkgPT0gMCk7XG4gICAgICAgIGFzc2VydChwb3MuZ2V0WSgpID09IDApO1xuXG4gICAgICAgIHZhciBvdGhlclBvcyA9IHBvcy5tb3ZlKDEsIDEpO1xuICAgICAgICBhc3NlcnQocG9zLmdldFgoKSA9PSAwKTtcbiAgICAgICAgYXNzZXJ0KHBvcy5nZXRZKCkgPT0gMCk7XG5cbiAgICAgICAgYXNzZXJ0KG90aGVyUG9zLmdldFgoKSA9PSAxKTtcbiAgICAgICAgYXNzZXJ0KG90aGVyUG9zLmdldFkoKSA9PSAxKTtcbiAgICB9KTtcbn0pOyIsImRlc2NyaWJlKCdSZXNvdXJjZUxvYWRlcicsIGZ1bmN0aW9uKCkge1xuXG4gICAgaXQoXCJsb2FkcyByZXF1ZXN0ZWQgaW1hZ2VcIiwgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgdmFyIGltYWdlID0gbnVsbDtcblxuICAgICAgICB2YXIgbG9hZGVyID0gbmV3IFJlc291cmNlTG9hZGVyKCk7XG5cbiAgICAgICAgbG9hZGVyLmxvYWRJbWFnZSgnL2ltZy9sb2dvR3JleS5qcGcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpbWFnZSA9IHRoaXM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXNzZXJ0KGltYWdlIGluc3RhbmNlb2YgSW1hZ2UpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCAzMDApO1xuICAgIH0pO1xuXG4gICAgaXQoXCJsb2FkcyByZXF1ZXN0ZWQgdGV4dFwiLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICB2YXIgdGV4dCA9ICcnO1xuXG4gICAgICAgIHZhciBsb2FkZXIgPSBuZXcgUmVzb3VyY2VMb2FkZXIoKTtcblxuICAgICAgICBsb2FkZXIubG9hZFRleHQoJy9pbmRleC5odG1sJywgZnVuY3Rpb24gKHJlc3BvbnNlVGV4dCkge1xuICAgICAgICAgICAgdGV4dCA9IHJlc3BvbnNlVGV4dDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhc3NlcnQodGV4dC5sZW5ndGggIT0gMCk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfSk7XG5cbn0pOyIsImRlc2NyaWJlKCdSZXNvdXJjZVByZXBhcmVyJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgZ2V0TW9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxvYWRJbWFnZTogZnVuY3Rpb24gKHNyYywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5iaW5kKGltYWdlKSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxvYWRUZXh0OiBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNyYylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsb2FkSnNvbk9iamVjdDogZnVuY3Rpb24gKHNyYywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhzcmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGl0KFwibG9hZHMgYWxsIG9iamVjdHMgeW91IHdhbnQgYW5kIGNhbGxzIGZ1bmN0aW9uIHlvdSBoYXZlIHBhc3NlZCBhcyBjYWxsYmFja1wiLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICB2YXIgaXNDYWxsYmFja0NhbGxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHZhciByZXNvdXJjZVByZXBhcmVyID0gbmV3IFJlc291cmNlUHJlcGFyZXIoZ2V0TW9jaygpLCBbXG4gICAgICAgICAgICB7IGtleTogJ2ltYWdlJywgc3JjOiAnc29tZXRoaW5nLnBuZycsIHR5cGU6ICdpbWFnZSd9LFxuICAgICAgICAgICAgeyBrZXk6ICd0ZXh0Jywgc3JjOiAndGV4dCcsIHR5cGU6ICd0ZXh0J30sXG4gICAgICAgICAgICB7IGtleTogJ2pzb24nLCBzcmM6ICdqc29uJywgdHlwZTogJ2pzb24nfVxuICAgICAgICBdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpc0NhbGxiYWNrQ2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzb3VyY2VQcmVwYXJlci5zdGFydExvYWRpbmcoKTtcblxuICAgICAgICBhc3NlcnQoaXNDYWxsYmFja0NhbGxlZCA9PSB0cnVlKTtcbiAgICAgICAgZG9uZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0aHJvd3MgYW4gZXhjZXB0aW9uIGlmIHR5cGUgaXMgbm90IHBhc3NlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICB2YXIgcmVzb3VyY2VQcmVwYXJlciA9IG5ldyBSZXNvdXJjZVByZXBhcmVyKGdldE1vY2soKSwgW1xuICAgICAgICAgICAgIHtrZXkgOiAnc29tZUtleScsIHNyYzogJ3NvbWVQYXRoJ31cbiAgICAgICAgIF0sIGZ1bmN0aW9uKCkge30pO1xuXG4gICAgICAgIGFzc2VydC50aHJvd3MoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVzb3VyY2VQcmVwYXJlci5zdGFydExvYWRpbmcoKTtcbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIGl0KFwic2F2ZXMgYWxsIGxvYWRlZCByZXNvdXJjZXMgdG8gdGhlIHN0b3JhZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzb3VyY2VQcmVwYXJlciA9IG5ldyBSZXNvdXJjZVByZXBhcmVyKGdldE1vY2soKSwgW1xuICAgICAgICAgICAgeyBrZXk6ICdpbWFnZScsIHNyYzogJ3NvbWV0aGluZy5wbmcnLCB0eXBlOiAnaW1hZ2UnfSxcbiAgICAgICAgICAgIHsga2V5OiAndGV4dCcsIHNyYzogJ3RleHQnLCB0eXBlOiAndGV4dCd9LFxuICAgICAgICAgICAgeyBrZXk6ICdqc29uJywgc3JjOiAnanNvbicsIHR5cGU6ICdqc29uJ31cbiAgICAgICAgXSwgZnVuY3Rpb24gKCkge30pO1xuXG4gICAgICAgIHJlc291cmNlUHJlcGFyZXIuc3RhcnRMb2FkaW5nKCk7XG5cbiAgICAgICAgYXNzZXJ0KFN0b3JhZ2UuZ2V0KCdpbWFnZScpIGluc3RhbmNlb2YgSW1hZ2UpO1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RvcmFnZS5nZXQoJ3RleHQnKSwgJ3RleHQnKTtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0b3JhZ2UuZ2V0KCdqc29uJyksICdqc29uJyk7XG4gICAgfSlcbn0pOyIsImRlc2NyaWJlKCdTaXplJywgZnVuY3Rpb24oKSB7XG5cbiAgICBpdChcInNhdmVzIGl0cyBzaXplXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2l6ZSA9IG5ldyBTaXplKDEsIDIpO1xuICAgICAgICBhc3NlcnQoc2l6ZS5nZXRXaWR0aCgpID09IDEpO1xuICAgICAgICBhc3NlcnQoc2l6ZS5nZXRIZWlnaHQoKSA9PSAyKTtcbiAgICB9KTtcblxuICAgIGl0KFwiY2FuIGJlIG11bHRpcGxpZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzaXplID0gbmV3IFNpemUoMSwgMik7XG4gICAgICAgIGFzc2VydChzaXplLm11bHRpcGx5KDIpLmdldFdpZHRoKCkgPT0gMik7XG4gICAgICAgIGFzc2VydChzaXplLm11bHRpcGx5KDIpLmdldEhlaWdodCgpID09IDQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJoYXMgZGVmYXVsdCBwYXJhbXNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzaXplID0gbmV3IFNpemUoKTtcbiAgICAgICAgYXNzZXJ0KHNpemUuZ2V0V2lkdGgoKSA9PSBTaXplLmRlZmF1bHRXaWR0aCk7XG4gICAgICAgIGFzc2VydChzaXplLmdldEhlaWdodCgpID09IFNpemUuZGVmYXVsdEhlaWdodCk7XG4gICAgfSk7XG59KTsiLCJkZXNjcmliZSgnU3RvcmFnZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgaXQoXCJyZW1lbWJlcnMgYW55dGhpbmcgeW91IHdpbGwgcGFzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRleHQgPSAnU29tZSB0ZXh0IGV4YW1wbGUnO1xuICAgICAgICBTdG9yYWdlLnJlbWVtYmVyKCd0ZXh0JywgdGV4dCk7XG4gICAgICAgIGFzc2VydChTdG9yYWdlLmdldCgndGV4dCcpID09IHRleHQpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ0aHJvd3MgYW4gZXhjZXB0aW9uIGlmIG5vdGhpbmcgcGFzc2VkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXNzZXJ0LnRocm93cyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBTdG9yYWdlLmdldCgnc29tZVZhbHVlJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ3b24ndCBub3QgYWxsb3cgeW91IHRvIGNyZWF0ZSBhbiBpbnN0YW5jZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFzc2VydC50aHJvd3MoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbmV3IFN0b3JhZ2UoJ3NvbWVWYWx1ZScpO1xuICAgICAgICB9KTtcbiAgICB9KVxufSk7IiwiZGVzY3JpYmUoJ1VJQ29sbGVjdGlvbicsIGZ1bmN0aW9uKCkge1xuXG4gICAgaXQoXCJhbGxvd3MgdG8gYWRkIGVsZW1lbnRzIGFuZCByZXRyaWV2ZSB0aGVtXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dFwiKSk7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldCgwKS5nZXRUZXh0KCkgPT0gJ3RleHQnKTtcbiAgICB9KTtcblxuICAgIGl0KFwiYWRkcyBlbGVtZW50cyB0byB0aGUgZW5kXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XG5cbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAwXCIpKTtcbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpKTtcblxuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMCkuZ2V0VGV4dCgpID09ICd0ZXh0IDAnKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDEpLmdldFRleHQoKSA9PSAndGV4dCAxJyk7XG4gICAgfSk7XG5cbiAgICBpdChcImhhcyAnbGVuZ3RoJyBwcm9wZXJ0eSB3aGljaCBlcXVhbHMgdG8gYWRkZWQgZWxlbWVudHMgc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xuXG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmxlbmd0aCA9PSAwKTtcblxuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDBcIikpO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5sZW5ndGggPT0gMSk7XG5cbiAgICAgICAgY29sbGVjdGlvbi5hZGQobmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dCAxXCIpKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24ubGVuZ3RoID09IDIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJhbGxvd3MgdG8gcmV0cmlldmUgYWxsIGVsZW1lbnRzIGFzIGFycmF5IGluIHRoZSByaWdodCBvcmRlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xuXG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMFwiKSk7XG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMVwiKSk7XG5cbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDApLmdldFRleHQoKSA9PSAndGV4dCAwJyk7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldCgxKS5nZXRUZXh0KCkgPT0gJ3RleHQgMScpO1xuXG4gICAgICAgIHZhciBhbGxFbGVtZW50cyA9IGNvbGxlY3Rpb24uZ2V0QWxsKCk7XG5cbiAgICAgICAgYXNzZXJ0KGFsbEVsZW1lbnRzWzBdLmdldFRleHQoKSA9PSAndGV4dCAwJyk7XG4gICAgICAgIGFzc2VydChhbGxFbGVtZW50c1sxXS5nZXRUZXh0KCkgPT0gJ3RleHQgMScpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJhbGxvd3MgdG8gcmVtb3ZlIGFuIGVsZW1lbnQgZnJvbSBpdHNlbGZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcblxuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDBcIikpO1xuICAgICAgICBjb2xsZWN0aW9uLmFkZChuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDFcIikpO1xuXG4gICAgfSk7XG5cbiAgICBpdChcImFsbG93cyB0byByZW1vdmUgZWxlbWVudFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xuXG4gICAgICAgIHZhciBlbDEgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDBcIik7XG4gICAgICAgIHZhciBlbDIgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDFcIik7XG5cbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwxKTtcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwyKTtcblxuICAgICAgICBjb2xsZWN0aW9uLnJlbW92ZSgwKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24ubGVuZ3RoID09IDEpO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5nZXQoMCkuZ2V0VGV4dCgpID09IFwidGV4dCAxXCIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJhbGxvd3MgdG8gc3dhcCBlbGVtZW50c1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IFVJQ29sbGVjdGlvbigpO1xuXG4gICAgICAgIHZhciBlbDEgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDBcIik7XG4gICAgICAgIHZhciBlbDIgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDFcIik7XG5cbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwxKTtcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwyKTtcblxuICAgICAgICBjb2xsZWN0aW9uLnN3YXAoMCwgMSk7XG5cbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDApLmdldFRleHQoKSA9PSBcInRleHQgMVwiKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0KDEpLmdldFRleHQoKSA9PSBcInRleHQgMFwiKTtcbiAgICB9KTtcblxuICAgIGl0IChcImFsbG93cyB0byBzZWxlY3QgYW5kIHJlbWVtYmVyIGl0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XG4gICAgICAgIHZhciBlbDEgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDBcIik7XG4gICAgICAgIHZhciBlbDIgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0IDFcIik7XG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMSk7XG4gICAgICAgIGNvbGxlY3Rpb24uYWRkKGVsMik7XG5cbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0U2VsZWN0ZWRJbmRleCgpID09IC0xKTtcblxuICAgICAgICBjb2xsZWN0aW9uLnNlbGVjdCgwKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0U2VsZWN0ZWRJbmRleCgpID09IDApO1xuICAgIH0pO1xuXG4gICAgaXQoXCJoYXMgbm90aGluZyBzZWxlY3RlZCBpZiBzZWxlY3RlZCBlbGVtZW50IGlzIHJlbW92ZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcbiAgICAgICAgdmFyIGVsMSA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMFwiKTtcbiAgICAgICAgdmFyIGVsMiA9IG5ldyBVSUxhYmVsRWxlbWVudChudWxsLCBudWxsLCBcInRleHQgMVwiKTtcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwxKTtcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwyKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZ2V0U2VsZWN0ZWRJbmRleCgpID09IC0xKTtcbiAgICAgICAgY29sbGVjdGlvbi5zZWxlY3QoMCk7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldFNlbGVjdGVkSW5kZXgoKSA9PSAwKTtcbiAgICAgICAgY29sbGVjdGlvbi5yZW1vdmUoMCk7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmdldFNlbGVjdGVkRWxlbWVudCgpID09IG51bGwpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJmZXRjaCBlbGVtZW50IGJ5IHBvc2l0aW9uXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBuZXcgVUlDb2xsZWN0aW9uKCk7XG4gICAgICAgIHZhciBlbDEgPSBuZXcgVUlMYWJlbEVsZW1lbnQobmV3IFBvc2l0aW9uKDEwLCAxMCksIG5ldyBTaXplKDEwLCAxMCksIFwidGV4dCAwXCIpO1xuICAgICAgICB2YXIgZWwyID0gbmV3IFVJTGFiZWxFbGVtZW50KG5ldyBQb3NpdGlvbigxNSwgMTUpLCBuZXcgU2l6ZSgxMCwgMTApLCBcInRleHQgMVwiKTtcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwxKTtcbiAgICAgICAgY29sbGVjdGlvbi5hZGQoZWwyKTtcbiAgICAgICAgYXNzZXJ0KGNvbGxlY3Rpb24uZmV0Y2hFbGVtZW50QnlPZmZzZXQoMTUsIDE1KS5nZXRUZXh0KCkgPT0gXCJ0ZXh0IDFcIik7XG4gICAgICAgIGFzc2VydChjb2xsZWN0aW9uLmZldGNoRWxlbWVudEJ5T2Zmc2V0KDE0LCAxNCkuZ2V0VGV4dCgpID09IFwidGV4dCAwXCIpO1xuICAgICAgICBhc3NlcnQoY29sbGVjdGlvbi5mZXRjaEVsZW1lbnRCeU9mZnNldCgwLCAwKSA9PSBudWxsKTtcbiAgICB9KTtcblxufSk7IiwiZGVzY3JpYmUoJ1VJRWxlbWVudCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgaXQoXCJoYXMgZGVmYXVsdCBwb3NpdGlvblwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFBvc2l0aW9uKCkgaW5zdGFuY2VvZiBQb3NpdGlvbik7XG4gICAgfSk7XG5cbiAgICBpdChcImhhcyBkZWZhdWx0IHNpemVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJRWxlbWVudCgpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRTaXplKCkgaW5zdGFuY2VvZiBTaXplKTtcbiAgICB9KTtcblxuICAgIGl0KFwiaGFzIG5vIHZpZXcgYnkgZGVmYXVsdFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KCk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFZpZXcoKSA9PT0gdW5kZWZpbmVkKTtcbiAgICB9KTtcblxuICAgIGl0KFwic3RvcmVzIHBhc3NlZCB2aWV3XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcbiAgICAgICAgdmFyIGV4YW1wbGVWaWV3ID0gbmV3IFVJRWxlbWVudFZpZXcoKTtcbiAgICAgICAgZWxlbWVudC5zZXRWaWV3KGV4YW1wbGVWaWV3KTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VmlldygpIGluc3RhbmNlb2YgIFVJRWxlbWVudFZpZXcpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJjYW4gY2hhbmdlIHBvc2l0aW9uXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCkgPT0gMCk7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigxLCAxKTtcbiAgICAgICAgZWxlbWVudC5tb3ZlVG8ocG9zaXRpb24pO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSA9PSAxKTtcbiAgICB9KTtcblxuICAgIGl0KFwiY2FuIGNoYW5nZSBzaXplXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IG5ldyBVSUVsZW1lbnQoKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCkgPT0gU2l6ZS5kZWZhdWx0V2lkdGgpO1xuICAgICAgICB2YXIgbmV3U2l6ZSA9IG5ldyBTaXplKDEsIDEpO1xuICAgICAgICBlbGVtZW50LnNldFNpemUobmV3U2l6ZSk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpID09IDEpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJrbm93cyB0aGF0IG9mZnNldCBtYXRjaGVzL2RvZXNuJ3QgbWF0Y2hlcyBpdHMgcG9zaXRpb24gYW5kIHNpemVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJRWxlbWVudCgpO1xuICAgICAgICBlbGVtZW50Lm1vdmVUbyhuZXcgUG9zaXRpb24oMCwgMCkpO1xuICAgICAgICBlbGVtZW50LnNldFNpemUobmV3IFNpemUoMTAsIDEwKSk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmlzT2Zmc2V0SW4oNSwgNSkgPT0gdHJ1ZSk7XG4gICAgICAgIGVsZW1lbnQubW92ZVRvKG5ldyBQb3NpdGlvbigxMCwgMTApKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuaXNPZmZzZXRJbig1LCA1KSA9PSBmYWxzZSk7XG4gICAgfSk7XG59KTsiLCJkZXNjcmliZSgnVUlJbWFnZUVsZW1lbnQnLCBmdW5jdGlvbigpIHtcblxuICAgIC8vIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJylcblxuICAgIGl0KFwiZXh0ZW5kcyBVSUVsZW1lbnQgYW5kIGhhcyBhbGwgb2YgaXRzIG1ldGhvZHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJSW1hZ2VFbGVtZW50KG51bGwsIG51bGwsIG5ldyBJbWFnZSgpKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0U2l6ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuc2V0U2l6ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQubW92ZVRvIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRQb3NpdGlvbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQubW92ZVRvIGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5zZXRWaWV3IGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRWaWV3IGluc3RhbmNlb2YgRnVuY3Rpb24pO1xuICAgIH0pO1xuXG4gICAgaXQoXCJjYW4ndCBiZSBjcmVhdGVkIHdpdGhvdXQgYW4gaW1hZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBleGNlcHRpb24gPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlJbWFnZUVsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZXhjZXB0aW9uID0gZTtcbiAgICAgICAgfVxuICAgICAgICBhc3NlcnQoZXhjZXB0aW9uICE9IG51bGwpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJjYW4gcmV0dXJuIGFuIGltYWdlIGNvbnN0cnVjdGVkIHdpdGhcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJSW1hZ2VFbGVtZW50KG51bGwsIG51bGwsIG5ldyBJbWFnZSgpKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0SW1hZ2UoKSBpbnN0YW5jZW9mIEltYWdlKTtcbiAgICB9KTtcblxuXG59KTsiLCJkZXNjcmliZSgnVUlMYWJlbEVsZW1lbnQnLCBmdW5jdGlvbigpIHtcblxuICAgIGl0KFwiZXh0ZW5kcyBVSUVsZW1lbnQgYW5kIGhhcyBhbGwgb2YgaXRzIG1ldGhvZHNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJTGFiZWxFbGVtZW50KCk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFNpemUgaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgICAgIGFzc2VydChlbGVtZW50LnNldFNpemUgaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgICAgIGFzc2VydChlbGVtZW50Lm1vdmVUbyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0UG9zaXRpb24gaW5zdGFuY2VvZiBGdW5jdGlvbik7XG4gICAgICAgIGFzc2VydChlbGVtZW50Lm1vdmVUbyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuc2V0VmlldyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VmlldyBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbiAgICB9KTtcblxuICAgIGl0KFwiYWxzbyBoYXMgZGVmYXVsdCBzaXplIGFuZCBwb3NpdGlvblwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQoKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0U2l6ZSgpIGluc3RhbmNlb2YgU2l6ZSk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldFBvc2l0aW9uKClpbnN0YW5jZW9mIFBvc2l0aW9uKTtcbiAgICB9KTtcblxuICAgIGl0KFwiaGFzIGRlZmF1bHQgdGV4dFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQoKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VGV4dCgpID09IFVJTGFiZWxFbGVtZW50LmRlZmF1bHRUZXh0KTtcbiAgICB9KTtcblxuICAgIGl0KFwic3RvcmVzIHRleHRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbmV3IFVJTGFiZWxFbGVtZW50KG51bGwsIG51bGwsIFwidGV4dFwiKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VGV4dCgpID09IFwidGV4dFwiKTtcbiAgICAgICAgZWxlbWVudC5zZXRUZXh0KFwib3RoZXIgdGV4dFwiKTtcbiAgICAgICAgYXNzZXJ0KGVsZW1lbnQuZ2V0VGV4dCgpID09IFwib3RoZXIgdGV4dFwiKTtcbiAgICB9KTtcblxuICAgIGl0KFwiaGFzIHN0eWxlIG9wdGlvbnMgYWxsb3dlZCB0byBiZSBjaGFuZ2VkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBuZXcgVUlMYWJlbEVsZW1lbnQobnVsbCwgbnVsbCwgXCJ0ZXh0XCIpO1xuICAgICAgICBhc3NlcnQoZWxlbWVudC5nZXRGb250KCkgIT0gbnVsbCk7XG5cbiAgICAgICAgZWxlbWVudC5zZXRGb250KCdDb21pYyBTYW5zJyk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldEZvbnQoKSA9PSAnQ29taWMgU2FucycpO1xuXG4gICAgICAgIGVsZW1lbnQuc2V0Q29sb3IoJ0JsYWNrJyk7XG4gICAgICAgIGFzc2VydChlbGVtZW50LmdldENvbG9yKCkgPT0gJ0JsYWNrJyk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
