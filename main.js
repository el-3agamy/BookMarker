
let bookmarkNameInput = document.getElementById("bookmarkName");
let bookmarkUrlInput = document.getElementById("bookmarkUrl");

bookmarkerList = [];

if (localStorage.getItem("BookmarkerContainer") !== null) {
  bookmarkerList = JSON.parse(localStorage.getItem("BookmarkerContainer"));
}
displayBookmarker();


function addBookmarker() {
  if (
    validationInputs(bookmarkNameInput) &&
    validationInputs(bookmarkUrlInput)
  ) {
    let bookMarker = {
      name: bookmarkNameInput.value,
      url: bookmarkUrlInput.value,
    };
    bookmarkerList.push(bookMarker);
    localStorage.setItem("BookmarkerContainer", JSON.stringify(bookmarkerList));
    displayBookmarker();
    clearBookmarker();
  }
}


function clearBookmarker() {
  bookmarkNameInput.value = null;
  bookmarkUrlInput.value = null;

  bookmarkNameInput.classList.remove("valid-input");
  bookmarkNameInput.classList.remove("is-valid");
  bookmarkNameInput.classList.remove("is-invalid");
  bookmarkUrlInput.classList.remove("valid-input");
  bookmarkUrlInput.classList.remove("is-valid");
  bookmarkUrlInput.classList.remove("is-invalid");
}


function displayBookmarker() {
  let bookmarkerTable = "";

  for (let i = 0; i < bookmarkerList.length; i++) {
    bookmarkerTable += `<tr>
                <th scope="row">${i + 1}</th>
                <td>${bookmarkerList[i].name}</td>
                <td>
                  <button type="button" id="btnVisit" class="btn btn-success">
                    <a class="text-white text-decoration-none" target="_blank" href="${
                      bookmarkerList[i].url
                    }">
                    <i class="fa-regular fa-eye me-1"></i> Visit
                    </a>
                  </button>
                </td>
                <td>
                  <button onclick="deleteBookmarker(${i})" type="button" id="btnDelete" class="btn btn-danger">
                    <i class="fa-solid fa-trash-can me-1"></i>
                    Delete
                  </button>
                </td>
              </tr>`;
  }
  document.getElementById("tBodyContent").innerHTML = bookmarkerTable;
}


function deleteBookmarker(index) {
  bookmarkerList.splice(index, 1);
  localStorage.setItem("BookmarkerContainer", JSON.stringify(bookmarkerList));
  displayBookmarker();
}



function validationInputs(element) {
  let regex = {
    bookmarkName:
      /^[a-zA-Z0-9]{3,}([-_][a-zA-Z0-9]{3,})*(\s[a-zA-Z0-9]{3,}([-_][a-zA-Z0-9]{3,})*)?$/,
    bookmarkUrl: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
  };


  
  let text = element.value;

  if (regex[element.id].test(text)) {
    element.classList.add("valid-input");
    element.classList.remove("invalid-input");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("invalid-input");
    element.classList.remove("valid-input");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}



let popup = document.getElementById("validationPopup");
let closePopup = document.getElementById("closePopup");



function showPopup() {
  popup.classList.remove("hidden");
}


function hidePopup() {
  popup.classList.add("hidden");
}


closePopup.addEventListener("click", () => {
  hidePopup();

  clearBookmarker();
});

document.getElementById("submitInfo").addEventListener("click", (e) => {
  e.preventDefault(); 

  const isNameValid = validationInputs(bookmarkNameInput); 
  const isUrlValid = validationInputs(bookmarkUrlInput); 

 
  if (!isNameValid || !isUrlValid) {
    showPopup(); 
  } else {
    addBookmarker(); 
  }
});