import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('Headlines');
        this.xx = '<h3>Damn!</h3>';
        this.headline = 'Error: Headline not found!';
        this.stories = [];
    }

    disRes(msg) {
        this.xx = msg;
        // console.log(this.xx);
        return `<div class="hello">${msg}</div>`
    }

    // async getHtml() {
    // // getHtml() {

    //     let fetchURL = 'http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics/blog/2014/feb/17/alex-salmond-speech-first-minister-scottish-independence-eu-currency-live?show-fields=body'
    //     // let fetchURL = 'https://api.agify.io/?name=morne'
    //     let x = "";
    //     fetch(fetchURL)
    //       .then(res => res.json())
    //       .then(data => {
    //         this.disRes(data);
    //         x = data;
    //       })
    //       setTimeout(()=>{

    //           console.log(x)
    //           return '<h1>Hello</h1>';
    //       }, 500)
    // };

    // https://content.guardianapis.com/search?q=debate&tag=politics/politics&from-date=2014-01-01

    async getHtml_old() {
        // return fetch('http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics/blog/2014/feb/17/alex-salmond-speech-first-minister-scottish-independence-eu-currency-live?show-fields=body').then(res => res.json())
        // return fetch('http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search').then(res => res.json())
        return fetch('http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=https://www.theguardian.com/world/2021/feb/21/rabbis-warn-over-purim-celebrations-covid-risk')
        .then(res => res.json())
        .then(data => {console.log(data);return data.sentences[0]})
        .then(data => {return `<h2>${data}</h2>`})
        .then(data => {this.xx = this.disRes(data);return this.xx})
    };

    async getAylien(url) {
        return fetch(`http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=${url}`)
                                        .then(res => res.json())
                                        .then(data => {console.log(data);return data.sentences[0]})
                                        .then(data => {console.log(data); return data})
    }

    async getHtml() {
        // return fetch('http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics/blog/2014/feb/17/alex-salmond-speech-first-minister-scottish-independence-eu-currency-live?show-fields=body').then(res => res.json())
        return fetch('http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search')
        .then(res => res.json())
        .then(data => {return data.response.results})
        .then(stories => {
            stories.forEach(story => {
                this.stories.push(
                    {headLine: story.webTitle,
                        webUrl: story.webUrl,
                        storySummary: this.getAylien(story.webUrl).then(data => {return data}) 
                    }
                );
            });
            return this.stories})
        .then(data => {
            console.log(data);
            let htmlData = '';
            data.forEach(story => {
                console.log(getPromiseDetails(story.storySummary)[1])
                htmlData = htmlData + `<h3>${story.headLine}</h3><p>${story.storySummary}</p><p>${story.webUrl}</p>`
            })
            return htmlData;
        })
        .then(data => {this.xx = this.disRes(data);return this.xx})
    };
};

// http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=http://worrydream.com/MediaForThinkingTheUnthinkable/note.html
// https://www.theguardian.com/world/2021/feb/21/rabbis-warn-over-purim-celebrations-covid-risk