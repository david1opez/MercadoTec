// TYPES
type ValidateUserProps = {
    email: string,
    password: string,
    contact: string,
    contactOption: string,
}

export default async function Validate (type: string, data: ValidateUserProps) {
    if (type == "user") return ValidateUser(data);
    else return 0;
}

const ValidateUser = ({email, password, contact, contactOption}: ValidateUserProps) => {
    if (email.length == 0 || password.length == 0) {
        return 1;
    }
    else if (!email.includes('@')) {
        return 2;
    }
    else if (!email.includes('.')) {
        return 2;
    }
    else if (email.length < 5) {
        return 2;
    }
    else if (password.length < 6) {
        return 3;
    }
    else if(contact.length == 0) {
        return 4;
    }
    else if(contactOption == 'Whatsapp' && contact.length != 12) {
        return 5;
    }
    else {
        return 0;
    }
}