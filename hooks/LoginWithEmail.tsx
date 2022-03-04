import { Keyboard } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default async function LoginWithEmail (email: string, password: string): Promise<number | string | undefined> {
    const auth = getAuth();
    
    if(email.length === 0 || password.length === 0) return;
    
    Keyboard.dismiss();

    let success = await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        return 0;
    })
    .catch((error) => {
        if (error.message == "Firebase: Error (auth/user-not-found).") {
            return 8;
        }
        else if(error.message == "Firebase: Error (auth/invalid-email).") {
            return 2;
        }
        else if (error.message == "Firebase: Error (auth/wrong-password).") {
            return 9;
        }
        else if(error.message == "Firebase: Error (auth/network-request-failed).") {
            return 7;
        }
        else {
            return error.message
        }
    });

    return success;
}