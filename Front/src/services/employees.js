import useApi from 'src/composables/UseApi';

export default function employeesService() {
    const { get, getById, patch, post, put, remove } = useApi('employees');
    return { get, getById, patch, post, put, remove }
}