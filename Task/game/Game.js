/**
 * @description Создает экземпляр игры
 * @param max_figures - принимает макс. кол-во фигур, которые можно поставить на поле мышкой.
 * @constructor
 */
var Game = function Game(max_figures) {
    this.name = "Популяция фигур";
    this.figuresGroup = null;
    this.figuresCounterElement = null;
    this.interval = null;
    this.MAX_FIGURES_NUMBER = max_figures;
    this._inited = false;
};

Game.FIELD = null;


/**
 * @description Тут может быть любая логика инициализации игры
 */
Game.prototype.initialize = function () {
    if (FiguresGroup) {
        this.figuresGroup = new FiguresGroup(this.MAX_FIGURES_NUMBER);
    }
    this.figuresCounterElement = document.querySelector('.fields__elements-count');

    Game.FIELD = document.querySelector('.field');

    this._inited = true;
};
var _this;
/**
 * @description Функция run запускает игру
 */
Game.prototype.run = function () {
    if (!this._inited) {
        this.initialize();
        console.log("init");
    }

    /* Скрываем кнопку Play */
    var backdrop = document.querySelector('.field__backdrop');
    if (backdrop) {
        backdrop.style.visibility = 'hidden';
    }

    /* Каждые 1000/40 миллисекунд (40 FPS) вызываем перерисовку фигур с изменившимися координатами */
    _this = this;
    this.interval = setInterval(function () {
        _this.nextFrame();
    }, 1000 / 40);
};

/**
 * @description Для каждой фигуры вызывается функция go, которая самостоятельно меняет координаты своей фигуры.
 */
Game.prototype.nextFrame = function () {
    var figures = this.figuresGroup.getFigures();
    for (var figureIndex in figures) {
        figures[figureIndex].go();
    }
};

Game.prototype.addFigure = function () {
    if(this.figuresGroup.getFigures().length < this.MAX_FIGURES_NUMBER){
        var height = getRandom(100,200);
        var width = getRandom(100,200);
        var velocity = getRandom(-5,5);
        if(velocity == 0)
            velocity += 1;
        var type = getRandom(1,4);
        var figure;
        switch (type) {
            case 1:
                figure = new Rectangle(height, width, velocity);
                break;
            case 2: 
                figure = new Square(height, velocity);
                break;
            case 3: 
                figure = new Ellipse(height, width, velocity);
                break;
            case 4: 
                figure = new Circle(height, velocity);
                break;
            default:
                figure = new Figure(height, width, velocity);
                break;
        }
        this.figuresGroup.add(figure);
    }
};

Game.prototype.incrementValue = function(){
    var field = document.querySelector('span.fields__elements-count');
    field.innerHTML = "<strong>"+this.figuresGroup.getFigures().length+"</strong>";
}

document.addEventListener('DOMContentLoaded', function () {
    var body = document.querySelector('body');
    body.addEventListener('click', function () {
        if(_this && _this._inited){
            _this.addFigure();
            _this.incrementValue();
        }
    });
});
