document.addEventListener("DOMContentLoaded", function() {
    // Agregar evento click al botón "Soporte"
    document.getElementById("soporteButton").addEventListener("click", function() {
      // Enviar un mensaje al script de contenido para que inicie el proceso
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0];
        const url = tab.url; // Obtener la URL de la pestaña activa
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: startProcess,
          args: [url] // Pasar la URL al script de contenido
        });
      });
    });
  
    // Agregar evento click al botón "Prueba"
    document.getElementById("pruebaButton").addEventListener("click", function() {
      // Mostrar una alerta con los datos proporcionados
      const datos = "Hotel Riu Caribe\n10/09/2023 - 17/09/2023, 1 Hab. 2 Adulto(s) 31,867 MXN";
      alert(datos);
    });
  });
  
  // Función para iniciar el proceso (sin cambios)
  function startProcess(url) {
    // Realizar la solicitud para obtener el HTML de la página
    fetch(url).then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.text();
    }).then(html => {
      // Ejecutar un script en el HTML descargado
      const script = document.createElement('script');
      script.textContent = `
        // Tu script aquí
        // Puedes acceder al DOM de la página y extraer información
        const hotelName = document.querySelector(".search-summary__name").textContent;
        const dates = document.querySelector(".search-summary__dates").textContent.trim();
        const occupancy = document.querySelector(".search-summary__paxes").textContent.trim();
        const totalPrice = document.querySelector(".bestprice__amount").textContent.trim();
        
        // Devolver los datos a la extensión
        chrome.runtime.sendMessage({ data: { HOTEL: hotelName, FECHA: dates, OCUPACION: occupancy, "PRECIO TOTAL": totalPrice, url: "${url}" } });
      `;
      document.body.appendChild(script);
    }).catch(error => {
      console.error('Error:', error);
    });
  }
  