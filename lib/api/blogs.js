import BaseAPI from './BaseAPI'

class BlogApi extends BaseAPI {

    constructor(accessToken) {
        super(accessToken, '/blogs')
    }
}

export default BlogApi