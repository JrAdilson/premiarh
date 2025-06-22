export default function validateParticipant(participant) {
    if (!participant) {
        return false;
    }
    
    if (!participant.name) {
        return false;
    }

    if (!isValidCpf(participant.cpf)) {
        return false;
    }

    if (!isValidEmail(participant.email)) {
        return false;
    }
    
    return true;
}

const isValidEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

const isValidCpf = (cpf) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
}