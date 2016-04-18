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