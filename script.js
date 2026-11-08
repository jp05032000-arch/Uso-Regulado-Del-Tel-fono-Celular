document.addEventListener("DOMContentLoaded", () => {
  // Crear partículas luminosas
  const contenedor = document.getElementById("particulas");

  if (contenedor) {
    const cantidad = window.innerWidth < 600 ? 28 : 55;

    for (let i = 0; i < cantidad; i++) {
      const particula = document.createElement("span");
      particula.className = "particula";

      particula.style.left = Math.random() * 100 + "%";
      particula.style.top = Math.random() * 100 + "%";
      particula.style.setProperty(
        "--duracion",
        (5 + Math.random() * 8) + "s"
      );
      particula.style.setProperty(
        "--retraso",
        (-Math.random() * 8) + "s"
      );

      const tamano = 2 + Math.random() * 3;
      particula.style.width = tamano + "px";
      particula.style.height = tamano + "px";

      contenedor.appendChild(particula);
    }
  }

  // Abrir y cerrar el menú en celulares
  const botonMenu = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");

  if (botonMenu && menu) {
    botonMenu.addEventListener("click", () => {
      const abierto = menu.classList.toggle("abierto");
      botonMenu.setAttribute("aria-expanded", String(abierto));
      botonMenu.setAttribute(
        "aria-label",
        abierto ? "Cerrar menú" : "Abrir menú"
      );
      botonMenu.textContent = abierto ? "✕" : "☰";
    });

    menu.querySelectorAll("a").forEach(enlace => {
      enlace.addEventListener("click", () => {
        menu.classList.remove("abierto");
        botonMenu.textContent = "☰";
        botonMenu.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Aparición gradual de las tarjetas
  const tarjetas = document.querySelectorAll(".tarjeta");

  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas, obs) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          obs.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });

    tarjetas.forEach(tarjeta => {
      tarjeta.classList.add("aparecer");
      observador.observe(tarjeta);
    });
  } else {
    tarjetas.forEach(tarjeta => tarjeta.classList.add("visible"));
  }

  // Año automático en elementos que lo necesiten
  document.querySelectorAll("[data-anio]").forEach(elemento => {
    elemento.textContent = new Date().getFullYear();
  });
});