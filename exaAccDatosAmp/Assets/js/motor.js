function disableButton(control1) {
    control1.disabled = true;
}

function enableButton(control1) {
    control1.disabled = false;
}

/* INICIO - ajaxPost1 - Devuelve el resultado a un DIV (POST) */
function ajaxPost1(form1, controlador1, div1) {
    const Ajax1 = new XMLHttpRequest();
    const FormData1 = new FormData(form1);

    Ajax1.addEventListener("load", function(event) {
        document.getElementById(div1.id).innerHTML = this.responseText;
    });

    Ajax1.addEventListener("error", function(event) {
        alert('Error: no se ha enviado la informacion');
    });

    Ajax1.open("POST", controlador1);
    Ajax1.send(FormData1);
}
/* FIN - ajaxPost1 - Devuelve el resultado a un DIV (POST) */

/* INICIO - ajaxPost2 - Devuelve el resultado a una Alert (POST) */
function ajaxPost2(form1, controlador1, div1) {
    const Ajax1 = new XMLHttpRequest();
    const FormData1 = new FormData(form1);

    Ajax1.addEventListener("load", function(event) {
        alert(this.responseText);
    });

    Ajax1.addEventListener("error", function(event) {
        alert('Error: no se ha enviado la informacion');
    });

    Ajax1.open("POST", controlador1);
    Ajax1.send(FormData1);
}
/* FIN - ajaxPost2 - Devuelve el resultado a una Alert (POST) */

/* INICIO - ajaxGet1 - Devuelve el resultado a un DIV (GET) */
function ajaxGet1(controlador1, div1) {
    let ajax1 = new XMLHttpRequest();
    ajax1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(div1.id).innerHTML = this.responseText;
        }
    };
    ajax1.open("GET", controlador1, true);
    ajax1.send();
}
/* FIN - ajaxGet1 - Devuelve el resultado a un DIV (GET) */

function seleccionarDatos1(form1, boton1, controlador1, div1) {
    disableButton(boton1);
    ajaxPost1(form1, controlador1, div1);
    enableButton(boton1);
    form1.reset();
}

function seleccionarDatos2(form1, boton1, controlador1, div1) {
    disableButton(boton1);
    ajaxGet1(controlador1, div1);
    enableButton(boton1);
    form1.reset();
}

function seleccionarDatos3(form1, boton1, controlador1, div1) {
    disableButton(boton1);
    ajaxGet1(controlador1 + '?valor=' + campo1.value, div1);
    enableButton(boton1);
    form1.reset();
}

function insertarDatos1(form1, boton1, controlador1, div1) {
    disableButton(boton1);
    ajaxPost1(form1, controlador1, div1);
    enableButton(boton1);
    form1.reset();
}

function modificarDatos1(form1, boton1, controlador1, div1) {
    disableButton(boton1);
    ajaxPost1(form1, controlador1, div1);
    enableButton(boton1);
}

