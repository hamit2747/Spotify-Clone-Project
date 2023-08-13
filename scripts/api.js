import { renderSongs } from "./ui.js";
//yapılan istekler için yapılan ayarlar api den hazır aldık
const url = 'https://shazam.p.rapidapi.com/charts/track?locale=tr-TR&listId=ip-country-chart-TR';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '497855c50fmsh44479569907d583p192a64jsn4288875e3c0c',
		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
	}
};

export class API{
    constructor()  {
        this.songs = []
    }

    //popüler müzikleri getirir
    async getPopular(){
       const res = await fetch(url,options);
       const data = await res.json();

      this.songs = data.tracks
      //ekrana popüler müzikleri basma
      renderSongs(this.songs)
      document.dispatchEvent(new Event('loadComplete')); // loadComplete olayını tetikle
    }

//arama metodu
async searchMusic(query){
    const res = await fetch(`https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR`,
    options)

    const data = await res.json();
 
    //boş bir obje oluşturup içine song.track in bütün bilgilerini aktarma (...sound.track)
    const newData = data.tracks.hits.map((song)=>({...song.track}))  
    //({})return et objenin içine aktar anlamına gelir

    //this.songs un içine newdata yı aktar
this.songs = newData


//aratılan şarkıları ekrana basma
//renderSongs un içine de this.songs u aktar yani ui js de şarkıları ekrana bastığımız fonksiyounun içine gönderip ekrana bas
renderSongs(this.songs)
document.dispatchEvent(new Event('loadComplete')); // loadComplete olayını tetikle

 }

}

// API isteği başlamadan önce loading alanını göster
document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.display = 'block'; // Loading alanını görünür yap
});

// API isteği tamamlandığında loading alanını gizle
document.addEventListener('loadComplete', () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.display = 'none'; // Loading alanını gizle
});

