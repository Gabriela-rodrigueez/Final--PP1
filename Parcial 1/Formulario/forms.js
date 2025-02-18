$(document).ready(function() {
    console.log("JavaScript cargado y listo");

    // Mover la caja rosa y alternar secciones
    $('#signup').click(function() {
        $('.pinkbox').css('transform', 'translateX(80%)');
        $('.signin').addClass('nodisplay');
        $('.signup').removeClass('nodisplay');
    });

    $('#signin').click(function() {
        $('.pinkbox').css('transform', 'translateX(0%)');
        $('.signup').addClass('nodisplay');
        $('.signin').removeClass('nodisplay');
    });

    // Validación y envío del formulario de registro
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();  // Prevenir el envío por defecto
        console.log("Formulario de registro enviado");

        // .val(): Obtiene el valor ingresado por el usuario.
        // .trim(): Elimina espacios en blanco al inicio y final del valor, para evitar causar errores.

        var formData = $(this).serialize();

        $.ajax({
            url: 'Registro.php',
            type: 'POST',
            data: formData,
            success: function(response) {
                console.log(response);
                $('#formMessage').html(`<p style='color: green;'>${response}</p>`);
                if (response.includes("Registro exitoso")) {
                    setTimeout(() => window.location.href = '../Principal/IsMaJo.html', 2000);
                }
            },
            error: function() {
                $('#formMessage').html("<p style='color: red;'>Ocurrió un error. Inténtalo de nuevo.</p>");
            }
        });
    });

    // Validación del formulario de inicio de sesión
    $('#formsForm').on('submit', function(e) {
        e.preventDefault(); // Prevenir el envío por defecto
        
        var formData = $(this).serialize();
        
        $.ajax({
            url: 'Login.php',
            type: 'POST',
            data: formData,
            success: function(response) {
                console.log(response);
                if(response.includes("Inicio de sesión exitoso")) {
                    window.location.href = '../Principal/IsMaJo.html';
                } else {
                    $('#formMessage').html(`<p style='color: red;'>${response}</p>`);
                }
            },
            error: function() {
                $('#formMessage').html("<p style='color: red;'>Error al iniciar sesión.</p>");
            }
        });
    });

    // Recuperar usuario guardado en "Recordar usuario"

    if ($('#remember').is(':checked')) {
        localStorage.setItem("savedUsername", $('#formsForm input[name="username"]').val());
    }
    

    // // Botón de cierre de sesión
    // $('#logout').click(function() {
    // //     $.ajax({
    // //         url: 'Logout.php',
    // //         type: 'GET',
    // //         success: function() {
    // //             window.location.href = 'forms.html';
    // //         },
    // //         error: function() {
    // //             alert('Error al cerrar sesión');
    // //         }
    // //     });
    
    //     $.ajax({
    //         url: 'Logout.php',
    //         type: 'POST',
    //         success: function() {
    //             localStorage.removeItem("savedUsername");
    //             window.location.href = 'forms.html';
    //         },
    //         error: function() {
    //             alert('Error al cerrar sesión');
    //         }
    //     });
    // });
    
    
    // Caracteristicas de la contraseña
    
    let password = document.getElementById("password");
    let toggleBtn = document.getElementById("toggleBtn");
    let lowerCase = document.getElementById("lower");
    let upperCase = document.getElementById("upper");
    let digit = document.getElementById("number");
    let specialChar = document.getElementById("special");
    let minLength = document.getElementById("length");
    
    // Mostrar u ocultar contraseña
    toggleBtn.onclick = function(){
        if (password.type === 'password') {
            password.setAttribute('type', 'text');
            toggleBtn.classList.add('hide');
        }
        else {
            password.setAttribute('type', 'password');
            toggleBtn.classList.remove('hide');
        }
    }
    
    password.addEventListener('input', function() {
        checkPassword(password.value);
    });

    function checkPassword(data){
        const lower = new RegExp('(?=.*[a-z])');
        const upper = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const special = new RegExp('(?=.*[!@#\$%\^&\*\.\-])');
        const length = new RegExp('(?=.{8,})');
        
        // Validación de minúsculas
        if(lower.test(data)){
            lowerCase.classList.add('valid');
        }else{
            lowerCase.classList.remove('valid');
        }
    
        // Validación de mayúsculas
        if(upper.test(data)){
            upperCase.classList.add('valid');
        }else{
            upperCase.classList.remove('valid');
        }
    
        // Validación de números
        if(number.test(data)){
            digit.classList.add('valid');
        }else{
            digit.classList.remove('valid');
        }
    
        // Validaciónde caracteres especiales
        if(special.test(data)){
            specialChar.classList.add('valid');
        }else{
            specialChar.classList.remove('valid');
        }
    
        // Validación de la longitud mínima de la contraseña
        if(length.test(data)){
            minLength.classList.add('valid');
        }else{
            minLength.classList.remove('valid');
        }
    }
});




