/**
 * @param canvas
 * @param {CanvasRenderingContext2D} glContext
 * @param {Image} initialTexture
 * @param {string} vertexShader
 * @param {string} fragmentShader
 * @constructor
 */
function ModelView(canvas, glContext, initialTexture, vertexShader, fragmentShader) {

    this.canvas = canvas;
    this.gl = glContext;

    this.texture = initialTexture;
    this.initialize(vertexShader, fragmentShader);

    this.camera = new Camera();

    this.setTexture(initialTexture);
}

/**
 *
 * @param {string} vertexShader - vertex shader source
 * @param {string} fragmentShader - fragment shader source
 */
ModelView.prototype.initialize = function (vertexShader, fragmentShader)
{
    var gl = this.gl;

    // Включаем проверку глубины
    gl.enable(gl.DEPTH_TEST);

    // Задаем цвет очистки
    gl.clearColor(0.8, 0.9, 0.9 , 0.0);
    // Очистка - что очищаем - буфер цвета, или же буфер глубины
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var shaderCompiler = new ShaderCompiler(gl);
    this.shaderProgram = shaderCompiler.makeProgram(vertexShader, fragmentShader);
};

/**
 * Sets a new texture as active texture
 * 
 * @param {Image} image
 */
ModelView.prototype.setTexture = function (image) {

    this.texture = image;
    var gl = this.gl;

    // Creating texture
    this.modelTexture = gl.createTexture();
    // Binding it
    gl.bindTexture(gl.TEXTURE_2D, this.modelTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    // i for integer , s, t - u, v
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // Filters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // Сама текстура
    gl.texImage2D(
        gl.TEXTURE_2D, // Texture type
        0, // Detail level
        gl.RGBA, // What format do we use
        gl.RGBA,
        gl.UNSIGNED_BYTE, // Data type
        this.texture // Texture itself
    );
    // Unbind for now
    gl.bindTexture(gl.TEXTURE_2D, null);
};

/**
 * Sets active model and binds all of the buffers
 *
 * @param {Model} model
 */
ModelView.prototype.setModel = function (model) {

    this.model = model;
    var program = this.shaderProgram;
    var gl = this.gl;

    model.bindBuffers(gl);

    // Уведомляем шейдер о том, как брать данные из буфера в качестве входных параметров
    var positionAttributeLocation = gl.getAttribLocation(program, 'vertPosition');

    gl.bindBuffer(gl.ARRAY_BUFFER, model.modelVertexBufferObject);
    gl.vertexAttribPointer(
        positionAttributeLocation, // наш атрибут
        3, // Количество элементов на атрибут
        gl.FLOAT, // Тип каждого элемента буфера
        gl.FALSE, // Нормализованный вид?
        3 * Float32Array.BYTES_PER_ELEMENT, // Размер одной вершины (байт)
        0 // Отступ (в байтах) от начала данных, принадлежащих одной вершине
    );
    // Включаем атрибут
    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, model.modelTexCoordsBufferObject);
    var texCoordAttributeLocation = gl.getAttribLocation(program, 'vertTexCoord');
    gl.vertexAttribPointer(
        texCoordAttributeLocation, // наш атрибут
        2, // Количество элементов на атрибут
        gl.FLOAT, // Тип каждого элемента буфера
        gl.FALSE, // Нормализованный вид?
        2 * Float32Array.BYTES_PER_ELEMENT, // Размер одной вершины (байт)
        0 // Отступ (в байтах) от начала данных, принадлежащих одной вершине
    );
    gl.enableVertexAttribArray(texCoordAttributeLocation);

    // Нормали в шейдере
    gl.bindBuffer(gl.ARRAY_BUFFER, model.modelNormalBufferObject);
    var normalAttributeLocation = gl.getAttribLocation(program, 'vertNormal');
    gl.vertexAttribPointer(
        normalAttributeLocation, // наш атрибут
        3, // Количество элементов на атрибут
        gl.FLOAT, // Тип каждого элемента буфера
        gl.TRUE, // Нормализованный вид?
        3 * Float32Array.BYTES_PER_ELEMENT, // Размер одной вершины (байт)
        0 // Отступ (в байтах) от начала данных, принадлежащих одной вершине
    );
    gl.enableVertexAttribArray(normalAttributeLocation);

};

ModelView.prototype.startRender = function () {
    var gl = this.gl;

    // Матрицы - местоположение в шейдерах
    this.matWorldUniformLocation = gl.getUniformLocation(this.shaderProgram, 'mWorld');
    this.matViewUniformLocation = gl.getUniformLocation(this.shaderProgram, 'mView');
    this.matProjectionUniformLocation = gl.getUniformLocation(this.shaderProgram, 'mProjection');

    // Сами матрицы
    var worldMatrix = new Float32Array(16);
    var projectionMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);

    // Поле обзора (в радианах), viewport, closest plane, far plane
    mat4.perspective(projectionMatrix, glMatrix.toRadian(30), this.canvas.width / this.canvas.height, 0.1, 1000.0);

    // Какую шейдерную программу используем
    gl.useProgram(this.shaderProgram);

    // Передаем в шейдер. TRUE - чтобы транспонировать
    gl.uniformMatrix4fv(this.matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(this.matViewUniformLocation, gl.FALSE, this.camera.matrix);
    gl.uniformMatrix4fv(this.matProjectionUniformLocation, gl.FALSE, projectionMatrix);

    this.bindCanvasHandlers();

    // Сберегаем вычислительные мощности
    // Главный цикр рендера
    requestAnimationFrame(this.loop.bind(this));
};

/**
 * Render loop
 */
ModelView.prototype.loop = function ()
{
    var gl = this.gl;
    // Обновляем переменную в шейдере
    gl.uniformMatrix4fv(this.matViewUniformLocation, gl.FALSE, this.camera.matrix);

    // Назначение текстуры
    gl.bindTexture(gl.TEXTURE_2D, this.modelTexture);

    // Активный слот текстуры
    gl.activeTexture(gl.TEXTURE0);

    // Цвет очистки
    gl.clearColor(0.8, 0.9, 0.9 ,1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT );

    gl.drawElements(
        gl.TRIANGLES, // Как рисуем,
        this.model.modelIndexes.length,
        gl.UNSIGNED_SHORT, // Тип
        0 // Сколько пропускам вершин
    );
    requestAnimationFrame(this.loop.bind(this));
};


ModelView.prototype.bindCanvasHandlers = function () {
    var sensitivity = 15;

    var isMousePressed = false;
    var initialEvent = null;

    var camera = this.camera;

    this.canvas.addEventListener('mousedown', function(e) {
        isMousePressed = true;
        initialEvent = e;
    });

    this.canvas.addEventListener('mouseup', function (e) {
        isMousePressed = false;
        initialEvent = null;
    });

    this.canvas.addEventListener('mousemove', function (e) {
        if (isMousePressed) {
            var diffX = initialEvent.clientX - e.clientX;
            var diffY = initialEvent.clientY - e.clientY;
            initialEvent = e;

            camera.move(diffX, diffY);
        }
    });
};