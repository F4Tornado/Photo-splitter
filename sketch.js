const cHidden = document.getElementById("hidden");
const drawHidden = cHidden.getContext("2d");
const c = document.getElementById("visible");
const draw = c.getContext("2d");
const cHidden2 = document.getElementById("hidden2");
const drawHidden2 = cHidden2.getContext("2d");
const file = document.getElementById("file");
const splits = document.getElementById("splits");
const downloadEl = document.getElementById("download");
file.addEventListener('change', handleImage, false);
splits.addEventListener("change", () => {
  draw.drawImage(img, 0, 0, c.width, c.height);
  if (splits.value >= 2 && splits.value <= 10 && splits.value == Math.round(splits.value)) {
    for (let i = 0; i < c.width; i += c.width / splits.value) {
      draw.strokeStyle = "#fff";
      draw.fillStyle = "#000";
      draw.lineWidth = 2;
      draw.beginPath();
      draw.rect(i, 0, 1, c.height);
      draw.stroke();
      draw.fill();
    }
  }
}, false)
let img;

function handleImage(e) {
  var reader = new FileReader();
  reader.onload = function (event) {
    img = new Image();
    img.onload = function () {
      cHidden.width = img.width;
      cHidden.height = img.height;
      c.width = window.innerWidth;
      c.height = window.innerWidth * (img.height / img.width);
      drawHidden.drawImage(img, 0, 0);
      draw.drawImage(img, 0, 0, c.width, c.height);
      if (splits.value >= 2 && splits.value <= 10 && splits.value == Math.round(splits.value)) {
        for (let i = 0; i < c.width; i += c.width / splits.value) {
          draw.strokeStyle = "#fff";
          draw.fillStyle = "#000";
          draw.lineWidth = 2;
          draw.beginPath();
          draw.rect(i, 0, 1, c.height);
          draw.stroke();
          draw.fill();
        }
      }
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
}

function download() {
  if (splits.value >= 2 && splits.value <= 10 && splits.value == Math.round(splits.value)) {
    let width = Math.floor(img.width / splits.value);
    for (let i = 0; i < splits.value; i += 1) {
      downloadEl.download = `${i}.png`;
      let imageData = drawHidden.getImageData(i * width, 0, width, cHidden.height);
      cHidden2.width = width;
      cHidden2.height = cHidden.height;
      drawHidden2.putImageData(imageData, 0, 0);
      downloadEl.href = cHidden2.toDataURL();
      downloadEl.click();
    }
  }
}