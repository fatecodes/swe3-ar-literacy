Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("/faceModels"),
  faceapi.nets.tinyFaceDetector.loadFromUri("/faceModels"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/faceModels"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/faceModels"),
  faceapi.nets.faceExpressionNet.loadFromUri("/faceModels"),
]).then(() => {
  setTimeout(() => faceExpressionInstance.start(), 5000);
});

const faceExpressionInstance = faceExpression();

function faceExpression() {
  const state = {
    currentDetection: null,
  };

  function start() {
    const video = document.getElementById("arjs-video");
    console.log("video play", video);
    const canvas = faceapi.createCanvasFromMedia(video);
    canvas.setAttribute("style", "position:absolute;top:0");

    document.body.append(canvas);

    const width = Number(video.style.width.replace("px", ""));
    const height = Number(video.style.height.replace("px", ""));

    const displaySize = { width: width, height: height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length) {
        state.currentDetection = detections[0].expressions.asSortedArray()[0];
      } else {
        state.currentDetection = null;
      }

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);
  }

  return { state, start };
}
