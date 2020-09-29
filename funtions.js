function sumador_areas($cables) {
    var area_mm_cable_elegido_array_array = [];
    var area_mm_cable_elegido_array = [];
    var suma_areas_array = [];
    var suma_areas = 0.0;
    var cantidad_conductores = 0;

    var D_mm_cable_elegido_array_array = [];
    var D_mm_cable_elegido_array = [];

    var area_mm_conductor_array_array = [];
    var area_mm_conductor_array = [];

    var D_mm_conductor_array_array = [];
    var D_mm_conductor_array = [];
    
    for (let i_input_tipo_cable = 0; i_input_tipo_cable < 1; i_input_tipo_cable++) {

        for (let i_tipo_cable_array = 0; i_tipo_cable_array < aislantes_conductor_array.length; i_tipo_cable_array++) {
            if (aislantes_conductor_array[i_tipo_cable_array][0] == $cables[i_input_tipo_cable][0]) {
                area_mm_cable_elegido_array_array.push(aislantes_conductor_array[i_tipo_cable_array][1]);
                D_mm_cable_elegido_array_array.push(aislantes_conductor_D_array[i_tipo_cable_array][1]);

                area_mm_conductor_array_array.push(aislantes_conductor_array[5][1]);
                D_mm_conductor_array_array.push(aislantes_conductor_D_array[5][1]);
                break;
            }
        }

        for (let i_input_calibre = 0; i_input_calibre < 28; i_input_calibre++) {
            if (calibres_string_array[i_input_calibre] == $cables[i_input_tipo_cable][1]) {
                area_mm_cable_elegido_array.push(area_mm_cable_elegido_array_array[i_input_tipo_cable][i_input_calibre]);
                suma_areas_array.push(area_mm_cable_elegido_array[i_input_tipo_cable]*$cables[i_input_tipo_cable][2]);
                suma_areas += area_mm_cable_elegido_array[i_input_tipo_cable]*$cables[i_input_tipo_cable][2];
                cantidad_conductores += $cables[i_input_tipo_cable][2];
                D_mm_cable_elegido_array.push(D_mm_cable_elegido_array_array[i_input_tipo_cable][i_input_calibre]);

                area_mm_conductor_array.push(area_mm_conductor_array_array[i_input_tipo_cable][i_input_calibre]);
                D_mm_conductor_array.push(D_mm_conductor_array_array[i_input_tipo_cable][i_input_calibre]);
                break;
            }
        }

    }

    console.log(area_mm_cable_elegido_array_array, area_mm_cable_elegido_array, suma_areas_array, suma_areas)

    return {suma_areas: suma_areas, cantidad_conductores: cantidad_conductores, D_mm_cable_elegido_array:D_mm_cable_elegido_array, area_mm_conductor_array:area_mm_conductor_array, D_mm_conductor_array:D_mm_conductor_array};
}

