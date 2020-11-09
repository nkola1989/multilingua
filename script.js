window.addEventListener('load', function(){
  
  // fare fetch di default
  getTrans('/language/en/en.json')
  .then(function(language){
    // questo è il mio json di defaul
    console.log('lingua originale di default:');
    console.log(language);

    // fetch della lingua del browser
    var userLang = navigator.language || navigator.userLanguage; 
    //rendo tutto in minuscolo
    userLang.toLocaleLowerCase();
    //verifico che non sia più grande di 2 caratteri
    if(userLang.length>2){
        //se è più grande lo taglio
        userLang=userLang.slice(0,2);   
    }

    //carico la lingua del browser
    getTrans('/language/'+userLang+'/'+userLang+'.json')
        .then(function(language){
            console.log('lingua del browser:');
            console.log(language.translations.greating);
              // una volta che la lingua è caricata la stampo
            document.getElementById('lbl_language').innerHTML=userLang;
            //all'evento della scelta stampo la lingua selezionata
            document.getElementById('btn_select').addEventListener('click', function(evt){
                //gestisco il refrash del form    
                evt.preventDefault();
                //ottengo la lingua selezionata
                var chooseLanguage= document.getElementById("select_language").value.toLocaleLowerCase(); 
                    console.log(chooseLanguage)
         
                    getTrans('/language/'+chooseLanguage+'/'+chooseLanguage+'.json')
                        .then(function(language){
                            document.getElementById('alert').innerHTML= 
                            `<div class="alert alert-info" role="alert">
                             ${language.language}: <a href="#" class="alert-link"> ${language.translations.greating}</a>.
                           </div>`;
                     });
                 
            });
        })

  });//fine fetch per la lingua di default
});// fine evento load

//cerco la traduzione
function getTrans(language_path){
    return fetch(language_path)
    .then(function(res){
        return res.json(); 
    })
    .then(function(res){
        //console.log(res);
        return res;
    })
    .catch(function(err){
        console.error(err);
        return []
    });
}