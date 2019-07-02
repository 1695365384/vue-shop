import { http } from './http.js'


export default class Category {
    constructor(c) {
        this.cat_pid = c.cat_pid
        this.cat_name = c.cat_name
        this.cat_level = c.level
    }

    save () {
        return http.post(baseurl, this)
    }

    static findAll (type = 3) {
        return http.get(baseurl, {
            params: {
                type: type
            }
        })
    }

    findById (id) {
        return http.get(`${baseurl}/${id}`)
    }

    static updateById (id, category) {
        return http.put(`${baseurl}/${id}`, {
            params: {
                cat_name: category.cat_name
            }
        })
    }

    static deleteById (id) {
        return http.delete(`${baseurl}/${id}`)
    }
}