function seleccionador_areas($area_mm_D_exterior_insertado, $area_mm_conductor_array, $cantidad_conductores, $opcion_multiconductor, $opcion_cable_personalizado, $D_mm_conductor_array, $D_exterior_insertado) {
 
    if ($area_mm_D_exterior_insertado < $area_mm_conductor_array[0]*$cantidad_conductores && $opcion_multiconductor == true && $opcion_cable_personalizado == true) {

        window.alert("Área del cable multiconductor personalizado menor al área del conductor desnudo por numero de conductores, inserta un diámetro del cable real, de forma automatica se establecerá un diámetro según el número de conductores, 1 conductor => D = D_desnudo, 2 conductores => D = 2*D_desnudo, 3 conductores => D = D resultante de una configuracion triángulo equilátero con conductores desnudos, 4 conductores => D = D resultante de una configuracion cuadrada con conductores desnudos");
    
        if ($cantidad_conductores == 1){
            var $D_exterior_insertado = $D_mm_conductor_array[0];
        } else if ($cantidad_conductores == 2) {
            var $D_exterior_insertado = 2*$D_mm_conductor_array[0];
        } else if ($cantidad_conductores == 3) {
            var $D_exterior_insertado = 3*$D_mm_conductor_array[0];
        } else if ($cantidad_conductores == 4) {
            var $D_exterior_insertado = 4*$D_mm_conductor_array[0];
        } else {
            
        }
    
        var $suma_areas = Math.PI*Math.pow($D_exterior_insertado,2)/4;
    
    } else if ($area_mm_D_exterior_insertado < $area_mm_conductor_array[0] && $opcion_multiconductor == false && $opcion_cable_personalizado == true){
        window.alert("Área del cable personalizado menor al área del conductor desnudo, se tomará automáticamente los valores del cable desnudo");
    
        var $D_exterior_insertado = $D_mm_conductor_array[0];
        var $suma_areas = $area_mm_conductor_array[0]*$cantidad_conductores;
    } else if ($opcion_multiconductor == true && $opcion_cable_personalizado == true){
        var $suma_areas = $area_mm_D_exterior_insertado;
    } else if ($opcion_cable_personalizado == true){
        var $suma_areas = $area_mm_D_exterior_insertado*$cantidad_conductores;
    }

    return {$suma_areas:$suma_areas, $D_exterior_insertado:$D_exterior_insertado};

}

function seleccionador_tamano_conduit($tipo_conduit, $suma_areas, $llenado_porc_input, $input_indice_conduit, $cumplir_condicion) {

    for (let i_input_tipo_conduit = 0; i_input_tipo_conduit < tipos_conduit_array.length; i_input_tipo_conduit++) {

        if (tipos_conduit_array[i_input_tipo_conduit][0] == $tipo_conduit) {
            var mm_tamano_conduit_array = tipos_conduit_array[i_input_tipo_conduit][1];
            break;
        }

    }

    var llenado_mm_conduit_calculado;

    for (let i_tamano_conduit = $input_indice_conduit; i_tamano_conduit < mm_tamano_conduit_array.length; i_tamano_conduit++) {

        llenado_mm_conduit_calculado = Math.PI*Math.pow(mm_tamano_conduit_array[i_tamano_conduit],2)/4*$llenado_porc_input/100;
        if (llenado_mm_conduit_calculado >= $suma_areas || $cumplir_condicion == false) {
            var indice_conduit = i_tamano_conduit;
            var mm_tamano_conduit = mm_tamano_conduit_array[i_tamano_conduit];
            var area_mm_conduit_calculado = Math.PI*Math.pow(mm_tamano_conduit_array[i_tamano_conduit],2)/4;
            break;
        }

    }

    var llenado_porc_calculado = $suma_areas*100/area_mm_conduit_calculado;

    console.log(indice_conduit, mm_tamano_conduit_array,  mm_tamano_conduit, area_mm_conduit_calculado, llenado_mm_conduit_calculado, llenado_porc_calculado);

    return {indice_conduit: indice_conduit,  mm_tamano_conduit:  mm_tamano_conduit, llenado_mm_conduit_calculado: llenado_mm_conduit_calculado, llenado_porc_calculado: llenado_porc_calculado};
}

function seleccionador_configuracion($cantidad_conductores, $Dd_resultado, $Dd_configuracion_superior_insertado, $Dd_configuracion_inferior_insertado, $auto_configuracion, $opcion_multiconductor) {
    var $configuración_cumplimiento_resultado = "";

    if ($cantidad_conductores == 1 || $opcion_multiconductor){
        var $configuracion_resultado = "Acunada";
    } else if ($cantidad_conductores == 2) {
        var $configuracion_resultado = "Acunada";
    } else if ($cantidad_conductores == 3) {
        if ($Dd_resultado <= $Dd_configuracion_inferior_insertado){
            var $configuracion_resultado = "Triangular";
        } else if ($Dd_resultado >= $Dd_configuracion_superior_insertado) {
            var $configuracion_resultado = "Acunada";
        } else {
            var $configuracion_resultado = $auto_configuracion;
            $configuración_cumplimiento_resultado = "No cumple ninguna condición";
            console.log("No cumple ninguna condición");
        }
    } else if ($cantidad_conductores == 4) {
        var $configuracion_resultado = "Diamante";
    } else {
        
    }
    
    return {$configuracion_resultado:$configuracion_resultado, $configuración_cumplimiento_resultado:$configuración_cumplimiento_resultado};
}

