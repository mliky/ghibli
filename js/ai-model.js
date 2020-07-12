const mURL = "https://teachablemachine.withgoogle.com/models/-52-tS2fq/";
const uURL = "https://teachablemachine.withgoogle.com/models/MPQeLFOwI/";

let model, webcam, labelContainer, maxPredictions;

async function init() {
    const modelURL = uURL + "model.json";
    const metadataURL = uURL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // append elements to the DOM
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function predict() {
    var image = document.getElementById("face-image")
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(image, false);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}