
// const baseUrl = "https://newsapi.org/v2/everything";
// const apiKey = "7861a011e5a847d8bc5b6ad1570f56ed";
// const shortBy = "publishedAt";

// export default async function fetchNewsData() {
//   const currentDate = new Date();
//   const currentDate2 = new Date();
//   currentDate.setDate(currentDate.getDate() -10);
//   currentDate2.setDate(currentDate2.getDate() -1);
//   const dateFrom = currentDate.toISOString().split("T")[0];
//   const dateTo = currentDate2.toISOString().split("T")[0];

//   const url = `${baseUrl}?domains=techradar.com,theverge.com,engadget.com,wccftech.com&from=${dateFrom}&to=${dateTo}&sortBy=${shortBy}&apiKey=${apiKey}`;
//   // const url = './data.json';
//   const res = await fetch(url);
//   const data = await res.json();
//   return data

// }



import data from '../../../python/data.json';

export default async function fetchNewsData() {
  return data;
}


