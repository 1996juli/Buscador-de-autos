//Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//Contenedor para los resultados
const resultado = document.querySelector("#resultado");

const max = new Date().getFullYear(); //metodo que nos trae el año actual
const min = max - 10;

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca : "",
    year : "",
    minimo : "",
    maximo : "",
    puertas : "",
    transmision : "",
    color : ""
}

//Eventos
document.addEventListener("DOMContentLoaded",() =>{
    mostrarAutos(autos); //muestra los autos al cargar

    //Llena las opciones de años
    llenarSelect();
})

//Event Listener para los select de busqueda
marca.addEventListener("change", (e) =>{ //forma de leer los select // se coloca e para leer el valor
    datosBusqueda.marca = e.target.value; 
    filtrarAuto();

})

year.addEventListener("change", (e) =>{ 
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
})

minimo.addEventListener("change", (e) =>{ 
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
})

maximo.addEventListener("change", (e) =>{ 
    datosBusqueda.maximo = e.target.value; 
    filtrarAuto();
})

puertas.addEventListener("change", (e) =>{ 
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto(); 
})

transmision.addEventListener("change", (e) =>{ 
    datosBusqueda.transmision = e.target.value; 
    filtrarAuto();
})

color.addEventListener("change", (e) =>{ 
    datosBusqueda.color = e.target.value;
    filtrarAuto(); 

    //console.log(datosBusqueda);
})


//Funciones
function mostrarAutos(autos){ //funcion que muestra los objetos en el html
    
    limpiarHTML(); //elimina html previo

    autos.forEach( auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement("P");

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - Puertas: ${puertas} - Transmision: ${transmision} - Precio: ${precio} - Color: ${color} 
        `;

        //Insertar en el HTML
        resultado.appendChild(autoHTML);


    });
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect(){
    for( let i= max; i>= min; i--){ // codigo creado para que aparezca el año desde 2021 a 2010 (orden decreciente)
        const opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //agrega las opciones de año.
    }
}
//funcion que filtra en base a la busqueda 
function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca).filter( filtrarYear).filter( filtrarMinimo).filter( filtrarMaximo).filter( filtrarPuertas).filter( filtrarTransmision).filter( filtrarColor);
    //console.log(resultado);
    
    if(resultado.length){
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement("DIV");
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent ="No hay resultados, intenta con otros terminos de busqueda";
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda; //destructuring
    if(marca) {
        return auto.marca === marca;
    }
    return auto; //forma de mantener los valores si no se ha seleccionado algun campo.
}

function filtrarYear(auto){
    const {year} = datosBusqueda; //destructuring
    if(year) {
        return auto.year === year;
    }
    return auto; //forma de mantener los valores si no se ha seleccionado algun campo.
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda; //destructuring
    if(minimo) {
        return auto.precio >= minimo;
    }
    return auto; //forma de mantener los valores si no se ha seleccionado algun campo.
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda; //destructuring
    if(maximo) {
        return auto.precio <= maximo;
    }
    return auto; //forma de mantener los valores si no se ha seleccionado algun campo.
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda; //destructuring
    if(puertas) {
        return auto.puertas === puertas;
    }
    return auto; //forma de mantener los valores si no se ha seleccionado algun campo.
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda; //destructuring
    if(transmision) {
        return auto.transmision === transmision;
    }
    return auto; //forma de mantener los valores si no se ha seleccionado algun campo.
}

function filtrarColor(auto){
    const {color} = datosBusqueda; //destructuring
    if(color) {
        return auto.color === color;
    }
    return auto; //forma de mantener los valores si no se ha seleccionado algun campo.
}