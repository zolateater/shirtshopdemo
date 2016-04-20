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