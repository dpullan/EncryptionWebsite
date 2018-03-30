var myPlaintext = "";
var myKey = "";
let string = "";
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
function clearDiv(elementID) {
  string = "";
  document.getElementById(elementID).innerHTML = "";
}
function encryptAll() {
  clearDiv("table1");
  getPlainKey();
  $.getJSON("http://danycabrera.com/csc130/proxy.php?key=1wqnh5q6cthLz1lyHTF6sqQhYB7rca6RUGJy57y2EOgY&sheet=Sheet1", processData);
}
function encryptAllKey() {
  clearDiv("table1");
  getPlainKey();
  $.getJSON("http://danycabrera.com/csc130/proxy.php?key=1wqnh5q6cthLz1lyHTF6sqQhYB7rca6RUGJy57y2EOgY&sheet=Sheet1", processDataKey);
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
        string += "<tr>";
        string += "<td>" + myData[i].key + "</td>";
        string += "<td>" + encrypted + "</td>";
        string += "<td>" + decrypted + "</td>";
        string += "<td>" + myPlaintext + "</td>";
        string += "</tr>";
    }
    document.getElementById("table1").innerHTML = string;
}
function processDataKey(myData) {
  getPlainKey();
  string += "<tr><th>Key</th><th>Encrypted Message</th><th>Decrypted Message</th><th>Original Message</th></tr>";
  for (i in myData) {
      let encrypted = encrypt(myData[i].key, myKey);
      let decrypted = decrypt(encrypted, myKey);
      string += "<tr>";
      string += "<td>" + myKey + "</td>";
      string += "<td>" + encrypted + "</td>";
      string += "<td>" + decrypted + "</td>";
      string += "<td>" + myData[i].key + "</td>";
      string += "</tr>";
  }
  document.getElementById("table1").innerHTML = string;
}
