let slideIndex = 1;
let customerId = "";
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
}

function getParty() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/data/party");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.response;
            console.log(data);
            buildHtmlTable(data, "#party");
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
}

function getChef() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/data/chef");
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.response;
            console.log(data);
            buildHtmlTable(data, "#chefs");
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
}

function buildHtmlTable(resp, selector) {
    var columns = addAllColumnHeaders(resp, selector);

    for (var i = 0; i < resp.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = resp[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $(selector).append(row$);
    }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $(selector).append(headerTr$);

    return columnSet;
}
function valpw () {
    if ($('#pw').val() === $('#rpw').val()) {
        $('#message').html('Matching').css('color', 'green');
    } else
        $('#message').html('Not Matching').css('color', 'red');
}



function login() {
    var femail = document.getElementById('femail').value;
    var fpw = document.getElementById('fpw').value;
    var Data = new registerreq({
        password: fpw,
        email: femail
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/register");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(JSON.stringify(Data));

    xhr.send(JSON.stringify(Data));

    xhr.onreadystatechange = function () {
        if (xhr.status !== 200) {
            document.getElementById("msg").innerHTML = "login failed";
        }
        if (xhr.readyState === 4 && xhr.status === 200) {
            var cus = JSON.parse(xhr.responseText);
            console.log(JSON.stringify(cus));
            customerId = cus.customerId;
        }
    };
}

function placeorder() {
    if (customerId.length === 0) {
        document.getElementById("msg").innerHTML = "must login";
    }
    var pdate = document.getElementById('partydate').value;
    var psize = document.getElementById('psize').value;
    var ptype = document.getElementById("ftype").value;
    var pcon = document.getElementById("pcon").value;

    var Data = new orderreq({
        partyDate: new Date(pdate),
        contactName: pcon,
        partySize: psize,
        partyType: ptype
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/data/save/" + customerId + "/order");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(JSON.stringify(Data));

    xhr.send(JSON.stringify(Data));
}


