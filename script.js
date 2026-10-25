const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');

const qrContainer = document.querySelector('.qr-body');

const resetBtn = document.getElementById('resetbtn');
const qrColor = document.getElementById("qrColor");

let size = sizes.value;
let isGenerated = false;
generateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    isEmptyInput();
});

sizes.addEventListener('change',(e)=>{
    size = e.target.value;
    if(isGenerated){
        isEmptyInput();
    }
});

qrColor.addEventListener('change', () => {
    if (isGenerated) {
        generateQRCode();
    }
});


downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const img = qrContainer.querySelector("img");

    if (!img || !img.complete || !img.naturalWidth) {
        alert("First generate a QR code!");
        return;
    }

    const padding = 20;

    const canvas = document.createElement("canvas");

    canvas.width = img.naturalWidth + padding * 2;
    canvas.height = img.naturalHeight + padding * 2;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, padding, padding);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "QR_Code.png";
    link.click();
});
  
resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    qrContainer.innerHTML = "";
    qrText.value = "";
    isGenerated = false;
});

  
function isEmptyInput() {
    if (qrText.value.trim().length === 0) {
        alert("Please enter text or URL");
        return;
    }

    generateQRCode();
    isGenerated = true;
}


function generateQRCode() {
    qrContainer.innerHTML = "";

    new QRCode(qrContainer, {
        text: qrText.value.trim(),
        height: Number(size),
        width: Number(size),
        colorLight: "#ffffff",
        colorDark: qrColor.value
    });
}
