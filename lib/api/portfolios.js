import axios from 'axios'
import BaseAPI from './BaseAPI'

class PortfolioApi extends BaseAPI {

    constructor(accessToken) {
        super(accessToken, '/portfolios')
    }

    delete(id) {
        return axios.delete(`${this.apiUrl}/${id}`, this.config)
    }
}

export default PortfolioApi