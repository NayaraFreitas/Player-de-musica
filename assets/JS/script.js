let musicas = [
    {título:'Ice & Fire', artista:'King Canyon', src:'music/Ice & Fire - King Canyon.mp3', img:'img/R&B.jpg'},
    {título:'Indecision', artista:'Dyalla', src:'music/Indecision - Dyalla.mp3', img:'img/dance.jpg'},
    {título:'Soulicious', artista:'Dyalla', src:'music/Soulicious - Dyalla.mp3', img:'img/hiphop.jpg'}
];

let musica = document.querySelector('audio');

let imagem = document.querySelector('img')
let nomeMusica = document.querySelector('.descriçao h2');
let nomeArtista = document.querySelector('.descriçao i')

let indexMusica = 0;

renderizarMusica(indexMusica);

//Eventos 
document.querySelector('.play').addEventListener('click', tocarMuscia);
document.querySelector('.pause').addEventListener('click', pausarMusica);
musica.addEventListener('timeupdate', atualizarBarra)

document.querySelector('.anterior').addEventListener('click', () =>{
    indexMusica--;
    if(indexMusica < 0){
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.proxima').addEventListener('click', () =>{
    indexMusica++;
    if(indexMusica > 2){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});

//funções

// função para mostra a duração da musica
musica.addEventListener('loadeddata', duration);
function duration(){
    const duracaoMusica = document.querySelector('.fim');

    duracaoMusica.textContent = segundoParaMinutos(Math.floor(musica.duration));
}


// função para mudar de play para pause
function tocarMuscia() {
    musica.play();
    document.querySelector('.pause').style.display = 'block';
    document.querySelector('.play').style.display = 'none';
}

// função para mudar pause para play
function pausarMusica() {
    musica.pause();
    document.querySelector('.pause').style.display = 'none';
    document.querySelector('.play').style.display = 'block';
}

//função para a a barra progress encher junto com a musica
function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundoParaMinutos(Math.floor(musica.currentTime));
}

// mostra o andamento da musica com minutos e segundos
function segundoParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos
    }

    return campoMinutos + ':' + campoSegundos;
}

//Função pra a mudar a musica
function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].título;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;

        duration()
    });
}