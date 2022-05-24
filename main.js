state = "";
obj = [];

function preload(){
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380)
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    state = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log("error");
    }
    else{
        console.log(results);
        obj = results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(state != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(var i = 0; i < obj.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "There are " + obj.length + " Objects";
            fill(r,g,b)
            per = Math.floor(obj[i].confidence * 100);
            text(obj[i].label + " " + per + "%", obj[i].x + 15, obj[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
        }
    }
}

