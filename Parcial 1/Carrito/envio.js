function calcularEnvio() {
    const pais = document.getElementById('pais').value;
    let costoEnvio;

    // Calcula el costo de envío basado en el país ingresado
    switch (pais.toLowerCase()) {
        case 'argentina':
            costoEnvio = 10000;
            break;
        case 'chile':
            costoEnvio = 18000;
            break;
        case 'brasil':
            costoEnvio = 30000;
            break;
        default:
            costoEnvio = 35000;
    }

    // Muestra el resultado del costo de envío
    document.getElementById('resultadoEnvio').innerText = `Costo de Envío: $${costoEnvio}`;
}
