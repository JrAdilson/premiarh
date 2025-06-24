import { api } from 'boot/axios';

export default function useApi(url) {
    const get = async () => {
        const data = await api.get(url)
          .then(({ data }) => data)
          .catch(({ response }) => {
            throw new Error(handleMessage(response));
          });

        return data;
    }
  
    const post = async (params) => {
      const data = await api.post(url, params)
        .then(({ data }) => data)
        .catch(({ response }) => {
          throw new Error(handleMessage(response));
        });

        return data;
    }

    const put = async (params) => {
      const data = await api.put(`${url}/${params.id}`, params)
        .then(({ data }) => data)
        .catch(({ response }) => {
          throw new Error(handleMessage(response));
        });

        return data;
    }

    const patch = async (params) => {
      const data = await api.patch(`${url}/${params.id}`, params)
        .then(({ data }) => data)
        .catch(({ response }) => {
          throw new Error(handleMessage(response));
        });

        return data;
    }

    const remove = async (id) => {
      const data = await api.delete(`${url}/${id}`)
        .then(({ data }) => data)
        .catch(({ response }) => {
          throw new Error(handleMessage(response));
        });

        return data;
    }

    const getById = async (id) => {
      const data = await api.get(`${url}/${id}`)
        .then(({ data }) => data)
        .catch(({ response }) => {
          throw new Error(handleMessage(response));
        });
      return data;
    }

    const handleMessage = (response) => {
      let msg = response.data.message;
      Array.isArray(response.data.error) && (msg += ': ' + response.data.error.join('; '));
      return msg;
    }

    return { get, getById, patch, post, put, remove }
};