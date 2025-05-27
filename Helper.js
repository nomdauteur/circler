function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function updateMouse(e) {
    if (isGameOn)
    mousePos = getMousePos(canvas, e);
}

function overlap(a1,a2,b1,b2) {
    if ((b1<a1&&a1<b2) || (b1<a2&&a2<b2) || (a1<b1&&b1<a2) || (a1<b2&&b2<a2)) return true;
    return false;
}

function checkCollision() {
    mouse_left=posx - vw(5)+(""+points).length/2+vw(2);
    mouse_right=mouse_left+ctx.measureText(points).width;
    if (posy > problem.curr_y && posy < (problem.curr_y + problem.height)) {
        if (overlap(mouse_left,mouse_right,problem.correct_answer.x,problem.correct_answer.x + ctx.measureText(problem.correct_answer.label).width)) return 1;
        else if (overlap(mouse_left,mouse_right,problem.other_answer.x,problem.other_answer.x + ctx.measureText(problem.other_answer.label).width)) return -1;
        else return -2;
    }
    return 0;
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