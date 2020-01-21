function dane() {
    var req = new XMLHttpRequest();
    let post1, post2;

    // Tabela 1
    req.open('GET', 'http://api.nbp.pl/api/exchangerates/tables/A', false);
    req.send();

    if (req.status == 200 || req.readyStatus == 4) {
        post1 = JSON.parse(req.responseText);
    } else {
        alert('Nie udało się nawiązać połączenia');
    }

    console.log(post1[0]['rates'])

    var tablica_danych = new Array();
    for (x = 0; x < post1[0]['rates'].length; x++) {
        let tablica_pomocnicza = new Array()
        tablica_pomocnicza.push(post1[0]['rates'][x]['Currency'])
        tablica_pomocnicza.push(post1[0]['rates'][x]['Mid'])
        tablica_danych.push(tablica_pomocnicza)
    }
    // Tabela 2
    req.open('GET', 'https://randomuser.me/api/?results=50&inc=dob,gender,nat', false);
    req.send();

    if (req.status == 200 || req.readyStatus == 4) {
        post2 = JSON.parse(req.responseText);
    } else {
        alert('Nie udało się nawiązać połączenia');
    }

    const exchangeRates = post1[0].rates;

    const exchangeRatesHTML = document.getElementById('exchangeRates');

    exchangeRates.forEach(rate => {
        let tr = '<tr>';

        tr += '<td>' + rate.currency + '</td> <td>' + rate.code + '</td> <td>' + rate.mid + '</td> </tr>';

        exchangeRatesHTML.innerHTML += tr;
    });

    const randomUsers = post2.results;

    const usersDataHTML = document.getElementById('usersData');

    randomUsers.forEach(user => {
        let tr = '<tr>';

        tr += '<td>' + user.gender + '</td> <td>' + user.dob.date + '</td> <td>' + user.dob.age + '</td> <td>' + user.nat + '</td> </tr>';

        usersDataHTML.innerHTML += tr;
    });
}