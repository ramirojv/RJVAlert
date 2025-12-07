/*!
 * RJVAlert.js
 * Autor: RamiroJV.com | Vidable Ramiro Jesús - Tucumán - Argentina
 */

(function (global) {
  "use strict";

  // MAPA COMPLETO DE ICONOS (nombre lógico -> ruta relativa)
  const RJV_SVG_ICONS = {
    aderecha: "https://ramirojv.com/RJVAlert/svg/aderecha.svg",
    advertencia_roja: "https://ramirojv.com/RJVAlert/svg/advertencia_roja.svg",
    ayuda: "https://ramirojv.com/RJVAlert/svg/ayuda.svg",
    binoculares: "https://ramirojv.com/RJVAlert/svg/binoculares.svg",
    calendario: "https://ramirojv.com/RJVAlert/svg/calendario.svg",
    codebar: "https://ramirojv.com/RJVAlert/svg/codebar.svg",
    config: "https://ramirojv.com/RJVAlert/svg/config.svg",
    cono: "https://ramirojv.com/RJVAlert/svg/cono.svg",
    corbata: "https://ramirojv.com/RJVAlert/svg/corbata.svg",
    cruz_roja: "https://ramirojv.com/RJVAlert/svg/cruz_roja.svg",
    documento_file: "https://ramirojv.com/RJVAlert/svg/documento_file.svg",
    documento_file_text: "https://ramirojv.com/RJVAlert/svg/documento_file_text.svg",
    etiqueta_tag: "https://ramirojv.com/RJVAlert/svg/etiqueta_tag.svg",
    filtrar: "https://ramirojv.com/RJVAlert/svg/filtrar.svg",
    folder: "https://ramirojv.com/RJVAlert/svg/folder.svg",
    guardar: "https://ramirojv.com/RJVAlert/svg/guardar.svg",
    home: "https://ramirojv.com/RJVAlert/svg/home.svg",
    info: "https://ramirojv.com/RJVAlert/svg/info.svg",
    lapiz: "https://ramirojv.com/RJVAlert/svg/lapiz.svg",
    llave: "https://ramirojv.com/RJVAlert/svg/llave.svg",
    lupa: "https://ramirojv.com/RJVAlert/svg/lupa.svg",
    mas: "https://ramirojv.com/RJVAlert/svg/mas.svg",
    mas_verde: "https://ramirojv.com/RJVAlert/svg/mas_verde.svg",
    menos_rojo: "https://ramirojv.com/RJVAlert/svg/menos_rojo.svg",
    mensaje: "https://ramirojv.com/RJVAlert/svg/mensaje.svg",
    monitor: "https://ramirojv.com/RJVAlert/svg/monitor.svg",
    oem_original: "https://ramirojv.com/RJVAlert/svg/oem_original.svg",
    portafolio: "https://ramirojv.com/RJVAlert/svg/portafolio.svg",
    tarea: "https://ramirojv.com/RJVAlert/svg/tarea.svg",
    telefono: "https://ramirojv.com/RJVAlert/svg/telefono.svg",
    tijera: "https://ramirojv.com/RJVAlert/svg/tijera.svg",
    tilde_ok_verde: "https://ramirojv.com/RJVAlert/svg/tilde_ok_verde.svg"
  };

  const TYPE_DEFAULT_ICON = {
    success: "tilde_ok_verde",
    error: "cruz_roja",
    warning: "advertencia_roja",
    info: "info",
    question: "ayuda",
    input: "lapiz"
  };

  const SPARK_SVG_BIG = `
<svg viewBox="0 0 140 140">
  <defs>
    <radialGradient id="rjv-spark-core" cx="50%" cy="50%" r="50%">
      <stop offset="0%"  stop-color="#ffffff" stop-opacity="1" />
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="70%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <filter id="rjv-spark-blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
  <g filter="url(#rjv-spark-blur)">
    <circle cx="70" cy="70" r="18" fill="url(#rjv-spark-core)" />
    <rect x="69" y="20" width="2" height="100" fill="url(#rjv-spark-core)" />
    <rect x="69" y="20" width="2" height="100"
          fill="url(#rjv-spark-core)" transform="rotate(90 70 70)" />
    <rect x="69" y="20" width="2" height="100"
          fill="url(#rjv-spark-core)" transform="rotate(45 70 70)" />
    <rect x="69" y="20" width="2" height="100"
          fill="url(#rjv-spark-core)" transform="rotate(135 70 70)" />
  </g>
</svg>`;

  const SPARK_SVG_SMALL = `
<svg viewBox="0 0 140 140">
  <defs>
    <radialGradient id="rjv-spark-core-small" cx="50%" cy="50%" r="50%">
      <stop offset="0%"  stop-color="#ffffff" stop-opacity="1" />
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.85" />
      <stop offset="80%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <filter id="rjv-spark-blur-small" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" />
    </filter>
  </defs>
  <g filter="url(#rjv-spark-blur-small)">
    <circle cx="70" cy="70" r="16" fill="url(#rjv-spark-core-small)" />
    <rect x="69" y="25" width="2" height="90" fill="url(#rjv-spark-core-small)" />
    <rect x="69" y="25" width="2" height="90"
          fill="url(#rjv-spark-core-small)" transform="rotate(90 70 70)" />
    <rect x="69" y="25" width="2" height="90"
          fill="url(#rjv-spark-core-small)" transform="rotate(45 70 70)" />
    <rect x="69" y="25" width="2" height="90"
          fill="url(#rjv-spark-core-small)" transform="rotate(135 70 70)" />
  </g>
</svg>`;

  let overlay, card, highlightEl, iconImg, titleEl, textEl,
      inputRow, inputEl, btnConfirm, btnCancel,
      sparkleBig, sparkleSmall;

  let activeResolve = null;
  let currentOptions = null;

  function ensureDOM() {
    if (overlay) return;

    overlay = document.createElement("div");
    overlay.className = "rjv-alert-overlay";

    overlay.innerHTML = `
      <div class="rjv-alert-card">
        <div class="rjv-alert-slab"></div>
        <div class="rjv-alert-highlight"></div>
        <div class="rjv-edge-sparkle rjv-edge-big">${SPARK_SVG_BIG}</div>
        <div class="rjv-edge-sparkle rjv-edge-small">${SPARK_SVG_SMALL}</div>

        <div class="rjv-alert-inner">
          <div class="rjv-alert-header">
            <div class="rjv-alert-icon">
              <img class="rjv-alert-icon-img" alt="">
            </div>
            <div class="rjv-alert-title-group">
              <h2 class="rjv-alert-title"></h2>
              <p class="rjv-alert-text"></p>
            </div>
          </div>

          <div class="rjv-alert-input-row" style="display:none;">
            <input type="text">
          </div>

          <div class="rjv-alert-actions">
            <button type="button" class="rjv-btn rjv-btn-cancel">Cancelar</button>
            <button type="button" class="rjv-btn rjv-btn-confirm">Aceptar</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    card         = overlay.querySelector(".rjv-alert-card");
    highlightEl  = overlay.querySelector(".rjv-alert-highlight");
    iconImg      = overlay.querySelector(".rjv-alert-icon-img");
    titleEl      = overlay.querySelector(".rjv-alert-title");
    textEl       = overlay.querySelector(".rjv-alert-text");
    inputRow     = overlay.querySelector(".rjv-alert-input-row");
    inputEl      = inputRow.querySelector("input");
    btnConfirm   = overlay.querySelector(".rjv-btn-confirm");
    btnCancel    = overlay.querySelector(".rjv-btn-cancel");
    sparkleBig   = overlay.querySelector(".rjv-edge-big");
    sparkleSmall = overlay.querySelector(".rjv-edge-small");

    btnConfirm.addEventListener("click", () => closeAlert(true));
    btnCancel.addEventListener("click", () => closeAlert(false));

    overlay.addEventListener("click", (e) => {
      if (!currentOptions) return;
      if (e.target === overlay) {
        if (currentOptions.allowOutsideClick === false) return;
        closeAlert(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (!overlay || overlay.style.display !== "flex") return;
      if (e.key === "Escape") {
        if (currentOptions && currentOptions.allowEscapeKey === false) return;
        closeAlert(false);
      }
      if (e.key === "Enter") {
        if (currentOptions && currentOptions.allowEnter === false) return;
        closeAlert(true);
      }
    });

    document.addEventListener("mousemove", handleMouseMove);
  }

  // luz interna + brillos siguiendo al mouse incluso fuera del card
  function handleMouseMove(e) {
    if (!overlay || overlay.style.display !== "flex" || !card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;

    if (highlightEl) {
      if (inside) {
        const posX = (x / rect.width) * 100;
        const posY = (y / rect.height) * 100;
        highlightEl.style.background =
          `radial-gradient(circle at ${posX}% ${posY}%,` +
          ` rgba(255,255,255,0.22), transparent 65%)`;
        highlightEl.style.opacity = "1";
      } else {
        highlightEl.style.opacity = "0";
      }
    }

    moveSparkles(rect, e.clientX, e.clientY);
  }

  function moveSparkles(rect, clientX, clientY) {
    if (!sparkleBig || !sparkleSmall) return;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    let angle = Math.atan2(clientY - cy, clientX - cx);
    if (angle < 0) angle += Math.PI * 2;
    const t = angle / (2 * Math.PI);

    moveSparkleOnRect(sparkleBig, t, rect);
    moveSparkleOnRect(sparkleSmall, (t + 0.5) % 1, rect);
  }

  function moveSparkleOnRect(el, t, rect) {
    const w = rect.width;
    const h = rect.height;
    const perimeter = 2 * (w + h);

    let s = t * perimeter;
    let x, y;

    if (s <= w) {
      x = s; y = 0;
    } else if (s <= w + h) {
      x = w; y = s - w;
    } else if (s <= 2 * w + h) {
      x = w - (s - (w + h)); y = h;
    } else {
      x = 0; y = h - (s - (2 * w + h));
    }

    el.style.left = x + "px";
    el.style.top  = y + "px";
  }

  function openAlert(opts) {
    ensureDOM();

    const base = {
      type: "info",
      title: "",
      text: "",
      showCancelButton: false,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      input: null,
      inputPlaceholder: "",
      inputValue: "",
      icon: null,
      allowOutsideClick: true,
      allowEscapeKey: true,
      allowEnter: true
    };

    currentOptions = Object.assign(base, opts || {});
    const type = currentOptions.type || "info";

    card.className = "rjv-alert-card rjv-type-" + type;

    titleEl.textContent = currentOptions.title || "";
    textEl.textContent  = currentOptions.text  || "";

    const iconKey =
      currentOptions.icon ||
      TYPE_DEFAULT_ICON[type] ||
      "info";

    const iconUrl =
      RJV_SVG_ICONS[iconKey] ||
      RJV_SVG_ICONS.info;

    iconImg.src = iconUrl;

    if (currentOptions.input) {
      inputRow.style.display = "";
      inputEl.type = currentOptions.input;
      inputEl.placeholder = currentOptions.inputPlaceholder || "";
      inputEl.value = currentOptions.inputValue || "";
      setTimeout(() => inputEl.focus(), 50);
    } else {
      inputRow.style.display = "none";
      inputEl.value = "";
    }

    btnConfirm.textContent = currentOptions.confirmButtonText || "Aceptar";
    btnCancel.textContent  = currentOptions.cancelButtonText  || "Cancelar";
    btnCancel.style.display = currentOptions.showCancelButton ? "" : "none";

    overlay.style.display = "flex";
    requestAnimationFrame(() => overlay.classList.add("rjv-open"));

    return new Promise((resolve) => {
      activeResolve = resolve;
    });
  }

  function closeAlert(confirmed) {
    if (!overlay) return;

    const value =
      (inputRow && inputRow.style.display !== "none")
        ? inputEl.value
        : null;

    overlay.classList.remove("rjv-open");
    const delay = 280;

    setTimeout(() => {
      overlay.style.display = "none";
      if (activeResolve) {
        activeResolve({ isConfirmed: !!confirmed, value: value });
      }
      activeResolve = null;
    }, delay);
  }

  function typed(type, title, text, extra) {
    if (typeof title === "object" && title !== null) {
      const o = Object.assign({ type }, title);
      return openAlert(o);
    }
    const options = Object.assign({ type, title, text }, extra || {});
    return openAlert(options);
  }

  const api = {
    fire: openAlert,

    success:  (t, tx, o) => typed("success",  t, tx, o),
    error:    (t, tx, o) => typed("error",    t, tx, o),
    warning:  (t, tx, o) => typed("warning",  t, tx, o),
    info:     (t, tx, o) => typed("info",     t, tx, o),
    question: (t, tx, o) => typed("question", t, tx, o),

    prompt: (options) => {
      const base = {
        type: "question",
        icon: TYPE_DEFAULT_ICON.input,
        showCancelButton: true,
        input: "text",
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar"
      };
      return openAlert(Object.assign(base, options || {}));
    },

    icons: RJV_SVG_ICONS,
    typeIcons: TYPE_DEFAULT_ICON
  };

  global.rjAlert = api;

})(window);
