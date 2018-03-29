var myPlaintext = "";
var myKey = "";
let keys = [];
let string = "";
let string2 = "";
let string3 = "";
function getPlainKey() {
    myPlaintext = document.getElementById('mPlaintext').value;
    myKey = document.getElementById('mKey').value;
}
function showE() {
    let x = document.getElementById("encryptedText");
    x.style.display = "block";
}
function showD() {
    let x = document.getElementById("decryptedText");
    x.style.display = "block";
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
    document.getElementById("encryptedText").innerHTML = "<h3>Encrypted Text: </h3>" + encrypted;
    showE();
}
function decryptThis() {
    getPlainKey();
    let encrypted = encrypt(myPlaintext, myKey);
    let decrypted = decrypt(encrypted, myKey);
    document.getElementById("decryptedText").innerHTML = "<h3>Decrypted Text: </h3>" + decrypted;
    showD();
}
function edThis() {
    getPlainKey();
    encryptThis();
    decryptThis();
    showE();
    showD();
}
function encryptAll() {
    getPlainKey();
    $.getJSON("https://sheets.googleapis.com/v4/spreadsheets/1wqnh5q6cthLz1lyHTF6sqQhYB7rca6RUGJy57y2EOgY/values/Sheet?key=AIzaSyCN3WBTjxygD-D8gYhJ6rOW9dAnSWYu0fI", processData);
} //AIzaSyCN3WBTjxygD-D8gYhJ6rOW9dAnSWYu0fI
//1wqnh5q6cthLz1lyHTF6sqQhYB7rca6RUGJy57y2EOgY
function encryptAllWords() {
  getPlainKey();
  $.getJSON("https://spreadsheets.google.com/feeds/list/1wqnh5q6cthLz1lyHTF6sqQhYB7rca6RUGJy57y2EOgY/3/public/full?alt=json", processWordData);
}
function encryptAllPass() {
  getPlainKey();
  $.getJSON("http://danycabrera.com/csc130/proxy.php?key=1wqnh5q6cthLz1lyHTF6sqQhYB7rca6RUGJy57y2EOgY&sheet=Sheet4", processPassData);
}
function AlertTest() {
    getPlainKey();
    alert(myPlaintext);
}
function processWordData(myData) {
  getPlainKey();
  string2 += "<tr><th>Key</th><th>Encrypted Message</th><th>Decrypted Message</th><th>Original Message</th></tr>";
  for (i in myData) {
    let encrypted = encrypt(myPlaintext, myData[i].word);
    let decrypted = decrypt(encrypted, myData[i].word);
    string2 += "<tr>";
    string2 += "<td>" + myData[i].word + "</td>";
    string2 += "<td>" + encrypted + "</td>";
    string2 += "<td>" + decrypted + "</td>";
    string2 += "<td>" + myPlaintext + "</td>";
    string2 += "</tr>";
  }
  document.getElementById("table2").innerHTML = string2;
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
