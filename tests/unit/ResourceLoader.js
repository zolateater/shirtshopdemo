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