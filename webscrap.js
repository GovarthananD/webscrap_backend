const axios = require("axios");
const cheerio = require("cheerio");

// exports.getData = async (searchTerm) => {
//   const response = await (
//     await axios.get(`https://www.amazon.in/s?k=${searchTerm}`, {
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Linux; Android 5.1; AFTS Build/LMY47O) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/41.99900.2250.0242 Safari/537.36",
//       },
//     })
//   ).data;

//   let $ = cheerio.load(response);

//   let titleObj = $(
//     "h2 a.a-link-normal.a-text-normal",
//     'div["data-component-type="s-search-result"]'
//   );

//   let priceObj = $(
//     "span.a-price:nth-of-type(1) span.a-offscreen",
//     'div["data-component-type="s-search-result"]'
//   );
//   let data = [];

//   for (let i = 0; i < titleObj.length; i++) {
//     let productName = $(titleObj[i]).find("span")[0].children[0]["data"];
//     let price = $(priceObj[i]).text();
//     let imgUrl = $(
//       `img["alt=${`"${productName}"`}]`,
//       'div["data-component-type="s-search-result"]'
//     ).attr("src");
//     console.log(productName);
//     data.push({
//       productName: productName,
//       price: price,
//       imageUrl: imgUrl,
//     });
//   }
//   console.log(data);

//   return data;
// };

// exports.getData = async (searchTerm) => {
//   try {
//     console.log(searchTerm);
//     const response = await axios.get(
//       `https://www.amazon.in/s?k=${searchTerm}`,
//       {
//         headers: {
//           "User-Agent":
//             "Mozilla/5.0 (Linux; Android 5.1; AFTS Build/LMY47O) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/41.99900.2250.0242 Safari/537.36",
//         },
//       }
//     );
//     const $ = cheerio.load(response.data);

//     const products = [];

//     $('div[data-component-type="s-search-result"]').each((index, element) => {
//       console.log(element);
//       const productName = $(element)
//         .find("h2 a.a-link-normal.a-text-normal span")
//         .text();
//       const price = $(element)
//         .find("span.a-price:nth-of-type(1) span.a-offscreen")
//         .text();
//       const imgUrl = $(element).find("img[data-image-source]").attr("data-src");

//       if (productName && price && imgUrl) {
//         products.push({
//           productName: productName.trim(),
//           price: price.trim(),
//           imageUrl: imgUrl.trim(),
//         });
//       }
//     });

//     console.log(products);
//     return products;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return []; // Return an empty array in case of an error
//   }
// };

exports.getData = async (searchTerm) => {
  try {
    const response = await axios.get(
      `https://www.flipkart.com/search?q=${searchTerm}&page=1`
    );
    const html = response.data;
    const $ = cheerio.load(html);

    const products = [];

    $("._1AtVbE").each((index, element) => {
      const obj = {
        productName: $(element).find("._4rR01T").text().toLowerCase(),
        imageUrl: $(element).find("._396cs4").attr("src"),
        rating: $(element).find("._3LWZlK").text(),
        price: $(element).find("._3I9_wc").text(),
      };
      if (obj.productName && obj.imageUrl) {
        products.push(obj);
      }
    });

    console.log(products);
    return products;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array in case of an error
  }
};