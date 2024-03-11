"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('ciao da home.ts');
const url = 'https://spotify81.p.rapidapi.com/albums?ids=3IBcauSj5M2A6lTeffJzdv';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5eba36709fmsh46db4e8e33040c1p10a999jsnc724d1df5f73',
        'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
    }
};
const fetchCall = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, options);
        const data = yield response.json();
        const tracks = data.albums[0].tracks.items;
        for (let track of tracks) {
            console.log(track.name);
        }
    });
};
fetchCall();
