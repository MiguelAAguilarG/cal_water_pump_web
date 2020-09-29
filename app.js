const densidad = 1000; // kg/m^3
const gravedad = 9.81; // m/s^2
const hp = 745.7; // hp
const tabla_3_2_array = [ [0.5, 1.0, 1.6, 3.0, 5.0, 8.0, 15.0, 25.0], ["3/4\"","1\"", "1 1/4\"", "1 1/2\"", "2\"", "2 1/2\"", "3\"", "4\""], [0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4]]; // Q[l/s] D[pulg] pulg

window.addEventListener("DOMContentLoaded", calculo_principal, false);
document.getElementById("formulario0").addEventListener("change", calculo_principal);
document.getElementById("formulario").addEventListener("change", calculo_principal);

function calculo_principal() {
    console.log("cambio");

    decimales = Number.parseInt(document.getElementById("decimales").value);

    /*datos */

    var altura = Number.parseFloat(document.getElementById("altura").value);
    var capacidad = Number.parseFloat(document.getElementById("capacidad").value);
    var tiempo = Number.parseFloat(document.getElementById("tiempo").value);
    var eficiencia = Number.parseFloat(document.getElementById("eficiencia").value);

    /*calculos */
    var potencia = capacidad/1000*densidad*altura/(tiempo*60)*gravedad/hp/eficiencia;
    console.log(potencia);

    var flujo = capacidad/(tiempo*60); // L/s
    console.log(flujo);
    
    for (let index = 0; index < tabla_3_2_array[0].length; index++) {
        if (flujo <= tabla_3_2_array[0][index]) {
            var velocidad = flujo/1000/(Math.pow(tabla_3_2_array[2][index]*2.54/100/2, 2)*Math.PI);
            var impulsion = tabla_3_2_array[1][index];
            var succion = tabla_3_2_array[1][index+1];

            if(index == tabla_3_2_array[0].length-1) {
                succion = ">4\"";
            }
            break;

        }else if(index == tabla_3_2_array[0].length-1) {
            alert("Aumenta el tiempo de llenado")
        }

    }

    /*resultados */

    document.getElementById("potencia").innerHTML = potencia.toFixed(decimales);
    document.getElementById("potencia_W").innerHTML = (potencia*hp).toFixed(decimales);
    document.getElementById("succion").innerHTML = succion;
    document.getElementById("impulsion").innerHTML = impulsion;
    document.getElementById("flujo").innerHTML = flujo.toFixed(decimales);
    document.getElementById("velocidad").innerHTML = velocidad.toFixed(decimales);

}