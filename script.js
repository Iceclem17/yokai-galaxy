fetch('/models/navbar/level0.html')
  .then(response => {
    if (!response.ok) throw new Error(`Erreur ${response.status} - Impossible de charger la navbar`);
    return response.text();
  })
  .then(data => {
    document.getElementById('navbar').innerHTML = data;
  })
  .catch(error => console.error('Erreur lors du chargement de la navbar:', error));
