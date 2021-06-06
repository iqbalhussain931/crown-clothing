import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDm9QYv3IlAI5qms4CjcWEj4NdSldOO21c",
    authDomain: "crown-db-51dab.firebaseapp.com",
    projectId: "crown-db-51dab",
    storageBucket: "crown-db-51dab.appspot.com",
    messagingSenderId: "545669422850",
    appId: "1:545669422850:web:6cc51526f4202959c06c1b",
    measurementId: "G-D8NBC34R36"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const userSnapshot = await userRef.get();
    
    if(!userSnapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch(error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
    'prompt': 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;