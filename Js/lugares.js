const paquetes = [
    {
      destino: "Bariloche",
      fecha: "2025-07-15",
      duracion: 5,
      descripcion: "Viaje inolvidable a la Patagonia con excursiones al cerro Catedral."
    },
    {
      destino: "Mendoza",
      fecha: "2025-08-10",
      duracion: 3,
      descripcion: "Disfrutá de bodegas y paisajes únicos de montaña."
    },
    {
      destino: "Salta",
      fecha: "2025-07-20",
      duracion: 7,
      descripcion: "Cultura, paisajes del norte y gastronomía regional."
    },
    {
      destino: "El Calafate",
      fecha: "2025-07-18",
      duracion: 10,
      descripcion: "Trekking en el glaciar Perito Moreno. ¡Aventura garantizada!"
    }
  ];

  document.getElementById("form-buscador").addEventListener("submit", function (e) {
    e.preventDefault();

    const destinoInput = document.getElementById("destino").value.toLowerCase();
    const fechaInput = document.getElementById("fecha").value;
    const duracionInput = parseInt(document.getElementById("duracion").value);

    const resultados = paquetes.filter(paquete => {
      const coincideDestino = paquete.destino.toLowerCase().includes(destinoInput);
      const coincideFecha = !fechaInput || paquete.fecha === fechaInput;
      const coincideDuracion = isNaN(duracionInput) || paquete.duracion >= duracionInput;

      return coincideDestino && coincideFecha && coincideDuracion;
    });

    mostrarResultados(resultados);
  });

  function mostrarResultados(lista) {
    const contenedor = document.getElementById("resultados");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron paquetes para tu búsqueda.</p>";
      return;
    }

    lista.forEach(paquete => {
      const div = document.createElement("div");
      div.classList.add("paquete");
      div.innerHTML = `
        <h3>${paquete.destino}</h3>
        <p><strong>Fecha:</strong> ${paquete.fecha}</p>
        <p><strong>Duración:</strong> ${paquete.duracion} días</p>
        <p>${paquete.descripcion}</p>
      `;
      contenedor.appendChild(div);
    });
  }
