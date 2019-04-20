import {Point} from "./point";
import {relative} from "../helpers";

export class Chart {
    constructor(points, color, name, visible) {
        this.points = points;
        this.color = color;
        this.name = name;
        this.visible = visible;
    };

    minX() {
        return Point.minX(this.points);
    }

    maxX() {
        return Point.maxX(this.points);
    }

    minY() {
        return Point.minY(this.points);
    }

    maxY() {
        return Point.maxY(this.points);
    }

    getY(x) {
        const points = this.points.filter(p => p.x === x);
        return points.length > 0 ? points[0].y : NaN;
    }

    drawLine(ctx, minY, maxY, dpr) {

        const points = this.points;
        const minX = this.minX();
        const maxX = this.maxX();

        ctx.beginPath();

        for (let i = 0; i < points.length - 1; i++) {

            const p1 = points[i];
            const p2 = points[i+1];

            const x1 = Math.round(relative(p1.x, minX, maxX) * ctx.canvas.width / dpr);
            const x2 = Math.round(relative(p2.x, minX, maxX) * ctx.canvas.width / dpr);
            const y1 = Math.round(relative(p1.y, minY, maxY) * ctx.canvas.height / dpr);
            const y2 = Math.round(relative(p2.y, minY, maxY) * ctx.canvas.height / dpr);

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        }

        ctx.closePath();

        ctx.strokeStyle = this.color;
        ctx.lineCap = "round";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    drawCrosshair(ctx, x, minY, maxY, dpr) {
        const minX = this.minX();
        const maxX = this.maxX();

        const p = this.points.filter(p => p.x === x)[0];

        let lineX = Math.round(relative(p.x, minX, maxX) * ctx.canvas.width / dpr);

        ctx.beginPath();
        ctx.moveTo(lineX, 0);
        ctx.lineTo(lineX, ctx.canvas.height);
        ctx.closePath();

        ctx.strokeStyle = '#aaa';
        ctx.lineWidth = 0.1;
        ctx.stroke();

        const arcX = Math.round(relative(p.x, minX, maxX) * ctx.canvas.width / dpr);
        const arcY = Math.round(relative(p.y, minY, maxY) * ctx.canvas.height / dpr);

        ctx.beginPath();
        ctx.arc(arcX, arcY, 6, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fillStyle = '#242f3e';
        ctx.fill();

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}