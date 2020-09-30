import axios from 'axios'

class AuthService {
    constructor(apiUrl) {
        this.API_URL = apiUrl
    }

    async login (username, password) {
        let response = await axios.post(`${this.API_URL}/api/v1/authentication/login`, {
            username: username,
            password: password
        }, { timeout: 4000 });

        if(response.status === 200)
        {
            return response.data;
        }

        throw new Error(response.status);
    }
}

class OpenNetworkStatus {
    constructor(type, apiUrl, token, timeout=4000) {
        this.TYPE = type
        this.API_URL = apiUrl
        this.API_TOKEN = token;
        this.API_TIMEOUT = timeout;
    }

    async getAll() {
        let response = await axios.get(`${this.API_URL}/api/v1/${this.TYPE}`, { 
            timeout: this.API_TIMEOUT,
            headers: {
                'Authorization': `Bearer ${this.API_TOKEN}`
            }
        });

        if(response.status === 200)
        {
            return response.data.items;
        }

        throw new Error(response.status);
    }

    async getById(id) {
        let response = await axios.get(`${this.API_URL}/api/v1/${this.TYPE}/${id}`, { 
            timeout: this.API_TIMEOUT,
            headers: {
                'Authorization': `Bearer ${this.API_TOKEN}`
            }
        });

        if(response.status === 200)
        {
            return response.data;
        }

        throw new Error(response.status);
    }

    async add(data) {
        let response = await axios.post(`${this.API_URL}/api/v1/${this.TYPE}`, data, { 
            timeout: this.API_TIMEOUT,
            headers: {
                'Authorization': `Bearer ${this.API_TOKEN}`
            }
        });

        if(response.status === 201)
        {
            return response.data;
        }

        throw new Error(response.status);
    }

    async update(data) {
        let response = await axios.put(`${this.API_URL}/api/v1/${this.TYPE}/${data.id}`, data, { 
            timeout: this.API_TIMEOUT,
            headers: {
                'Authorization': `Bearer ${this.API_TOKEN}`
            }
        });

        if(response.status === 200)
        {
            return response.data;
        }

        throw new Error(response.status);
    }

    async delete(id) {
        let response = await axios.delete(`${this.API_URL}/api/v1/${this.TYPE}/${id}`, { 
            timeout: this.API_TIMEOUT,
            headers: {
                'Authorization': `Bearer ${this.API_TOKEN}`
            }
        });

        if(response.status === 204)
        {
            return response.data;
        }

        throw new Error(response.status);
    }

    async updateComponentStatus(componentId, status) {
        let request = { id: componentId, status: status }
        let response = await axios.put(`${this.API_URL}/api/v1/components/${componentId}/status`, request, { 
            timeout: this.API_TIMEOUT,
            headers: {
                'Authorization': `Bearer ${this.API_TOKEN}`
            }
        });

        if(response.status === 200)
        {
            return response.data;
        }

        throw new Error(response.status);
    }
}


export {AuthService, OpenNetworkStatus}