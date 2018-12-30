import React, { Component } from 'react';
import './Fireworks.scss';

const MAX_FIREWORKS = 3;
const MAX_SPARKS = 50;

class Spark {
    constructor() {
        this.vx = Math.random() * 5 + 0.5;
        this.vy = Math.random() * 5 + 0.5;
        this.weight = Math.random() * 0.3 + 0.03;
        this.red = Math.floor(Math.random() * 2);
        this.green = Math.floor(Math.random() * 2);
        this.blue = Math.floor(Math.random() * 2);

        if (Math.random() > 0.5) this.vx = -this.vx;
        if (Math.random() > 0.5) this.vy = -this.vy;
    }
}

class Firework {
    constructor(sparks = [], canvasWidth, canvasHeight) {
        this.sparks = sparks || [];
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.reset();
    }

    reset() {
        this.x = Math.floor(Math.random() * this.canvasWidth);
        this.y = this.canvasHeight;
        this.age = 0;
        this.phase = 'fly';
    }
}

function isColorBlack(r, g, b) {
    const blackFactor = 50;
    return r <= blackFactor && g <= blackFactor && b <= blackFactor;
}

export default class Fireworks extends Component {
    canvasRef = React.createRef();
    context = null;
    fireworks = [];
    shouldRequestAnimationFrame = true;

    componentDidMount() {
        this.context = this.canvasRef.current.getContext('2d');
        window.addEventListener('resize', this.resizeCanvas);
        this.resizeCanvas();
        this.initializeFireworks();
        this.renderCanvas();
    }

    componentWillUnmount() {
        this.shouldRequestAnimationFrame = false;
        window.removeEventListener('resize', this.resizeCanvas);
    }

    resizeCanvas = () => {
        this.context.canvas.width = window.innerWidth;
        this.context.canvas.height = window.innerHeight - 100;
    };

    initializeFireworks() {
        this.fireworks = [];
        const canvasHeight = this.canvasRef.current.height;
        const canvasWidth = this.canvasRef.current.width;

        for (let i = 0; i < MAX_FIREWORKS; i++) {
            const sparks = [];
            for (let j = 0; j < MAX_SPARKS; j++) {
                sparks.push(new Spark());
            }
            this.fireworks.push(
                new Firework(sparks, canvasWidth, canvasHeight)
            );
        }
    }

    renderCanvas = () => {
        const canvas = this.canvasRef.current;
        const context = this.context;

        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.fireworks.forEach((firework, index) => {
            if (firework.phase === 'fly') {
                firework.y = firework.y - 7;
                for (let spark = 0; spark < 15; spark++) {
                    context.beginPath();
                    context.fillStyle = `rgba(${index * 50}, ${spark *
                        17}, 0, 1)`;
                    context.rect(
                        firework.x + Math.random() * spark - spark / 2,
                        firework.y + spark * 4,
                        4,
                        4
                    );
                    context.fill();
                }
                if (Math.random() < 0.001 || firework.y < 200)
                    firework.phase = 'explode';
            } else if (firework.phase === 'explode') {
                for (let spark of firework.sparks) {
                    for (let i = 0; i < 10; i++) {
                        const trailAge = firework.age + i;
                        const x = firework.x + spark.vx * trailAge;
                        const y =
                            firework.y +
                            spark.vy * trailAge +
                            spark.weight * trailAge * spark.weight * trailAge;
                        const fade = i * 20 - firework.age * 2;
                        const r = Math.floor(spark.red * fade);
                        const g = Math.floor(spark.green * fade);
                        const b = Math.floor(spark.blue * fade);

                        if (!isColorBlack(r, g, b)) {
                            context.beginPath();
                            context.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;

                            context.rect(x, y, 4, 4);
                            context.fill();
                        }
                    }
                }
                firework.age += 1;
                if (firework.age > 100 && Math.random() < 0.05) {
                    firework.reset();
                }
            }
        });

        if (this.shouldRequestAnimationFrame) {
            requestAnimationFrame(this.renderCanvas);
        }
    };

    render() {
        return (
            <div className="Fireworks">
                <canvas ref={this.canvasRef} />
            </div>
        );
    }
}
