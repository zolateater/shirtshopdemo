/**
 * Class for creating
 *
 * @param {Position|null} position
 * @param {Size|null} size
 * @param {string} text
 * @param {*} style
 * @constructor
 */
function UILabelElement(position, size, text, style) {
    UIElement.apply(this, [position, size]);

    if (!text) {
        text = UILabelElement.defaultText;
    }

    this.text = text;

    if (! (style instanceof Object)) {
        style = {};
    }

    this.font = style.font || UILabelElement.defaultStyle.font;
    this.color = style.color || UILabelElement.defaultStyle.color;
}

UILabelElement.prototype = Object.create(UIElement.prototype);

/**
 * Gets a text of the current UILabelElement
 *
 * @returns {string}
 */
UILabelElement.prototype.getText = function () {
    return this.text;
};

/**
 * Sets a text of the current UILabelElement
 *
 * @param {string} text
 */
UILabelElement.prototype.setText = function (text) {
    this.text = text;
};

/**
 * Returns t
 *
 * @return {string|string|*}
 */
UILabelElement.prototype.getFont = function () {
    return this.font;
};

/**
 * Sets the font of the element
 *
 * @param {string} font
 */
UILabelElement.prototype.setFont = function (font) {
    this.font = font;
};

/**
 * Returns the color of the text
 *
 * @return {string}
 */
UILabelElement.prototype.getColor = function () {
    return this.color;
};

/**
 * Sets the color of the text
 *
 * @param {string} color
 */
UILabelElement.prototype.setColor = function (color) {
    this.color = color;
};

UILabelElement.defaultText = "Введите текст...";

UILabelElement.defaultStyle = {
    font: 'Arial',
    color: '#000000'
};