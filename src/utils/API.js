import axios from "axios";

export default {
  bpmResults: function () {
    return axios.get(
      "https://api.getsongbpm.com/tempo/?api_key=a2ac4e9276908567b494bc67129c5ccd&bpm=135"
    );
  },
  musicVideo: function () {
    return axios.get("http://imvdb.com/api/v1/search/videos", {
      headers: {
        'IMVDB-APP-KEY':  'gKLRKM6um3XrLKXjtOhOeVBpQRf4cCNYcMaP4hBB' 
      },
    });
  },
};
