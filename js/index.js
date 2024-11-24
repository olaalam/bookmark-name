document.addEventListener("DOMContentLoaded", () => {
  const bookNameInput = document.getElementById("bookName");
  const websiteInput = document.getElementById("website");
  const alertModal = document.getElementById("alertModal");
  const alertOverlay = document.getElementById("alertOverlay");
  const closeAlertButton = document.getElementById("closeAlert");
  let siteList = [];

  if (localStorage.getItem("sites") === null) {
    siteList = [];
  } else {
    siteList = JSON.parse(localStorage.getItem("sites"));
  }
  displaySites();
  // function addSites

  function addSites() {
    let sites = {
      name: bookNameInput.value,
      website: websiteInput.value,
    };
    siteList.push(sites);
    localStorage.setItem("sites", JSON.stringify(siteList));
    console.log(siteList);
    displaySites();
    clearForm();
  }
    // function deleteSite

    function deleteSite(index) {
      globalIndex = -1;
      siteList.splice(index, 1);
      displaySites();
      localStorage.setItem("sites", JSON.stringify(siteList));
    }

  // function displaySites

  function displaySites() {
    var output = "";
    for (let i = 0; i < siteList.length; i++) {
      output += `
      <tbody>
        <tr>
          <td>${i + 1}</td>
          <td>${siteList[i].name}</td>
          <td>
            <a href="${
              siteList[i].website
            }" class="btn btn-visit btn-sm px-2" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a>
          </td>
          <td>
            <button data-index="${i}" class="btn btn-delete btn-sm"><i class="fa-solid fa-trash"></i> Delete</button>
          </td>
        </tr>
      </tbody>`
          };
          
    document.getElementById("tableBody").innerHTML = output;
    const deleteButtons = document.querySelectorAll('.btn-delete');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', function() {
      const index = this.getAttribute('data-index'); 
      deleteSite(index); 
    });
  });
  }

  // Add input event for validation
  bookNameInput.addEventListener("input", () =>
    validateInputs(bookNameInput, "bookName")
  );
  websiteInput.addEventListener("input", () =>
    validateInputs(websiteInput, "website")
  );

  // Form submission event
  document.getElementById("bookmarkForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const isBookNameValid = validateInputs(bookNameInput, "bookName");
    const isWebsiteValid = validateInputs(websiteInput, "website");
    //function showAlert
    function showAlert() {
      alertModal.classList.remove("d-none");
      alertOverlay.classList.remove("d-none");
    }

    // function hideAlert
    function hideAlert() {
      alertModal.classList.add("d-none");
      alertOverlay.classList.add("d-none");
    }
      // Close alert
  closeAlertButton.addEventListener("click", hideAlert);

    if (isBookNameValid && isWebsiteValid) {
      hideAlert();
      addSites();
      displaySites();
      clearForm();
    } else {
      showAlert();
    }
  });



  //function validateInputs
  function validateInputs(inputElement, fieldType) {
    const regex = {
      bookName: /^\w{3,}(\s+\w+)*$/, // At least 3 characters
      website:
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
    };

    const isValid = regex[fieldType].test(inputElement.value);

    if (isValid) {
      inputElement.classList.add("is-valid");
      inputElement.classList.remove("is-invalid");
    } else {
      inputElement.classList.add("is-invalid");
      inputElement.classList.remove("is-valid");
    }

    return isValid;
  }

  // function clearForm
  function clearForm() {
    bookNameInput.value = "";
    websiteInput.value = "";
  }
});
