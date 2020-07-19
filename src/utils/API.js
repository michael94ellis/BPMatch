import axios from "axios";

export default {
  bpmLookup: function (query) {
    return axios.get(
      `https://api.getsongbpm.com/search/?api_key=a2ac4e9276908567b494bc67129c5ccd&type=song&lookup=${query}`
    );
  },
  bpmResults: function (id) {
    return axios.get(
      `https://api.getsongbpm.com/song/?api_key=a2ac4e9276908567b494bc67129c5ccd&id=${id}`
    );
  },
  musicVideoSearch: function (query) {
    return axios({
      method: "GET",
      url: `https://imvdb.com/api/v1/search/videos?q=${query}`,
      headers: {
        "IMVDB-APP-KEY": "gKLRKM6um3XrLKXjtOhOeVBpQRf4cCNYcMaP4hBB",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, DELETE, PUT, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      },
    });
  },
  musicVideoSource: function (id) {
    return axios.get(`https://imvdb.com/api/v1/video/${id}?include=sources`, {
      headers: { "IMVDB-APP-KEY": "gKLRKM6um3XrLKXjtOhOeVBpQRf4cCNYcMaP4hBB" },
    });
  },
};
