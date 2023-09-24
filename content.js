// Escuchar los mensajes de la extensión
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.data) {
      // Enviar los datos obtenidos de vuelta a la extensión
      sendResponse({ data: request.data });
  
      // Descargar el archivo HTML de la página
      chrome.downloads.download({
        url: request.data.url, // Utilizar la URL de la página
        filename: "Temp/pagina.html", // El archivo se guardará en la carpeta "Temp"
        saveAs: false
      });
    }
  });
  