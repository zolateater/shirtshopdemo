/**
 * Camera
 * Manages view changing
 * Uses spherical coordinates to change the view around the object
 *
 * @constructor
 */
function Camera()
{
    // Initial angle and distance
    this.angleTheta = 30;
    this.angleFi = 0;
    this.distance = 15;

    this.minAngleTheta = 10;
    this.maxAngleTheta = 170;

    this.position = this.getNewPosition();

    // Where to look
    this.lookAt = [0, 0, 1.3];
    this.up = [0, 0, 1];

    this.matrix = new Float32Array(16);
    this.updateMatrix();
}

/**
 * Returns new positions of a viewer
 *
 * @returns {*[]}
 */
Camera.prototype.getNewPosition = function () {
    return [
        Math.cos(this.angleFi * Camera.ToRadians) * Math.sin(this.angleTheta * Camera.ToRadians) * this.distance,
        Math.sin(this.angleTheta * Camera.ToRadians) * Math.sin(this.angleFi * Camera.ToRadians) * this.distance,
        this.distance * Math.cos(this.angleTheta * Camera.ToRadians)
    ];
};

/**
 * Moves camera around the object
 *
 * @param angleFi
 * @param angleTheta
 */
Camera.prototype.move = function (angleFi, angleTheta) {

    this.angleFi += angleFi;

    var changedAngleTheta = this.angleTheta + angleTheta;

    if (changedAngleTheta < this.maxAngleTheta && changedAngleTheta > this.minAngleTheta) {
        this.angleTheta = changedAngleTheta;
    }

    this.position = this.getNewPosition();
    this.updateMatrix();
};

/**
 * Move camera forward
 */
Camera.prototype.zoomIn = function () {
    if (this.distance > 4) {
        this.distance--;
        this.position = this.getNewPosition();
        this.updateMatrix();
    }
};

/**
 * Move camera backward
 */
Camera.prototype.zoomOut = function () {
    if (this.distance < 20) {
        this.distance++;
        this.position = this.getNewPosition();
        this.updateMatrix();
    }
};

/**
 * Sets camera angle
 *
 * @param angleFi
 * @param angleTheta
 */
Camera.prototype.setAngle = function (angleFi, angleTheta) {
    this.angleFi = angleFi;
    this.angleTheta = angleTheta;
    this.position = this.getNewPosition();
};

/**
 * Sets camera distance
 *
 * @param {Number} distance
 */
Camera.prototype.setDistance = function (distance) {
    this.distance = distance;
    this.position = this.getNewPosition();
};

/**
 * Updates view matrix
 */
Camera.prototype.updateMatrix = function () {
    mat4.lookAt(this.matrix, this.position, this.lookAt, this.up);
};

/**
 * Const for translating degrees to radians
 *
 * @type {number}
 */
Camera.ToRadians = Math.PI / 180;