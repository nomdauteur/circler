
function setText(textRu, textEn) {
    
    
    if (document.getElementById("lang").textContent.includes("ru")) {
        //console.log("Setting ru");
        return textRu;
    }
    
    else return textEn;

}

    function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function copyArr(srcArray) {
    var len = srcArray.length;
    dstArray = new Array(len); // boost in Safari
for (var i=0; i<len; ++i)
    dstArray[i] = srcArray[i].slice(0);
return dstArray;
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}


function vh(percent) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}

function vw(percent) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (percent * w) / 100;
}

function vmin(percent) {
  return Math.min(vh(percent), vw(percent));
}

function vmax(percent) {
  return Math.max(vh(percent), vw(percent));
}

function cvh(percent) {
  var h = document.getElementById("canvas").height||0;
  return (percent * h) / 100;
}

function cvw(percent) {
  var w = document.getElementById("canvas").width||0;
  return (percent * w) / 100;
}

function cvmin(percent) {
  return Math.min(vh(percent), vw(percent));
}

function cvmax(percent) {
  return Math.max(vh(percent), vw(percent));
}