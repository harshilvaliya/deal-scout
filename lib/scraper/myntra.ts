"use server";

import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeMyntraProduct(url: string) {
  // if (!url) return;
  // const username = String(process.env.BRIGHT_DATA_USERNAME);
  // const password = String(process.env.BRIGHT_DATA_PASSWORD);
  // const port = 22225;
  // const session_id = (1000000 * Math.random()) | 0;
  // const options = {
  //   auth: {
  //     username: `${username}-session-${session_id}`,
  //     password,
  //   },
  //   host: "brd.superproxy.io",
  //   port,
  //   rejectUnauthorized: false,
  // };

  try{
    const response = await axios.get(url);
    const text = await response.data();
    console.log(text);
  }
  catch{
    console.log("Error");
  }
}
