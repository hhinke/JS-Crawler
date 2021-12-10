const { parseLinks } = require('./LinkParser.js');
const axios = require('axios');

const myUrl = "https://www.linkedin.com";

const crawlUrl = async (url) => {
  const linksToVisit = new Set([url]);
  const visitedLinks = new Set();
  
  for(var link of linksToVisit) {  
    if(visitedLinks.has(link)) {
      continue;
    }  
    visitedLinks.add(link);    
    try {
      console.log(link);
      const { data } = await axios.get(link);
      const newLinks = await parseLinks(link, data);      
      newLinks.filter(linkItem => !visitedLinks.has(linkItem))
                    .forEach(linkItem => linksToVisit.add(linkItem));
  
      linksToVisit.delete(link);
    } catch (err) {
      console.log("Error: " + err);
    }    
  }

  //visitedLinks.forEach(item => console.log(item));
}

(async (url) => {
  await crawlUrl(url);
})(myUrl);

module.exports = crawlUrl;
