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

    it("can push element to the end of the collection and remembers selection", function () {
        var collection = new UICollection();
        var el0 = new UILabelElement(null, null, "text 0");
        var el1 = new UILabelElement(null, null, "text 1");
        var el2 = new UILabelElement(null, null, "text 2");
        var el3 = new UILabelElement(null, null, "text 3");

        collection.add(el0);
        collection.add(el1);
        collection.add(el2);
        collection.add(el3);

        collection.select(2);
        collection.toEnd(2);

        assert(collection.get(0).getText() == 'text 0');
        assert(collection.get(1).getText() == 'text 1');
        assert(collection.get(2).getText() == 'text 3');
        assert(collection.get(3).getText() == 'text 2');

        assert(collection.getSelectedElement().getText() == "text 2");
    });

    it("can push to the start of the collection and remembers selection", function () {
        var collection = new UICollection();

        var el0 = new UILabelElement(null, null, "text 0");
        var el1 = new UILabelElement(null, null, "text 1");
        var el2 = new UILabelElement(null, null, "text 2");
        var el3 = new UILabelElement(null, null, "text 3");

        collection.add(el0);
        collection.add(el1);
        collection.add(el2);
        collection.add(el3);

        collection.select(2);
        collection.toStart(2);

        assert(collection.get(0).getText() == 'text 2');
        assert(collection.get(1).getText() == 'text 0');
        assert(collection.get(2).getText() == 'text 1');
        assert(collection.get(3).getText() == 'text 3');

        assert(collection.getSelectedElement().getText() == "text 2");
    })

});