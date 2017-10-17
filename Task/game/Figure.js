/**
 * @description Конструктор класса Figure. Это базовый класс для всех фигур.
 * @param width
 * @param height
 * @param velocity - Скорость
 * @constructor
 */
var Figure = function Figure(width, height, velocity) {
    width = width || 24;
    height = height || 24;
    velocity = velocity || 1;

    Figure.AUTO_INCREMENT++;

    this.id = Figure.AUTO_INCREMENT;
    this.name = 'Неопознаная фигура';
    this.width = width;
    this.height = height;
    this.velocity = velocity;
    this.background = "cyan";
    this.x = event.clientX;
    this.y = event.clientY;
    this.init();
};

Figure.prototype.init = function () {
    this.createElement(this.width, this.height, 0, this.background);
    Figure.prototype.insertElement(this.element);
};

/* статическое поле */
Figure.AUTO_INCREMENT = 0;

Figure.prototype.element = null;

/**
 * @description Вставляет DOM элемент в поле.
 * @param element
 */
Figure.prototype.insertElement = function (element) {
    var field = document.querySelector('.field');
    field.appendChild(element);
};

Figure.prototype.createElement = function(width, height, border, background){
    var _element = document.createElement("div");
    _element.style.position = "absolute";
    _element.style.width = width + "px";
    _element.style.height = height + "px";
    _element.style.top = this.y + "px";
    _element.style.left = this.x + "px";
    _element.style.borderRadius = border + "%";
    _element.style.background = background;
    this.element =  _element;
}

/**
 * @description Функция, которая должна вызываться из класса Game всякий раз, когда нужно изменить координаты для фигуры.
 */
Figure.prototype.go = function () {
    if (!this.element) {
        throw new Error('The element not set');
    }

    if( (this.x < 0 || this.y < 0 ) && this.velocity < 0)
        this.velocity *= -1;
    else  if( ( (this.x+this.width) > document.querySelector('.field').offsetWidth 
    || (this.y+this.height) > document.querySelector('.field').offsetHeight ) && this.velocity > 0)
        this.velocity *= -1;

    

        
    this.x += this.velocity;
    this.y += this.velocity;
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    /* Тут должна быть логика изменения координат для объекта */
};



/**
 * @description Конструктор класса Ellipse. Класс наследуется от Figure и создает элемент "Эллипс".
 * @constructor
 */
var Ellipse = function Ellipse() {
    Figure.apply(this, arguments);
};
Ellipse.prototype = Object.create(Figure.prototype);
Ellipse.prototype.init = function(){
    this.borderRadius = 50;
    this.background = "#F5D69F";
    this.createElement(this.width, this.height, this.borderRadius, this.background);
    Figure.prototype.insertElement(this.element);
}


/**
 * @description Конструктор класса Circle. Класс наследуется от Ellipse и создает элемент "Круг".
 * @constructor
 */
var Circle = function Circle(radius, velocity) {
    this.width = radius;
    this.height = radius;
    this.background = "#90A5F4";
    this.velocity = velocity;
    
    Figure.AUTO_INCREMENT++;
    
    this.id = Figure.AUTO_INCREMENT;
    this.name = "Я круг";
    this.x = event.clientX;
    this.y = event.clientY;
    this.init();
};
Circle.prototype = Object.create(Ellipse.prototype);
Circle.prototype.init = function(){
    this.borderRadius = 100;
    this.createElement(this.width, this.height, this.borderRadius, this.background);
    Figure.prototype.insertElement(this.element);
}


/**
 * @description Конструктор класса Rectangle. Класс наследуется от Figure и создает элемент "Прямоугольник".
 * @constructor
 */
var Rectangle = function Rectangle(width, height, velocity) {
    Figure.apply(this, arguments);
};
Rectangle.prototype = Object.create(Figure.prototype);
Rectangle.prototype.init = function(){
    this.background = "#F5936E";
    this.name = "Я прямоугольник";
    this.createElement(this.width, this.height, 0, this.background);
    Figure.prototype.insertElement(this.element);
}



/**
 * @description Конструктор класса Square. Класс наследуется от Rectangle и создает элемент "Квадрат".
 * @constructor
 */
var Square = function Square(size, velocity) {
    this.width = size;
    this.height = size;
    this.background = "#EF8DA4";
    this.velocity = velocity;
    
    Figure.AUTO_INCREMENT++;
    
    this.id = Figure.AUTO_INCREMENT;
    this.name = "Я квадрат";
    this.x = event.clientX;
    this.y = event.clientY;
    this.init();
};

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.init = function(){
    this.createElement(this.width, this.height, 0, this.background);
    Figure.prototype.insertElement(this.element);
}