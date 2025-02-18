function calcularEnvio() {
    const pais = document.getElementById('pais').value;
    let costoEnvio;

    // Calcula el costo de envío basado en el país ingresado
    switch (pais.toLowerCase()) {
        case 'argentina':
            costoEnvio = 10.000;
            break;
        case 'chile':
            costoEnvio = 18.000;
            break;
        case 'brasil':
            costoEnvio = 30.000;
            break;
        default:
            costoEnvio = 35.000;
    }

    // Muestra el resultado del costo de envío
    document.getElementById('resultadoEnvio').innerText = `Costo de Envío: $${costoEnvio}`;
}
