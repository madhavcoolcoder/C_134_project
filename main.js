
audio = "";
objects = [];
status = "";


function preload()
{
    audio = loadSound("krishna_flute.mp3");
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded()
{
    console.log("Model Loaded!")
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results)
    objects = results;
}

function draw()
{
    image(video, 0, 0, 640, 420);
    if(status != "person")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_ojects").innerHTML = "Status : Person Found";
            audio.stop();

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, object[i].height)
        }
    }   
    
    else
    {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Status : Person Not Found";
        audio.play();8
    }
}