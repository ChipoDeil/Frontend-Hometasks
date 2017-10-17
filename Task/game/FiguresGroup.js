var FiguresGroup = function FiguresGroup(figures_limit_length) {
    this._figures_limit_length = figures_limit_length;
    this._figures = [];
};

/**
 * @description Добавляет фигуру в коллекцию фигур на поле.
 * @param figure
 */
FiguresGroup.prototype.add = function (figure) {
    this._figures.push(figure);
};

/**
 * @description Возвращает фигуры, который в данный момент на поле.
 * @returns {Figure[]} figures
 */
FiguresGroup.prototype.getFigures = function () {
    return this._figures;
};

/**
 * @description Удаляет все фигуры с поля
 */
FiguresGroup.prototype.clear = function () {
    this._figures = [];
};

/**
 * @description Удаляет заданную фигуру с поля по ее ID.
 * @param {Figure} figure
 */
FiguresGroup.prototype.remove = function (figureID) {
    this._figures.splice(figureID, 1);
};