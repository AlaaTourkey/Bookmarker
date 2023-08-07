var nameInput = document.getElementById("name");
var nameUrl = document.getElementById("url");
var addBtn = document.getElementById("addBtn");
var tableBody = document.getElementById('tableBody');
var inputs = document.getElementsByClassName('form-control');
var alertName = document.getElementById('alertName');
var bookmarks = []
var mainIndex = 0;



// ===========> localStorage
if (localStorage.getItem("bookmarks") == null) {
  bookmarks = []
}
else {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  displayBook(bookmarks)
}

// ==========> add site
$("#addBtn").click(function () {
  updateInfo()
  displayBook(bookmarks)
  clearForm()
})

// =======>add book
function addBook() {
  var bookmark = {
    name: nameInput.value,
    url: nameUrl.value
  }
  bookmarks.push(bookmark)
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
}

// ===========> display Book
function displayBook(anyArr) {
  var marks = '';
  for (let i = 0; i < anyArr.length; i++) {
    marks += `
    <tr>
        <td> ${anyArr[i].name}</td>
        <td><a href="${anyArr[i].url}" class="btn btn-primary"> visit</a></td>
        <td><button onclick="updateSite(${i})" class="btn btn-warning"> update</button></td>
        <td><button onclick="deleteSite(${i})" class="btn btn-danger"> delete</button></td>
    </tr>
    `
  }
  tableBody.innerHTML = marks;
}

// ==========>delete
function deleteSite(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  displayBook(bookmarks)
}

// ==========> clear
function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = ''
  }
}

// ==========> update
function updateSite(i) {
  nameInput.value = bookmarks[i].name;
  nameUrl.value = bookmarks[i].url;
  addBtn.innerHTML = "update";
  mainIndex = i;
}

// ===========>  updateInfo
function updateInfo() {
  if (addBtn.innerHTML == "update") {
    addBtn.innerHTML = 'submit';
    var bookmark = {
      name: nameInput.value,
      url: nameUrl.value
    }
    bookmarks.splice(mainIndex, 1, bookmark)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  }
  else {
    addBook()
  }
}

// ===========> search
function search(wanted) {
  var wantedBook = [];
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].name.toLowerCase().includes(wanted)) {
      wantedBook.push(bookmarks[i]);
    }

  }
  displayBook(wantedBook);
}


// ==========> Regex

var nameRegex = /^[A-Z][a-z0-9_\s]{3,20}$/;
function isNameValid() {
  if (nameRegex.test(nameInput.value)) {
    alertName.classList.add('d-none')
  }
  else {
    alertName.classList.remove('d-none')
  }
  return nameRegex.test(nameInput.value);
}

var urlRegex = /^(https:\/\/)?(www\.)?[A-Za-z_\.]{1,}\.[a-z]{3}$/;
function isUrlValid() {
  return urlRegex.test(nameUrl.value);
}

nameInput.onkeyup = function () {
  if (isNameValid() && isUrlValid()) {
    addBtn.removeAttribute('disabled');
  } else {
    addBtn.disabled = true;
  }

};

nameUrl.onkeyup = function () {
  if (isNameValid() && isUrlValid()) {
    addBtn.removeAttribute('disabled');
  } else {
    addBtn.disabled = true;
  }
};

