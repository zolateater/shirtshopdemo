/**
 * Camera
 * Manages view changing
 * Uses spherical coordinates to change the view around the object
 *
 * @constructor
 */
function Camera()
{
    this.angleTheta = 30;

    this.minAngleTheta = 10;
    this.maxAngleTheta = 170;

    this.angleFi = 0;
    this.distance = 20;

    this.position = this.getNewPosition();

    this.lookAt = [0, 0, 1.5];
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

Camera.prototype.move = function (angleFi, angleTheta) {

    this.angleFi += angleFi;

    var changedAngleTheta = this.angleTheta + angleTheta;

    if (changedAngleTheta < this.maxAngleTheta && changedAngleTheta > this.minAngleTheta) {
        this.angleTheta = changedAngleTheta;
    }

    this.position = this.getNewPosition();
    this.updateMatrix();
};

Camera.prototype.rotateRight = function (deltaAngle)
{
    this.angle += de;
    this.position = this.getNewPosition();
    this.updateMatrix();
};

Camera.prototype.updateMatrix = function () {
    // Позиция наблюдателя, куда он смотрит, плюс вектор верха
    mat4.lookAt(this.matrix, this.position, this.lookAt, this.up);
};

Camera.ToRadians = Math.PI / 180;