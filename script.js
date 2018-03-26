var myPlaintext = document.getElementById('myPlaintext').innerHTML.value;
var myKey = document.getElementById("myKey").innerHTML.value;
let keys = [];
let string = "";
function encrypt(plaintext, key) {
    let encrypted = CryptoJS.AES.encrypt(plaintext, key);
    return encrypted;
}
function decrypt(encrypted, key) {
    let decrypted = CryptoJS.AES.decrypt(encrypted, key);
    return decrypted;
}
function encryptThis() {
    let encrypted = encrypt(myPlaintext, myKey);
    document.getElementById("encryptedText").innerHTML = encrypted;
}
function encryptAll() {
    document.getElementById("table1").innerHTML = string;
}
function AlertTest() {
    alert(myPlaintext);
}
function processData(myData) {
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
}
$(document).ready(function() {
    $.getJSON("http://danycabrera.com/csc130/proxy.php?key=1wqnh5q6cthLz1lyHTF6sqQhYB7rca6RUGJy57y2EOgY&sheet=Sheet1", processData);
  });

  