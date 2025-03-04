document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const items = Array.from(container.querySelectorAll('.item'));
  const searchBar = document.getElementById('searchBar');

  function sortItems(criteria, order = 'asc') {
    const sortedItems = items.sort((a, b) => {
      let aValue, bValue;

      switch (criteria) {
        case 'name':
          aValue = a.querySelector('.text b').textContent;
          bValue = b.querySelector('.text b').textContent;
          if (order === 'asc') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        case 'description':
          aValue = a.querySelector('.text d').textContent.trim();
          bValue = b.querySelector('.text d').textContent.trim();
          if (order === 'asc') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        case 'tribu':
          aValue = parseInt(a.dataset.tribu, 10);
          bValue = parseInt(b.dataset.tribu, 10);
          if (order === 'asc') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        case 'id':
          aValue = parseInt(a.dataset.id, 10);
          bValue = parseInt(b.dataset.id, 10);
          if (order === 'asc') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        default:
          return 0;
      }
    });

    container.innerHTML = '';
    sortedItems.forEach(item => container.appendChild(item));
  }

  function filterItems() {
    const searchTerm = searchBar.value.toLowerCase();
    items.forEach(item => {
      const name = item.querySelector('.text b').textContent.toLowerCase();
      if (name.includes(searchTerm)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  searchBar.addEventListener('input', filterItems);

  // Exemple d'utilisation :
  document.getElementById('sortByNameAsc').addEventListener('click', () => sortItems('name', 'asc'));
  document.getElementById('sortByNameDesc').addEventListener('click', () => sortItems('name', 'desc'));
  document.getElementById('sortByDescriptionAsc').addEventListener('click', () => sortItems('description', 'asc'));
  document.getElementById('sortByDescriptionDesc').addEventListener('click', () => sortItems('description', 'desc'));
  document.getElementById('sortByTribu').addEventListener('click', () => sortItems('tribu', 'asc'));
  document.getElementById('sortByIdAsc').addEventListener('click', () => sortItems('id', 'asc'));
  document.getElementById('sortByIdDesc').addEventListener('click', () => sortItems('id', 'desc'));
});
