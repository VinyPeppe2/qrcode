const urlPaste = document.getElementById('urlPaste');
const bGerar = document.getElementById('bGerar');
const bClear = document.getElementById('bClear');
const infoUser = document.getElementById('infoUser');
let imgQRCODE = document.getElementById('imgQRCODE');
const bDownload = document.getElementById('bDownload');
let qrValue;

bGerar.addEventListener('click', () =>{
    qrValue = urlPaste.value.trim();
if (qrValue === '') {
    alert('😥Por favor, informe o URL para gerar o QRCODE!');
} else if (!qrValue.startsWith('http://') && !qrValue.startsWith('https://')) {
    alert('⚠️ O URL deve começar com "http://" ou "https://".');
} else {
    gerarCode();
    setTimeout(() => {
        infoUser.textContent = '✅ QR Code gerado com sucesso!';
    }, 600);
}
});
   
function gerarCode(){
    infoUser.textContent = '⏳Gerando QRCode...';
    imgQRCODE.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`;
    imgQRCODE.alt = 'Imagem QRCODE site';
}

imgQRCODE.onload = () => {
    bDownload.disabled = false;
    bDownload.onclick = () => {
        const link = document.createElement('a');
        link.href = imgQRCODE.src;
        link.download = 'qrcode.png';
        link.click();
    };
};


bClear.addEventListener('click', () => {
    if (urlPaste.value.trim() === ''){
          alert('⚠️O campo já esta vazio')
          urlPaste.focus();
        return
    } 
    urlPaste.value = '';
    infoUser.textContent = '';
    imgQRCODE.src= '';
    imgQRCODE.alt = '';
    imgQRCODE.target = '__blank';
    bDownload.disabled = true;
    urlPaste.focus();
})

urlPaste.focus();
