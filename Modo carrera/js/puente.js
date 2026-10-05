/* Puente minijuego -> carrera (solo vive en la carpeta "Modo carrera").
   Los minijuegos son copias de los originales; los originales no se tocan. */
(function () {
    window.reportarEntreno = function (juego, gano) {
        try {
            localStorage.setItem("idolo-entreno", JSON.stringify({
                juego: juego, gano: !!gano, ts: Date.now()
            }));
        } catch (e) {}
    };

    function volver() {
        window.location.href = "../index.html";
    }
    window.volverCarrera = volver;

    if (!document.querySelector("[data-volver-carrera]")) {
        const a = document.createElement("a");
        a.setAttribute("data-volver-carrera", "1");
        a.textContent = "← VOLVER A LA CARRERA";
        a.href = "../index.html";
        a.style.cssText = "position:fixed;top:12px;left:12px;z-index:9999;background:#ff7518;color:#fff;font-family:monospace;font-size:12px;font-weight:800;padding:10px 14px;text-decoration:none;letter-spacing:1px;border:2px solid #000;";
        const poner = () => document.body && document.body.prepend(a);
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", poner);
        else poner();
    }
})();
