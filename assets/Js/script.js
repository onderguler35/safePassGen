// Function for getting a random element from an array
// each time it's called it will generate a random character from the pool of selected arrays and return it  
function getRandom(arr) {
  var randomChar = arr[Math.floor(Math.random() * arr.length)];
  return randomChar;
}


//below function will get the arrays that will be needed as selection pool according to user confirmations
//and will validate at least one option is selected
function selectedArrays() {
  //let's assign an empty array
  var selectArray = [];
  // we will concat relevant array into our empty array as the user confirms true by clicking ok
  // if user clicks cancel, nothing happens
  var specialChar = confirm(
    "Special characters will be included unless you click cancel?"
  );
  if (specialChar) {
    selectArray = selectArray.concat(specialCharacters);
  }

  var numChar = confirm("Numbers will be included unless you click cancel?");
  if (numChar) {
    selectArray = selectArray.concat(numericCharacters);
  }

  var lowerCase = confirm(
    "LowerCase characters will be included unless you click cancel?"
  );
  if (lowerCase) {
    selectArray = selectArray.concat(lowerCasedCharacters);
  }

  var upperCase = confirm(
    "UpperCase characters will be included unless you click cancel?"
  );
  if (upperCase) {
    selectArray = selectArray.concat(upperCasedCharacters);
  }

  // if user selected at least one option our array can not be empty, so let's use this logic to validate input
  if (selectArray.length === 0) {
    alert("You did not select any of the options, please try again");
    selectedArrays();
  }

  //if validated fine, we should have the selected arrays gathered in our selectArray below. Let's return the value of it.
  return selectArray;
}


// Function to prompt user for password length required, and validate it
function promptPassLength() {
  var passLength = prompt(
    "Please choose password length between 10-64 characters?",
    "A number between 10-64"
  );
  // validating if the input is a number of if fitting requirements of 10-64 characters
  if (isNaN(passLength) || passLength < 10 || passLength > 64) {
    // if not valid, then alerting user,
    alert("You did not enter a number between 10-64, please click OK to try again");
    promptPassLength(); //and recursing the prompt function
  } else return passLength;
}


// Function to generate password with user input
function generatePassword() {
  // assigning returns from relevant functions into variables.
  var passLength = promptPassLength();
  var selectArray = selectedArrays();
  var password = "";
  // for loop each time will get a random character from arrays using getRandom function
  // and it will repeat passLength times.
  for (var i = 0; i < passLength; i++) {
    var randomChar = getRandom(selectArray);
    password += randomChar;
  }
  return password;
}


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}


function init() {
  // Get references to the #generate element
  var generateBtn = document.querySelector("#generate");
  // Add event listener to generate button
  generateBtn.addEventListener("click", writePassword);
}

init();