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

    //console.log(post1[0]['rates'])


    let tablica_pomocnicza = ['Kurs']
    let tablica_nazw = ['x']


    for (x = 0; x < post1[0]['rates'].length; x++) {
 
        tablica_nazw.push(post1[0]['rates'][x]['currency'])
        tablica_pomocnicza.push(post1[0]['rates'][x]['mid'])

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
var narodowosci ={'ES':0,'BR':0,'CH':0,'FR':0,'FI':0,'DE':0,'CA':0,'NO':0,'IR':0,'NZ':0,'AU':0,'IE':0,'NO':0,'CH':0,'TR':0,'NL':0,'US':0, 'GB':0,'DK':0}
    randomUsers.forEach(user => {
        let tr = '<tr>';

        tr += '<td>' + user.gender + '</td> <td>' + user.dob.date + '</td> <td>' + user.dob.age + '</td> <td>' + user.nat + '</td> </tr>';

        usersDataHTML.innerHTML += tr;
        narodowosci[user.nat] += 1
    });
    var dane_narodowosci = new Array()
    for(key in narodowosci){
        dane_narodowosci.push([key,narodowosci[key]])
    }

bb.generate({
    bindto:"#chart2"
,data:{
    type:'pie',
    columns:dane_narodowosci
    }
})
bb.generate({
    bindto: "#chart1",
    data: {
        x: 'x',
        type: "bar",
        columns: [tablica_nazw, tablica_pomocnicza]
    },
    axis:{
        x:{
            type:'category',
            tick:{
                culling:false,
                rotate: 25,
                multiline:false
            }
        }
    }
    });
}