/* INICIO - makeFetchFormRequest - Función que devuelve una promesa para formularios usando fetch */
async function makeFetchFormRequest(method, url, form) {
    const formData1 = new FormData(form);

    try {
        const response = await fetch(url, {
            method: method,
            body: formData1,
        });

        if (!response.ok) {
            throw new Error(`Error de red: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Captura del error: ${error.message}`);
    }
}
/* FIN - makeFetchFormRequest - Función que devuelve una promesa para formularios usando fetch */

/* INICIO - Creación de los bloques HTML de respuesta */
function createResponseBlock(item) {
    const bloque0 = document.createElement("div");
    bloque0.classList.add("bloque0");

    const fields = ["mar_coc", "mod_coc", "aut_coc"];
    fields.forEach(field => {
        const div = document.createElement("div");
        div.classList.add("bloque1");

        const link = document.createElement("a");
        link.href = `xxx.php?ide_coc=${item.ide_coc}`;
        link.textContent = item[field];
        
        div.appendChild(link);
        bloque0.appendChild(div);
    });

    return bloque0;
}
/* FIN - Creación de los bloques HTML de respuesta */

window.addEventListener('load', function() {
    const formConsulta1 = document.getElementById("formConsulta1");

    if (formConsulta1) {
        const button1 = document.getElementById("botonConsulta1");
        const controller1 = "Controllers/Consulta1Controller.php";
        const divResponse1 = document.getElementById("contenedor2");

        formConsulta1.addEventListener("submit", async function(event) {
            event.preventDefault();

            try {
                const response1 = await makeFetchFormRequest('POST', controller1, formConsulta1);
                divResponse1.innerHTML = '';

                if (response1.length > 0) {
                    const header = createResponseBlock({
                        mar_coc: "Marca",
                        mod_coc: "Modelo",
                        aut_coc: "Autonomía (km)"
                    });
                    header.classList.add("negrita");
                    divResponse1.appendChild(header);

                    response1.forEach(item => {
                        divResponse1.appendChild(createResponseBlock(item));
                    });
                } else {
                    divResponse1.textContent = 'No hay datos que coincidan con la búsqueda realizada';
                }

                formConsulta1.reset();
            } catch (error) {
                console.error("Error en la petición:", error.message);
                divResponse1.textContent = 'No se ha realizado la acción';
                formConsulta1.reset();
            } finally {
                enableButton(button1);
            }
        });
    }
    const formInsercion2 = document.getElementById("formInsercion2");
    if (formInsercion2) {
        const button2 = document.getElementById("botonInsercion2");
        const controller2 = "Controllers/InsercionController.php";
        const divResponse2 = document.getElementById("contenedor2");

        formInsercion2.addEventListener("submit", async function(event) {
            event.preventDefault();

            try {
                const title = document.getElementById('textoInsercion2').value;
                const response = await fetch(controller2, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `title=${title}`
                });
                const result = await response.json();
                alert(result.message);
                fetchContents();
            } catch (error) {
                console.error("Error en la petición:", error.message);
                divResponse2.textContent = 'No se ha realizado la acción';
            } finally {
                enableButton(button2);
            }
        });

        async function fetchContents() {
            const response = await fetch(controller2);
            const contents = await response.json();
            let output = '<ul>';
            contents.forEach((content, index) => {
                output += `<li>${index + 1}. ${content.tit_con}</li>`;
            });
            output += '</ul>';
            divResponse2.innerHTML = output;
        }

        document.addEventListener('DOMContentLoaded', fetchContents);
    }

    const formInsercion3 = document.getElementById("formInsercion3");
    if (formInsercion3) {
        const button3 = document.getElementById("botonInsercion3");
        const controller3 = "Controllers/ContenidoArtistasController.php";
        const divResponse3 = document.getElementById("contenedor2");

        formInsercion3.addEventListener("submit", async function(event) {
            event.preventDefault();

            try {
                const artist_id = document.getElementById('textoInsercion3').value;
                const content_id = document.getElementById('textoInsercion4').value;
                const response = await fetch(controller3, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `artist_id=${artist_id}&content_id=${content_id}`
                });
                const result = await response.json();
                alert(result.message);
                fetchArtistContents();
            } catch (error) {
                console.error("Error en la petición:", error.message);
                divResponse3.textContent = 'No se ha realizado la acción';
            } finally {
                enableButton(button3);
            }
        });

        async function fetchArtistContents() {
            const response = await fetch(controller3);
            const artistContents = await response.json();
            let output = '<ul>';
            artistContents.forEach(ac => {
                output += `<li>${ac.non_art} - ${ac.tit_con}</li>`;
            });
            output += '</ul>';
            divResponse3.innerHTML = output;
        }

        document.addEventListener('DOMContentLoaded', fetchArtistContents);
    }

    const formInsercion1 = document.getElementById("formInsercion1");
    if (formInsercion1) {
        const button1 = document.getElementById("botonInsercion1");
        const controller1 = "Controllers/ArtistasController.php";
        const divResponse1 = document.getElementById("contenedor2");

        formInsercion1.addEventListener("submit", async function(event) {
            event.preventDefault();

            try {
                const name = document.getElementById('textoInsercion1').value;
                const response = await fetch(controller1, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `name=${name}`
                });
                const result = await response.json();
                alert(result.message);
                fetchArtists();
            } catch (error) {
                console.error("Error en la petición:", error.message);
                divResponse1.textContent = 'No se ha realizado la acción';
            } finally {
                enableButton(button1);
            }
        });

        async function fetchArtists() {
            const response = await fetch(controller1);
            const artists = await response.json();
            let output = '<ul>';
            artists.forEach((artist, index) => {
                output += `<li>${index + 1}. ${artist.non_art}</li>`;
            });
            output += '</ul>';
            divResponse1.innerHTML = output;
        }

        document.addEventListener('DOMContentLoaded', fetchArtists);
    }
});