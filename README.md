# RJVAlert.js

**RJVAlert.js** es una librería de mensajes emergentes moderna, compatible con la migración de quienes usan SweetAlert2, que ofrece animaciones premium, iconos SVG personalizados y soporte completo para modos claro y oscuro.


==========================================================================================================


## Características

- **Iconos SVG personalizados** para cada tipo de mensaje: success, error, warning, info, etc.
- **Animaciones** con un borde dinámico y brillos suaves.
- Soporte para **modo oscuro y claro** con colores configurables.
- **Fácil personalización**: permite agregar iconos y cambiar textos de alerta dinámicamente.


==========================================================================================================


## Instalación

Puedes utilizar **RJVAlert.js** mediante CDN, simplemente incluyendo los siguientes enlaces en tu archivo HTML.


==========================================================================================================


### **Instalación vía CDN**

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ramirojv/RJVAlert/dist/rjvalert.min.css">

<!-- JS -->
<script src="https://cdn.jsdelivr.net/gh/ramirojv/RJVAlert/dist/rjvalert.min.js"></script>
Uso Básico
Para mostrar una alerta de éxito:

js
 
rjvAlert.success("Operación exitosa", "Los cambios fueron guardados correctamente.");
Personalización de Iconos
Puedes elegir cualquiera de los iconos disponibles usando su nombre:

js
 
rjvAlert.show({
    icon: "guardar",  // Usa el icono "guardar"
    title: "Archivo guardado",
    text: "Tu archivo fue guardado correctamente."
});

==========================================================================================================

Lista de iconos disponibles:

success: tilde_ok_verde

error: cruz_roja

warning: advertencia_roja

info: info

question: ayuda

input: lapiz

guardar: guardar

mensaje: mensaje

folder: folder

telefono: telefono

buscar: lupa

portafolio: portafolio

tarea: tarea

telefono: telefono

calendar: calendario

monitoreo: monitor

oem_original: oem_original

etiqueta_tag: etiqueta_tag

documento_file: documento_file

documento_file_text: documento_file_text

cruz_roja: cruz_roja

codebar: codebar

cabeza_informacion: informacion

llave: llave

archivo: archivo

guardar_documento: guardar_documento

lupa_buscar: lupa_buscar

menu_navegacion: menu_navegacion

alerta_error: alerta_error

alerta_exito: alerta_exito


==========================================================================================================


Modo Oscuro y Claro
RJVAlert.js es totalmente compatible con los modos claro y oscuro, con colores predefinidos que puedes cambiar según tus necesidades.

js
 
// Para cambiar el modo a oscuro:
rjvAlert.setTheme("dark");

// Para cambiar el modo a claro:
rjvAlert.setTheme("light");
Ejemplo Completo
html
 
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Demo RJVAlert</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ramirojv/RJVAlert/dist/rjvalert.min.css">
</head>
<body>
    <button onclick="rjvAlert.success('Operación exitosa', 'Todo salió bien.');">Mostrar Alerta</button>

    <script src="https://cdn.jsdelivr.net/gh/ramirojv/RJVAlert/dist/rjvalert.min.js"></script>
</body>
</html>

==========================================================================================================


Demostración en Línea
Puedes ver una demostración interactiva de RJVAlert en este enlace.


==========================================================================================================


Contribuciones
¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar RJVAlert, puedes realizar un pull request o abrir un issue.


==========================================================================================================


Licencia
Este proyecto está licenciado bajo la MIT License.


==========================================================================================================


Autor
RJVAlert.js fue creado y es mantenido por Ramiro Jesús Vidable - RamiroJV.com
Tucumán, Argentina