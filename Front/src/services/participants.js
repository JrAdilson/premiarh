import useApi from 'src/composables/UseApi';

export default function participantsService() {
    const { get, patch, post, put, remove } = useApi('participants');
    return { get, patch, post, put, remove }
}