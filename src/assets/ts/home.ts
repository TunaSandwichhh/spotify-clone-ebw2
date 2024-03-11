console.log('ciao da home.ts');

const url = 'https://spotify81.p.rapidapi.com/albums?ids=3IBcauSj5M2A6lTeffJzdv';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5eba36709fmsh46db4e8e33040c1p10a999jsnc724d1df5f73',
        'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
    }
};


const fetchCall = async function () {
    try {
        const response = await fetch(url, options)
        const data = await response.json()

        const tracks = data.albums[0].tracks.items

        for (let track of tracks) {
            console.log(track.name)
        }
    }
    catch (e) {
        console.log(e)
    }
}

fetchCall()