import useApi from 'src/composables/UseApi';

export default function employeesService() {
    const { get, patch, post, put, remove } = useApi('employees');
    return { get, patch, post, put, remove }
}