function register() {
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var femail = document.getElementById('femail').value;
    var fpw = document.getElementById('pw').value;
    var addressline = document.getElementById('addressline').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var Data = {
        password: fpw,
        customer: {
            email: femail,
            firstName: fname,
            lastName: lname,
            addressLine: addressline,
            city: city,
            state: state,
        }
    };
    console.log(JSON.stringify(Data));
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/register");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");


    xhr.send(JSON.stringify(Data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var cus = JSON.parse(xhr.responseText);
            console.log(JSON.stringify(cus));
        }
    };
}

function valpw () {
    if ($('#pw').val() === $('#rpw').val()) {
        $('#message').html('Matching').css('color', 'green');
    } else
        $('#message').html('Not Matching').css('color', 'red');
}