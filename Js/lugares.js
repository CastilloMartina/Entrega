

let paquetes = [{
    "destino": "Bariloche",
    "fecha": "2025-07-15",
    "duracion": 5,
    "descripcion": "Viaje inolvidable a la Patagonia con excursiones al cerro Catedral."
  },
  {
    "destino": "Mendoza",
    "fecha": "2025-08-10",
    "duracion": 3,
    "descripcion": "Disfrutá de bodegas y paisajes únicos de montaña."
  },
  {
    "destino": "Salta",
    "fecha": "2025-07-20",
    "duracion": 7,
    "descripcion": "Cultura, paisajes del norte y gastronomía regional."
  },
  {
    "destino": "El Calafate",
    "fecha": "2025-07-18",
    "duracion": 10,
    "descripcion": "Trekking en el glaciar Perito Moreno. ¡Aventura garantizada!"
  }];
document.addEventListener("DOMContentLoaded", () => {
  fetch("lugares.json")
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar lugares.json");
      return res.json();
    })
    .then(data => {
      paquetes = data;
      console.log("Paquetes cargados:", paquetes);
    })
    .catch(error => {
      console.error("Error al cargar el JSON:", error);
      document.getElementById("resultados").innerHTML = "<p>Error al cargar los paquetes.</p>";
    });

  document.getElementById("form-buscador").addEventListener("submit", function (e) {
    e.preventDefault();

    const destino = document.getElementById("destino").value.trim().toLowerCase();
    const fecha = document.getElementById("fecha").value;
    const duracion = parseInt(document.getElementById("duracion").value);
    const contenedor = document.getElementById("resultados");

    if (!paquetes.length) {
      contenedor.innerHTML = "<p>Los datos aún no están disponibles. Intentá de nuevo en unos segundos.</p>";
      return;
    }

    const resultados = paquetes.filter(p => {
      const coincideDestino = p.destino.toLowerCase().includes(destino);

      let coincideFecha = true;
      let diferenciaDias = 0;

      if (fecha) {
        const fechaBusqueda = new Date(fecha);
        const fechaPaquete = new Date(p.fecha);
        const diferenciaEnDias = Math.abs((fechaPaquete - fechaBusqueda) / (1000 * 60 * 60 * 24));
        diferenciaDias = Math.round((fechaPaquete - fechaBusqueda) / (1000 * 60 * 60 * 24));
        coincideFecha = diferenciaEnDias <= 3;
      }

      const coincideDuracion = isNaN(duracion) || p.duracion >= duracion;
      p._diferenciaDias = diferenciaDias;

      return coincideDestino && coincideFecha && coincideDuracion;
    });

    mostrarResultados(resultados, fecha);
  });
});

function mostrarResultados(resultados, fechaBusqueda) {
  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";

  if (!resultados.length) {
    contenedor.innerHTML = "<p>No hay paquetes para tu búsqueda.</p>";
    return;
  }

  resultados.forEach(p => {
    const div = document.createElement("div");
    let mensajeFecha = "";

    if (fechaBusqueda && p.fecha !== fechaBusqueda) {
      const dias = p._diferenciaDias;
      if (dias < 0) {
        mensajeFecha = ` (💡 ${Math.abs(dias)} días antes de lo solicitado)`;
      } else if (dias > 0) {
        mensajeFecha = ` (💡 ${dias} días después de lo solicitado)`;
      }
    }

    div.innerHTML = `
      <h3>${p.destino}</h3>
      <p><strong>Fecha:</strong> ${p.fecha}${mensajeFecha}</p>
      <p><strong>Duración:</strong> ${p.duracion} días</p>
      <p>${p.descripcion}</p>
    `;
    div.classList.add("paquete");
    contenedor.appendChild(div);
  });
}
