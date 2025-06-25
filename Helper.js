
var EPSILON=0.01;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function updateMouse(e) {
    mousePos = getMousePos(canvas, e);
}

function touchMoveMouse(e) {
    mousePos = {"x":evt.touches[0].clientX,"y":evt.touches[0].clientY};
}


function overlap(a1,a2,b1,b2) {
    if ((b1<a1&&a1<b2) || (b1<a2&&a2<b2) || (a1<b1&&b1<a2) || (a1<b2&&b2<a2)) return true;
    return false;
}




function drawRoundRectangle(ctx,x,y,width,height,rad) {
	ctx.beginPath();
ctx.moveTo(x+width,y+height);
ctx.arcTo(x,y+height,x,y,rad);
ctx.arcTo(x,y,x+width,y,rad);
ctx.arcTo(x+width,y,x+width,y+height,rad);
ctx.arcTo(x+width,y+height,x,y+height,rad);
ctx.fill();
}

function randomInt(max) {
    return Math.floor(Math.random()*(max+1));
}

function drawCircle(ctx, x, y, radius, fill) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    if (fill!=null) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
}

function pointInCircle(point_x, point_y, circle_x, circle_y, circle_rad) {
    return (point_x-circle_x)*(point_x-circle_x)+(point_y-circle_y)*(point_y-circle_y) <= circle_rad*circle_rad;
}

function pointInSegment(start_point_x, start_point_y, end_point_x, end_point_y, point_x, point_y) {
    var delta_lambda=((point_x-start_point_x)/(end_point_x-start_point_x) - (point_y-start_point_y)/(end_point_y-start_point_y));

    if ((-EPSILON<=end_point_x-start_point_x) && (end_point_x-start_point_x<=EPSILON)) {
        return (-EPSILON<=point_x-end_point_x && point_x-end_point_x <= EPSILON) && (Math.min(start_point_y,end_point_y)<= point_y && Math.max(start_point_y,end_point_y) >= point_y);
    }

    if ((-EPSILON<=end_point_y-start_point_y) && (end_point_y-start_point_y<=EPSILON)) {
        return (-EPSILON<=point_y-end_point_y && point_y-end_point_y <= EPSILON) && (Math.min(start_point_x,end_point_x)<= point_x && Math.max(start_point_x,end_point_x) >= point_x);
    }
   
    return (
(-EPSILON <=delta_lambda) && (delta_lambda <=EPSILON)
&& ((point_x-start_point_x)/(end_point_x-start_point_x) >= 0)    
&& ((point_x-start_point_x)/(end_point_x-start_point_x) <= 1)
        );
}

function pointLineDistanceSquared(start_point_x, start_point_y, end_point_x, end_point_y, point_x, point_y) {
    return ((point_x - start_point_x)*(end_point_y-start_point_y) - (point_y - start_point_y)*(end_point_x-start_point_x)) * ((point_x - start_point_x)*(end_point_y-start_point_y) - (point_y - start_point_y)*(end_point_x-start_point_x)) / ((end_point_x-start_point_x)*(end_point_x-start_point_x)+(end_point_y-start_point_y)*(end_point_y-start_point_y)); 
}

function pointLineProj(start_point_x, start_point_y, end_point_x, end_point_y, point_x, point_y) {
    var lambda = ((end_point_x-start_point_x) *(point_x-start_point_x) + (end_point_y-start_point_y) *(point_y-start_point_y)) / ((end_point_x-start_point_x)*(end_point_x-start_point_x)+(end_point_y-start_point_y)*(end_point_y-start_point_y));
    return {"x":start_point_x+lambda*(end_point_x-start_point_x),
"y":start_point_y+lambda*(end_point_y-start_point_y)};
}

function lineInCircle(start_point_x, start_point_y, end_point_x, end_point_y, circle_x, circle_y, circle_rad) {

    if (pointInCircle(start_point_x, start_point_y, circle_x, circle_y, circle_rad) || pointInCircle(end_point_x, end_point_y, circle_x, circle_y, circle_rad)) 
    {
        return true;
    }
    var centerLineProjection=pointLineProj(start_point_x, start_point_y, end_point_x, end_point_y, circle_x, circle_y);
    if ((pointLineDistanceSquared(start_point_x, start_point_y, end_point_x, end_point_y, circle_x, circle_y) <= circle_rad*circle_rad) && (pointInSegment(start_point_x, start_point_y, end_point_x, end_point_y,centerLineProjection.x,centerLineProjection.y))) {
        
     return true;
 }

    return false;

}

function incrementAngle(angle,delta) {
    return (angle+delta+2*Math.PI)%(2*Math.PI);
} 