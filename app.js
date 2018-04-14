// Initialize Firebase
const config = {
    apiKey: "AIzaSyCzDn1X6L8fYxwuxXTNBabZt10TpLNgAwc",
    authDomain: "aeswebsite-e1649.firebaseapp.com",
    databaseURL: "https://aeswebsite-e1649.firebaseio.com",
    projectId: "aeswebsite-e1649",
    storageBucket: "aeswebsite-e1649.appspot.com",
    messagingSenderId: "240246572949"
};
firebase.initializeApp(config);

var keys = [];
for(var i = 1; i <= 25; i++) {
    var key = 'key' + i;
    const dbRefObject = firebase.database().ref().child(key);
    dbRefObject.on('value', snap => addKey(snap.val()));
}
function addKey(key) {
    keys.push(key);
    console.log(key);
    console.log(keys.length);
}
function getKeys() {
    for (i in keys) {
        console.log(keys[i])
    }
}
var myPlaintext = "";
var myKey = "";
let string = "";
let strongPass = "";
var database = firebase.database();
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
  processData(keys);
}
function encryptAllKey() {
  clearDiv("table1");
  getPlainKey();
  processDataKey(keys);
}
function AlertTest() {
    getPlainKey();
    alert(myPlaintext);
}
function processData(myData) {
    getPlainKey();
    string += "<tr><th>Key</th><th>Encrypted Message</th><th>Decrypted Message</th><th>Original Message</th><th>Stronger Password</th></tr>";
    for (i in myData) {
        var y = myData[i];
        var key = String(y);
        console.log(key);
        let encrypted = encrypt(myPlaintext, key);
        let decrypted = decrypt(encrypted, key);
        createPass(encrypted, decrypted);
        string += "<tr>";
        string += "<td>" + key + "</td>";
        string += "<td>" + encrypted + "</td>";
        string += "<td>" + decrypted + "</td>";
        string += "<td>" + myPlaintext + "</td>";
        string += "<td>" + strongPass + "</td>";
        strongPass = "";
        string += "</tr>";
    }
    document.getElementById("table1").innerHTML = string;
}
function processDataKey(myData) {
  getPlainKey();
  string += "<tr><th>Key</th><th>Encrypted Message</th><th>Decrypted Message</th><th>Original Message</th><th>Stronger Password</th></tr>";
  for (i in myData) {
      var y = myData[i];
      var key = String(y);
      let encrypted = encrypt(key, myKey);
      let decrypted = decrypt(encrypted, myKey);
      createPass(encrypted, decrypted);
      string += "<tr>";
      string += "<td>" + myKey + "</td>";
      string += "<td>" + encrypted + "</td>";
      string += "<td>" + decrypted + "</td>";
      string += "<td>" + key + "</td>";
      string += "<td>" + strongPass + "</td>";
      strongPass = "";
      string += "</tr>";
  }
  document.getElementById("table1").innerHTML = string;
}
function createPass(encryptP, decryptP) {
    let encrypted = String(encryptP);
    let decrypted = String(decryptP);
    let split = Math.floor(Math.random() * encrypted.length);
    let split2 = Math.floor(Math.random() * decrypted.length);
    strongPass += encrypted.substring(0, split);
    strongPass += decrypted.substring(0, split2);
    strongPass += encrypted.substring(split, encrypted.length);
    strongPass += decrypted.substring(split2 , decrypted.length);
}
function showSP() {
    getPlainKey();
    let encrypted = encrypt(myPlaintext, myKey);
    let decrypted = decrypt(encrypted, myKey);
    createPass(encrypted, decrypted);
    document.getElementById("strongP").innerHTML = strongPass;
    strongPass = "";
}
function TInfo() {
    let j = document.getElementById("info");
    if (j.style.display === "none") {
        j.style.display = "block";
    } else {
        j.style.display = "none";
    }
}
