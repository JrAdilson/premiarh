import { api } from 'boot/axios';

export default function useApi(url) {
    const get = async () => {
        const data = await api.get(url)
          .then(({ data }) => data)
          .catch(() => null);

        return data;
    }
  
    const post = async (params) => {
      const data = await api.post(url, params)
        .then(({ data }) => data)
        .catch(() => null);

        return data;
    }

    const put = async (params) => {
      const data = await api.put(`${url}/${params.id}`, params)
        .then(({ data }) => data)
        .catch(() => null);

        return data;
    }

    const patch = async (params) => {
      const data = await api.patch(`${url}/${params.id}`, params)
        .then(({ data }) => data)
        .catch(() => null);

        return data;
    }

    const remove = async (id) => {
      console.log(id);
      const data = await api.delete(`${url}/${id}`)
        .then(({ data }) => data)
        .catch(() => null);

        return data;
    }

    return { get, patch, post, put, remove }
};