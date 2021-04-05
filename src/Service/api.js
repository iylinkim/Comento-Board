import axios from "axios";

class Api {
  async getCategory() {
    const result = await axios({
      method: "get",
      url: " https://problem.comento.kr/api/category",
      headers: { header: "Accept:application/json" },
    });
    return result.data.category;
  }

  async getFeeds(category_arr, count) {
    const result = await axios({
      method: "get",
      url: "https://problem.comento.kr/api/list",
      header: "Accept:application/json",
      params: {
        page: 1,
        ord: "asc",
        category: category_arr,
        limit: count,
      },
    });

    try {
      if (result.status === 200) {
        return result.data;
      }else{

        // const error = await res.json();
        //  throw error;
        console.log("try: "+result)
      }
    } catch (e) {
      console.log('error')
    }
  }

  async getAds() {
    const result = await axios({
      method: "get",
      url: "https://problem.comento.kr/api/ads",
      header: "Accept:application/json",
      params: {
        page: 1,
        limit: 30,
      },
    });
    return result.data.data;
  }

  async getDetail(feed_id) {
    const result = await axios({
      method: "get",
      url: "https://problem.comento.kr/api/view",
      header: "Accept:application/json",
      params: {
        id: feed_id,
      },
    });
    return result.data.data;
  }
}

export default Api;

// try {
//   const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
//   if (res.status === 200) {
//     return await res.json();
//   } else {
//     const error = await res.json();
//     throw error;
//   }
// } catch (e) {
//   throw {
//     message: e.message,
//   };
// }
