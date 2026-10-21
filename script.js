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

downloadBtn.addEventListener('click', (e)=>{

    const img = qrContainer.querySelector("img");
    const canvas = qrContainer.querySelector("canvas");

    if (img) {
        downloadBtn.href = img.src;
    }
    else if (canvas) {
        downloadBtn.href = canvas.toDataURL("image/png");
    }
    else {
        e.preventDefault();
        alert("First generate a QR code!");
    }
});
  

resetBtn.addEventListener('click' ,()=>{
    qrContainer.innerHTML = "";
    qrText.value = "";
    isGenerated = false;
});
  
function isEmptyInput(){
    if(qrText.value.trim().length > 0){
         generateQRCode();
         isGenerated = true;
    }
    else{
        alert("Enter the text or URL to generate your QR code");
}
}

function generateQRCode(){
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text:qrText.value,
        height:size,
        width:size,
        colorLight: "#ffffff",
        colorDark: qrColor.value,
    });
}
