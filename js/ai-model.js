const maleURL = "https://teachablemachine.withgoogle.com/models/-52-tS2fq/";
const femaleURL = "https://teachablemachine.withgoogle.com/models/MPQeLFOwI/";

let model, webcam, labelContainer, maxPredictions;

async function init() {
    var URL = $('#gender').is(':checked') ? maleURL : femaleURL;
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // append elements to the DOM
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function predict() {
    var image = document.getElementById("face-image");
    const prediction = await model.predict(image, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    var character = prediction[0].className;
    
    /* card 1 최종 결과 셋팅 */
    $('#out-img').attr('src', "../src/img/character/" + character + ".jpg");
    $('#out-card .card-title').text(character_data[character].name);
    $('#out-card .card-text').text("- " + character_data[character].movie);
    
    /* card 2 결과 셋팅 */
    for (let i = 0; i < 5; i++) {
        var result_value = prediction[i].probability;
        const classPrediction = prediction[i].className + ": " + result_value.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    
    $('.gender').hide();
    $('#upload-board-msg').hide();
    $('#upload-board').hide();
    $('#result-board').show();
}