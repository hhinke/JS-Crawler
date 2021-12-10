const cheerio = require('cheerio');

const parseLinks = async (myURL, html_data) => {
  let links = [];

  const urlObj = new URL(myURL);
  
  const parser = cheerio.load(html_data);
  parser('a').each((i, link) => {
    try {      
      const href = link.attribs.href;
      const hrefURL = new URL(href);
      if(hrefURL.hostname === urlObj.hostname) {
        if(!links.includes(href)) {
          links.push(href);
        }          
      }
    } catch(err) {
      // ignore bad URLs
    }      
  });    
  
  return links;
}

module.exports = { parseLinks };