function calculador_atascamiento($cantidad_conductores, $Dd_resultado, $atascamiento_superior_insertado, $atascamiento_inferior_insertado, $opcion_multiconductor) {
    var $atascamiento_cumplimiento_resultado = "NO HAY";

    if ($cantidad_conductores >= 3 || $opcion_multiconductor == false) {
        if ($Dd_resultado >= $atascamiento_inferior_insertado && $Dd_resultado <= $atascamiento_superior_insertado){
            var $atascamiento_cumplimiento_resultado = "SI HAY";
        } else {

        }
    } else {
        
    }
    
    return $atascamiento_cumplimiento_resultado;
}

function calculador_claro($cantidad_conductores,  $D_exterior, $D_interno_ducto_resultado, $configuracion_resultado, $opcion_multiconductor) {

    if ($cantidad_conductores == 1 || $opcion_multiconductor){
        var $claro_resultado = $D_interno_ducto_resultado - $D_exterior;
    } else if ($cantidad_conductores == 2) {
        var $claro_resultado = $D_interno_ducto_resultado/2 - 1.3666*$D_exterior + ($D_interno_ducto_resultado - $D_exterior)/2*Math.sqrt(1-Math.pow($D_exterior/($D_interno_ducto_resultado - $D_exterior),2));
    } else if ($cantidad_conductores == 3) {
        if ($configuracion_resultado == "Acunada"){
            var $claro_resultado = $D_interno_ducto_resultado/2 - $D_exterior/2 + ($D_interno_ducto_resultado - $D_exterior)/2*Math.sqrt(1-Math.pow(0.5*$D_exterior/($D_interno_ducto_resultado - $D_exterior),2));
        } else if ($configuracion_resultado == "Triangular") {
            var $claro_resultado = $D_interno_ducto_resultado/2 - 1.3666*$D_exterior + ($D_interno_ducto_resultado - $D_exterior)/2*Math.sqrt(1-Math.pow($D_exterior/($D_interno_ducto_resultado - $D_exterior),2));
        } else {

        }
    } else if ($cantidad_conductores == 4) {
        var $claro_resultado = ($D_interno_ducto_resultado - $D_exterior) - (2*Math.pow($D_exterior,2))/($D_interno_ducto_resultado - $D_exterior);
    } else {
        
    }

    if ($claro_resultado >= $claro_insertado) {
        var $claro_cumplimiento_resultado = "CUMPLE";
    } else {
        var $claro_cumplimiento_resultado = "NO CUMPLE";
    }
    
    return {$claro_resultado:$claro_resultado, $claro_cumplimiento_resultado:$claro_cumplimiento_resultado};
}

function calculador_w($cantidad_conductores,  $D_exterior, $D_interno_ducto_resultado, $configuracion_resultado, $opcion_multiconductor) {

    if ($cantidad_conductores == 1 || $opcion_multiconductor){
        var $w = 1;
    } else if ($cantidad_conductores == 2) {
        var $w = 1/(Math.sqrt(1-Math.pow($D_exterior/($D_interno_ducto_resultado - $D_exterior),2)));
    } else if ($cantidad_conductores == 3) {
        if ($configuracion_resultado == "Acunada"){
            var $w = 1 + 4/3*Math.pow($D_exterior/($D_interno_ducto_resultado - $D_exterior),2);
        } else if ($configuracion_resultado == "Triangular") {
            var $w = 1/(Math.sqrt(1-Math.pow($D_exterior/($D_interno_ducto_resultado - $D_exterior),2)));
        } else {

        }
    } else if ($cantidad_conductores == 4) {
        var $w = 1 + 2*Math.pow($D_exterior/($D_interno_ducto_resultado - $D_exterior),2);
    } else {
        
    }
    
    return $w;
}

