/**
 * Part of the document for manipulation with properties 
 * of the selected UIElement on CanvasSurface
 *
 * Aware of the document content
 * Handles HTML manipulations
 *
 * @constructor
 */
function PropertiesPanel(surface)
{
    this._textPanel = {
        panel: document.getElementById('textOptions'),
        selectFont: document.getElementById('fontSelect'),
        selectColor: document.getElementById('colorFontSelect'),
        textArea: document.getElementById('selectedTextContent'),
        textUpButton: document.getElementById('textUpBtn'),
        textDownButton: document.getElementById('textDownBtn')
    };
    
    this._commonPanel = {
        panel: document.getElementById('commonOptions'),
        removeBtn: document.getElementById('removeBtn'),
        upBtn: document.getElementById('upBtn'),
        downBtn: document.getElementById('downBtn')
    };
    
    this._imagePanel = {
        panel: document.getElementById('imageOptions')
    };
    this._emptyPanel = document.getElementById('noSelectedOptions');
    
    this._selectedElement = null;
    this._surface = surface;
}

/**
 * Binds handlers to the events
 */
PropertiesPanel.prototype.bindHandlers = function () {
    var self = this;

    // Selection events from canvas surface
    this._surface.addSelectEventHandler(function (uiElement) {
        self.setSelected(uiElement);
    });
    this._surface.addDeselectEventHandler(function () {
        self.setSelected(null);
    });

    // Button click for common options - remove currently selected element
    this._commonPanel.removeBtn.addEventListener('click', function (event) {
        self._surface.removeSelected();
        self._surface.render();
    });

    // Move foreground
    this._commonPanel.upBtn.addEventListener('click', function (event) {
        self._surface.selectedToForeground();
        self._surface.render();
    });

    // Move background
    this._commonPanel.downBtn.addEventListener('click', function (event) {
        self._surface.selectedToBackground();
        self._surface.render();
    });

    // Binding text change event through text area element
    this._textPanel.textArea.addEventListener('input', function (e) {
        // If this event happened
        // then we have a label as selected element
        self._selectedElement.setText(this.value);
        self._surface.render();
    });

    // Updates selected font
    this._textPanel.selectFont.addEventListener('change', function () {
        self._selectedElement.setFont(this.value);
        self._surface.render();
    });

    // Updates selected color
    this._textPanel.selectColor.addEventListener('change', function () {
        self._selectedElement.setColor(this.value);
        self._surface.render();
    });
};

/**
 * Sets selected element.
 * Show properties window depending on what is the type of an element 
 * 
 * @param {UIElement|null} uiElement
 */
PropertiesPanel.prototype.setSelected = function (uiElement) {
    this._selectedElement = uiElement;
    
    if (uiElement instanceof UILabelElement) {
        this.showTextProperties();
        return;
    }
    
    if (uiElement instanceof UIImageElement) {
        this.showImageProperties();
        return
    }
    
    this.showNothingSelectedPanel();
};

/**
 * Hides all of the panels
 */
PropertiesPanel.prototype.hideAll = function () {
    this._textPanel.panel.classList.add('hidden');
    this._imagePanel.panel.classList.add('hidden');
    this._commonPanel.panel.classList.add('hidden');
    this._emptyPanel.classList.add('hidden');
};

/**
 * Hides all except text properties panel
 */
PropertiesPanel.prototype.showTextProperties = function () {
    this.hideAll();
    this._textPanel.textArea.innerHTML = this._selectedElement.getText();
    this._textPanel.selectFont.value = this._selectedElement.getFont();
    this._textPanel.selectColor.value = this._selectedElement.getColor();
    this._textPanel.panel.classList.remove('hidden');
    this._commonPanel.panel.classList.remove('hidden');
};

/**
 * Hides everything except images panel
 */
PropertiesPanel.prototype.showImageProperties = function () {
    this.hideAll();
    this._imagePanel.panel.classList.remove('hidden');
    this._commonPanel.panel.classList.remove('hidden');
};

/**
 * Hides all except "nothing selected" panel
 */
PropertiesPanel.prototype.showNothingSelectedPanel = function () {
    this.hideAll();
    this._emptyPanel.classList.remove('hidden');
};