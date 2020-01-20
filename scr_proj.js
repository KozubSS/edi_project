function dane()
{
    let div = document.getElementById('tabele');

    var req = new XMLHttpRequest();
    let post1, post2;

   // Tabela 1
    req.open('GET', 'http://api.nbp.pl/api/exchangerates/tables/A', false); 
    req.send();

    if (req.status == 200 || req.readyStatus == 4){
        post1 = JSON.parse(req.responseText);
    }else{ 
        alert("Nie udało się nawiązać połączenia");
    } 
        
    console.log(post1[0]['rates'])

    var tablica_danych = new Array();
    for(x=0;x<post1[0]['rates'].length;x++){
        let tablica_pomocnicza = new Array()
        tablica_pomocnicza.push(post1[0]['rates'][x]['Currency'])
        tablica_pomocnicza.push(post1[0]['rates'][x]['Mid'])
        tablica_danych.push(tablica_pomocnicza)
    }
    // Tabela 2
    req.open('GET', 'https://randomuser.me/api/?results=50&inc=dob,gender,nat', false); 
    req.send();

    if (req.status == 200 || req.readyStatus == 4){ 
        post2 = JSON.parse(req.responseText);
    }else{ 
        alert("Nie udało się nawiązać połączenia");
    }
    //var tablica_random = new Array();
    //for(x=0;x<post2[1]['results'].length;x++){
     //   let tablica_pomoc = new Array()
     //   tablica_pomoc.push(post2[1]['results'][x]['gender'])
     //   tablica_pomoc.push(post2[1]['results'][x]['nat'])
     //   tablica_random.push(tablica_pomoc)
    //}
    div.innerHTML = '<p>' + post1 + '</p>'  + '<p>' + post2 + '</p>' ;
    
    
}