import http from '../../utils/http'
import BASEURL from '@/config/index'

export default {
  get_expense(params) {
    return http.post(`${BASEURL}/api.php/v2.vehicle/tips`,params);
  },

}