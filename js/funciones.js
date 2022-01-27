var tiempo_inicial;
var tiempo_final;
var tiempos = [];
var ruta = [];
var flag = false;
var grilla = []
var movimientos = [];
var tiempos_grilla = [];
var ti_grilla = [];
var texto = [];
var grilla_mov = [];
var sizeGrilla = 100;

console.log("Inicio API");


for(var i=1; i <= sizeGrilla; i++){
    grilla.push(0.0);
    var time = new Date();
    ti_grilla.push(time);
}

function iniciarTimer(){
    //tiempo_inicial = performance.now();
    //console.log(window.blazeIT.getCurrentMedia().iA.data.label);
    if(flag){
        flag = !flag;
    }
    tiempo_inicial = new Date();
}

function cambiarFlag(){
    tiempo_final = new Date();
    obtenerTiempo();
    flag = !flag;
}

function detenerTimer(){
    //tiempo_final = performance.now();
    tiempo_final = new Date();
}

function resetGrilla(){
    console.log(grilla);
    for(var i=1; i <= sizeGrilla; i++){
        grilla[i-1] = 0.0;
    }
}

function obtenerTiempo(){
    if(!flag){
        var tiempo = Number(((tiempo_final.valueOf()-tiempo_inicial.valueOf())/1000));
        console.log(`Tiempo en el nodo: ${tiempo} segundos`);
        tiempos.push(tiempo);
        tiempos.push(";");
        movimientos.push(grilla.join(","));
        movimientos.push(";");
        tiempos_grilla.push(grilla_mov.join(","));
        tiempos_grilla.push(";");
        resetGrilla();
        grilla_mov = [];
        console.log(ruta);
    }
}

function guardarNodo(txt){
    ruta.push(txt);
    ruta.push(";");
    //console.log(ruta);
}

function showAlert(txt){
    alert(txt);
}

function imprimirConsole(){
    console.log(tiempos);
    console.log(ruta);
    
}

function guardarArchivo(){
    cambiarFlag();
    if(flag){
        fetch('https://test-tsunami.herokuapp.com/usuario/crear', {
            method: "POST",
            body: JSON.stringify({
                "ruta": ruta.join(""),
                "tiempos": tiempos.join(""),
                "grilla": movimientos.join(""),
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
        ruta.push("\n");
        tiempos.push("\n");
        movimientos.push("\n");
        tiempos_grilla.push("\n");
        texto = texto.concat(ruta);
        texto = texto.concat(tiempos);
        texto = texto.concat(movimientos);
        texto = texto.concat(tiempos_grilla);
        texto.push("###\n");
        ruta = [];
        tiempos = [];
        movimientos = [];
        tiempos_grilla = [];
    }
}

function descargarArchivo(){
    var blob = new Blob(texto, { type: "text/plain;charset=utf-8" });
    saveAs(blob, "data.txt");
}

function funcionRollOver(id){
    console.log(id);
    //console.log("Se entro a:", id);
    var ti = new Date();
    ti_grilla[parseInt(id)-1] = ti;
    grilla_mov.push(id);
}

function funcionRollOut(id){
    //console.log("Se salio de:", id);
    var tf = new Date();
    //En segundos
    var tiempo = Number(((tf.valueOf()-ti_grilla[parseInt(id)-1].valueOf())/1000));
    console.log(tiempo);
    //En milisegundos
    //var tiempo = Number(tf.getTime()-ti_grilla[parseInt(id)-1].getTime());
    grilla[parseInt(id)-1] = (parseFloat(grilla[parseInt(id)-1]) + parseFloat(tiempo)).toFixed(4);
}