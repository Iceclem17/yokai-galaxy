function toggleDropdown(id) {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  for (var i = 0; i < dropdowns.length; i++) {
      var dropdown = dropdowns[i];
      if (dropdown.id !== id) {
          dropdown.style.display = "none";
      }
  }
  var dropdownContent = document.getElementById(id);
  if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
  } else {
      dropdownContent.style.display = "block";
  }
}

// Fermer les menus déroulants si l'utilisateur clique en dehors
window.onclick = function(event) {
  if (!event.target.matches('.dropdown button')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.style.display === "block") {
              openDropdown.style.display = "none";
          }
      }
  }
}