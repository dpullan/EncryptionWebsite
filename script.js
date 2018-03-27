var myPlaintext = "";
var myKey = "";
let keys = [];
let string = "";
function getPlainKey() {
    myPlaintext = document.getElementById('mPlaintext').value;
    myKey = document.getElementById('mKey').value;
}
function encrypt(plaintext, key) {
    let encrypted = CryptoJS.AES.encrypt(plaintext, key);
    return encrypted;
}
function decrypt(encrypted, key) {
    let decrypted = CryptoJS.AES.decrypt(encrypted, key);
    return decrypted;
}
function encryptThis() {
    getPlainKey();
    let encrypted = encrypt(myPlaintext, myKey);
    document.getElementById("encryptedText").innerHTML = encrypted;
}
function encryptAll() {
    getPlainKey();
    $.getJSON("http://danycabrera.com/csc130/proxy.php?key=1wqnh5q6cthLz1lyHTF6sqQhYB7rca6RUGJy57y2EOgY&sheet=Sheet1", processData);
}
function AlertTest() {
    getPlainKey();
    alert(myPlaintext);
}
function processData(myData) {
    getPlainKey();
    string += "<tr><th>Key</th><th>Encrypted Message</th><th>Decrypted Message</th><th>Original Message</th></tr>";
    for (i in myData) {
        let encrypted = encrypt(myPlaintext, myData[i].key);
        let decrypted = decrypt(encrypted, myData[i].key);
        keys[i] = myData[i].key;
        string += "<tr>";
        string += "<td>" + myData[i].key + "</td>";
        string += "<td>" + encrypted + "</td>";
        string += "<td>" + decrypted + "</td>";
        string += "<td>" + myPlaintext + "</td>";
        string += "</tr>";
    }
    document.getElementById("table1").innerHTML = string;
}

  