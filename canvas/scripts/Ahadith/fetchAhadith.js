const apiUrl = 'https://hadithapi.com/api/hadiths?apiKey=$2y$10$ajqAfkGFvf72o6E8hMVejUtmZmQIBsEcGbFxAVJphUMm7ysE8kC&paginate=6307&book=sahih-bukhari';
fetch(apiUrl)
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.log(error);
})