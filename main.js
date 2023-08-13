import { API } from "./scripts/api.js";
import { elements,renderPlayingInfo, updateTitle } from "./scripts/ui.js";

//direk kullanamıyoruz örneğini oluşturmak lazım
const api = new API()

//sayfa yüklendiği anda api ye istek atıp popüler müzikleri listeler
document.addEventListener('DOMContentLoaded',async()=> await api.getPopular())

const playMusic = (url)=> {
elements.audioSource.src = url
//audio elementinin müziği eklemesini sağladık(netten baktık)
elements.audio.load();
//müziği oynatır (netten baktık)
elements.audio.play();
}

//listede tıklamalarda çalışır
const handleClick = (e) =>{
    

    if(e.target.id === 'play-btn'){
        //kapsayıcı kart elemanına erişme
       // e.target.parentElement.parentElement.parentElement bunu da yazabiliriz aşağıdaki gibi de yazabilriz
       const parent = e.target.closest('.card') //console.log(parent.dataset) ile kontrol et
       
       //çalınacak müziğin bilgilerini ekrana basar
       renderPlayingInfo(parent.dataset)
       
       //müziği çalar
       playMusic(parent.dataset.url)





    }
}

//liste alannındaki tıklamaları izle
document.addEventListener('click',handleClick)


//fotoğrafı döndürür
const animatePhoto = (e)=>{
const img = document.querySelector('.info img');
img.className = 'animate';
}

const stopAnimation = (e)=>{
    const img = document.querySelector('.info img');
    img.classList.remove('animate') ;
    }
    

//müziğin çalma olayını izleme
elements.audio.addEventListener('play',animatePhoto)
elements.audio.addEventListener('pause',stopAnimation)


//form olaylarını izleme
elements.form.addEventListener('submit',(e)=>{
    e.preventDefault();
    //console.dir(e.target[0].value) console da fromun içinde yazılan value değerini  bul 
    
  
  
    const query = e.target[0].value
    //aratılan kelime eşleşmiyorsa hiçbirşey yapma dön
  if(!query) return;

  //başlığı güncelle
  updateTitle(`${query} İçin Sonuçlar`);

  // ama aratılan kelimeyle eşleşiyorsa müzikleri api den çek
  api.searchMusic(query)
  document.dispatchEvent(new Event('loadComplete'));

})