//html elementlerini tek bir class içerisinde topladık
export const elements = {
   list: document.querySelector('.list'),
   audio: document.querySelector('audio'),
   playingInfo: document.querySelector('.playing .info'),
   audioSource: document.querySelector('audio source'),
   form : document.querySelector('form'),
   title : document.querySelector('.songs h2'),
   
}


//her bir müzik için ekrana bir kart basar.
export const renderSongs = (songs) =>{
   
    //eskiden eklenenleri temizleme form filtrleme için gerekli
    elements.list.innerHTML ='';
    
    songs.forEach(song=>{
       
        //div oluşturma
        const div =  document.createElement('div');
        //class verme
        div.className ='card';
        
        //kart elemanına bazı verileri ekleme
        div.dataset.url = song.hub?.actions?.pop()?.uri;
        div.dataset.title = song.title 
        div.dataset.img = song.images.coverart;
        
        
        
        //içeriği belirleme
        div.innerHTML= `
        <figure>
        <img src="${song.images.coverart}"
        
        >
        <div class="play">
            <i id="play-btn" class="bi bi-play-fill"></i>
         </div>
        </figure>

    <h4>${song.subtitle}</h4>
    <p> ${song.title}</p>
        `;
        //html e gönderme
        elements.list.appendChild(div);

    })
}

//oynayan şarkının bilgilerini ekrana basar
export const renderPlayingInfo = (song) =>{
elements.playingInfo.innerHTML=`
<img src="${song.img}">
            <div>
                <p>Şuan Oynatılıyor...</p>
                <h3>${song.title}</h3>
            </div>`
}

//başlık metnini günceller
export const updateTitle = (message)=>{
 elements.title.innerText = message;
}