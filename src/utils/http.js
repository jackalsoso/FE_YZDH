import axios from 'axios';
axios.defaults.timeout = 15000;


//请求方式
export default {
  get: (url, params = {}) => {
    return new Promise((resolve, reject) => {
      axios.get(url, {params}).then(res => {
        let data = res.data;
        resolve(data);
      }).catch(err => {
        reject(err);
      })
    });
  },
  post: (url, params = {}) => {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        let data = res.data;
        resolve(data);
      }).catch(err => {
        reject(err);
      })
    });
  },
}
