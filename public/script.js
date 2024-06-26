const fetchJSON = async () => {
    try {
      const response = await fetch('/db/dados.json');
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
  
        localStorage.setItem('parsedData', JSON.stringify(jsonData));
        const storedData = JSON.parse(localStorage.getItem('parsedData'));
  
        document.getElementById('nome').textContent = storedData.name;
      } else {
        console.error('Erro ao buscar dados JSON:', response.status);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  
  fetchJSON();