import axios from "axios";

class Api {
  async getCategory() {
    const result = await axios({
      method: "get",
      url: " https://problem.comento.kr/api/category",
      headers:{header:"Accept:application/json"} ,
    });
    return result.data.category;
  }

  async getFeeds(category_arr, count) {
    const result = await axios({
      method: "get",
      url: "https://problem.comento.kr/api/list",
      header: "Accept:application/json",
      params: {
        page: 10,
        ord: "asc",
        category: category_arr,
        limit: count,
      },
    });
    return result.data;
  }

  async getAds() {
    const result = await axios({
      method: "get",
      url: "https://problem.comento.kr/api/ads",
      header: "Accept:application/json",
      params:{
        page:1,
        limit:5
      }
    });
    return result;
  }
}

export default Api;
