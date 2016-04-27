/**
 * Object for creating VBO and storing it
 * to have capability to dynamically change current model
 *
 * @param gl
 * @param jsonModel
 * @constructor
 */
function Model(gl, jsonModel) {
    this.buildBuffers(gl, jsonModel)
}

/**
 * Binds all buffers
 *
 * @param gl
 * @param jsonModel
 */
Model.prototype.buildBuffers = function (gl, jsonModel)
{
    // Создаем буферы
    this.modelVertexes = jsonModel.meshes[0].vertices;
    this.modelIndexes = Array.prototype.concat.apply([], jsonModel.meshes[0].faces);
    this.modelTexCoords = jsonModel.meshes[0].texturecoords[0];
    this.modelNormals = jsonModel.meshes[0].normals;

    // Создаем буфер - через него передается информация в GPU
    this.modelVertexBufferObject = gl.createBuffer();
    // Назначаем его активным
    gl.bindBuffer(gl.ARRAY_BUFFER, this.modelVertexBufferObject);
    // STATIC_DRAW - копируем единожды из CPU в GPU
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.modelVertexes), gl.STATIC_DRAW);

    // Отдельный буфер для текстурных координат
    this.modelTexCoordsBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.modelTexCoordsBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.modelTexCoords), gl.STATIC_DRAW);

    // Создаем индексный буфер для указания порядка вершин
    this.modelIndexBufferObject = gl.createBuffer();
    // Назначаем его активным
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.modelIndexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.modelIndexes), gl.STATIC_DRAW);

    // Буфер с нормалями
    this.modelNormalBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.modelNormalBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.modelNormals), gl.STATIC_DRAW);
};

Model.prototype.bindBuffers = function (gl) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.modelVertexBufferObject);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.modelTexCoordsBufferObject);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.modelIndexBufferObject);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.modelNormalBufferObject);
};