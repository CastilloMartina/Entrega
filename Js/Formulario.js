 document.querySelector("form").addEventListener("submit", function(event) {
            event.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const destino = document.getElementById("destino").value;
            const pasajeros = document.getElementById("pasajeros").value;
            const estacion = document.querySelector('input[name="estacion"]:checked')?.value;

            console.log("Reserva:");
            console.log("Nombre:", nombre);
            console.log("Destino:", destino);
            console.log("Pasajeros:", pasajeros);
            console.log("Estación preferida:", estacion);

            const confirmacion = prompt(`¿Confirmás tu destino a "${destino}"? (sí/no)`);

            if (confirmacion?.toLowerCase() === "sí") {
                alert("¡Reserva confirmada! Gracias por confiar en JetMood ✈️");
                console.log("Destino confirmado:", destino);
            } else {
                alert("Reserva cancelada. Podés modificar el destino.");
                console.log("Reserva no confirmada");
            }
        });






