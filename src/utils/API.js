import axios from "axios";

export default {
  bpmResults: function () {
    return axios.get(
      "https://api.getsongbpm.com/tempo/?api_key=a2ac4e9276908567b494bc67129c5ccd&bpm=135"
    );
  },
  musicVideoSearch: function (query) {
    return axios({method:'GET', url:`https://imvdb.com/api/v1/search/videos?q=${query}`, headers: {
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
  musicVideoSource: function(id){
    return axios.get(`https://imvdb.com/api/v1/video/${id}?include=sources`, {headers:{"IMVDB-APP-KEY": "gKLRKM6um3XrLKXjtOhOeVBpQRf4cCNYcMaP4hBB"}})
  }
};
