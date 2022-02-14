const axios = require('axios');
const res = require('express/lib/response');

exports.buscarPlaylist = async(temperatura)=>{
    let genero = 'festa'

    //Identificando gênero de acordo com a temperatura
    if (temperatura > 30) {
        genero = 'festa'
    } else if(temperatura <=30 && temperatura >15){
        genero = 'pop'
    }else if(temperatura <15 && temperatura >10){
        genero = 'rock'
    }else if(temperatura <=10){
        genero = 'classica'
    }


    const client_id = 'd1a64823ae65461d86758afa1c136d0f';
    const client_secret = 'd3ff1ad57b7c42ce9cd7b8a2718e6830';
    const tokenConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: client_id,
            password: client_secret,
        }
    }
    //Obtendo Token de acesso
    const {data} = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials',tokenConfig)
    const token = data.access_token


    const generoConfig = {
        method: 'get',
        url: `https://api.spotify.com/v1/search?q=${genero}&type=playlist&include_external=audio`,
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    };
    //Buscando playlist do gênero escolhido 
    const playlists = await axios(generoConfig)


    const playlistAleatoria = Math.floor(Math.random() * (playlists.data.playlists.items.length - 1));

    var playlistConfig = {
        method: 'get',
        url: `https://api.spotify.com/v1/playlists/${playlists.data.playlists.items[playlistAleatoria].id}/tracks?market=BR`,
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    };

    //Buscando músicas da playlist
    const tracks =  await axios(playlistConfig)

    
    const musicas =  tracks.data.items.map(item=>{return item.track.name})
    
    return{status:'OK',genero:genero,musicas:musicas}
}


exports.buscarPorCidade = async (req,res)=>{
    const cidade = req.params.cidade
    //Buscando coordenadas por cidade
    const coordenadas = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cidade},BR&limit=1&appid=b77e07f479efe92156376a8b07640ced`)

    if (coordenadas.data.length >0) {
        const lat = coordenadas.data[0].lat
        const lon = coordenadas.data[0].lon
        
        req.params={lat:lat,lon:lon}
        this.buscarPorCoordenadas(req,res)        
    } else {
        res.send({status:'NOK',message:'Cidade não encontrada.'})
    }

}

exports.buscarPorCoordenadas = async (req,res)=>{
    
    let lat = req.params.lat
    let lon = req.params.lon
    //Buscando Temperatura por coordenadas
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b77e07f479efe92156376a8b07640ced&units=metric`)
    .then(resultado =>{

        this.buscarPlaylist(resultado.data.main.temp).then(result=>{
            res.status(200).send(result)
        })
    
    }).catch(err=>{
        console.log(err);
        res.send({status:'NOK',message:'Latitude e/ou Longitude incorretas.'})
    })
   
}