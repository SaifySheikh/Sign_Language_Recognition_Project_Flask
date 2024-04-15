document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('videoElement');
    var canvas = document.getElementById('canvasElement');
    var captureButton = document.getElementById('captureButton');
    var predictionResult = document.getElementById('predictionResult');

    // Access webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            video.srcObject = stream;
            video.play();
        });
    }

    // Capture image from video feed
    captureButton.addEventListener('click', function () {
        console.log("clicked");
        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, 300, 300);
        var image = canvas.toDataURL('image/png');

        // Make AJAX request to server for prediction
        fetch('/prediction', {
            method: 'POST',
            body: image
        })
        .then(response => response.json())
        .then(data => {
            predictionResult.innerHTML = 'Prediction: ' + data.prediction + ', Accuracy: ' + data.accuracy.toFixed(2) + '%';
        })
        .catch(error => console.error('Error:', error));
    });
});