function obtener_tramos(i) {
    var $tramo;

    var aux_inicio = Number.parseInt(document.getElementById("inicio" + String(i)).innerHTML);
    var aux_fin = Number.parseInt(document.getElementById("fin" + String(i)).innerHTML);
    var aux_tension = Number.parseFloat(document.getElementById("tension" + String(i)).value);
    var aux_PL = Number.parseFloat(document.getElementById("PL" + String(i)).value);
    var aux_Longitud = Number.parseFloat(document.getElementById("Longitud" + String(i)).value);
    var aux_inclinacion = Number.parseFloat(document.getElementById("inclinacion" + String(i)).value);
    var aux_radio = Number.parseFloat(document.getElementById("radio" + String(i)).value);
    var aux_angulo = Number.parseFloat(document.getElementById("angulo" + String(i)).value);
    var aux_lista_desplegable_radio_curva = document.getElementById("lista_desplegable_radio_curva" + String(i)).value;
    var aux_personalizar_tramo = document.getElementById("personalizar_tramo" + String(i)).checked;
    var aux_cumplimiento_tension = document.getElementById("cumplimiento_tension" + String(i)).innerHTML;
    var aux_cumplimiento_PL = document.getElementById("cumplimiento_PL" + String(i)).innerHTML;

    $tramo = [aux_inicio, aux_fin, aux_tension, aux_PL, aux_Longitud, aux_inclinacion, aux_radio, aux_angulo, aux_lista_desplegable_radio_curva, aux_personalizar_tramo, aux_cumplimiento_tension, aux_cumplimiento_PL];
    
    return $tramo;
}

function calculador_tension($tramos, i, $coeficiente_friccion_dinamica, $w, $peso_cable_corregido) {

    if (i <= 0) {
        var tension_anterior = 0;
    } else {
        var tension_anterior = $tramos[i-1][2];
    }

    if ($tramos[i][8] == "recta") {
        var $tension = $peso_cable_corregido * $tramos[i][4] * (Math.sin($tramos[i][5]*Math.PI/180) + $coeficiente_friccion_dinamica*$w*Math.cos($tramos[i][5]*Math.PI/180)) + tension_anterior;
    } else if ($tramos[i][8] == "curva") {
        var $tension = tension_anterior*Math.exp($coeficiente_friccion_dinamica*$w*$tramos[i][7]*Math.PI/180);
        console.log("$tension", tension_anterior, $tension);
    } else {
    
    }

    return $tension;
}

function calculador_PL($tramos, i, $w, $cantidad_conductores, $configuracion_resultado, $opcion_multiconductor) {

    if ($tramos[i][8] == "curva") {
        if ($cantidad_conductores == 1 || $opcion_multiconductor){
           var $PL = $tramos[i][2]/$tramos[i][6];
        } else if ($cantidad_conductores == 2) {
            var $PL = (3*$w-2)*$tramos[i][2]/(3*$tramos[i][6]);
        } else if ($cantidad_conductores == 3) {
            if ($configuracion_resultado == "Acunada"){
                var $PL = (3*$w-2)*$tramos[i][2]/(3*$tramos[i][6]);
            } else if ($configuracion_resultado == "Triangular") {
                var $PL = $w*$tramos[i][2]/(2*$tramos[i][6]);
            } else {
    
            }
        } else if ($cantidad_conductores == 4) {
            var $PL = (3*$w-1)*$tramos[i][2]/$tramos[i][6];
        } else {
            
        }

    } else{
        var $PL = 0;
    }

    return $PL;
}