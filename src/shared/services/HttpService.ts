import * as _firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const config = {
    apiKey: "AIzaSyDNYyD0GHzDhygjezHGr1fgd73mGl2smY0",
    authDomain: "yoahorro-dc6e2.firebaseapp.com",
    databaseURL: "https://yoahorro-dc6e2.firebaseio.com",
    projectId: "yoahorro-dc6e2",
    storageBucket: "yoahorro-dc6e2.appspot.com",
    messagingSenderId: "247816612013"
};

const collections = {
    users: 'users',
    predefined_expenses: 'predefined_expenses',
    diary_expenses: 'diary_expenses',
    transactions: 'transactions'
}

export const firebaseApp = _firebase.initializeApp(config);


class HttpService {

    uid: string;
    db: _firebase.firestore.Firestore

    constructor() {
        this.db = firebaseApp.firestore();
        this.db.settings({timestampsInSnapshots: true})
    }

    validUid () {
        if (!this.uid) {
            throw('You are not logged In')
        } 
    }

    predefinedCollection () {
        this.validUid();

        return this.db
            .collection(collections.users)
            .doc(this.uid)
            .collection(collections.predefined_expenses);
    }

    diaryCollection () {
        this.validUid();
        return this.db
            .collection(collections.users)
            .doc(this.uid)
            .collection(collections.diary_expenses);
    }

    transactionCollection () {
        this.validUid();

        return this.db
            .collection(collections.users)
            .doc(this.uid)
            .collection(collections.transactions);
    }
    
    savePredefinedExpense (payload: any) {
        return this.predefinedCollection().add({...payload})
    }

    updatePredefinedExpense(payload: any) {
        return this.predefinedCollection().doc(payload.id).update({...payload})
    }

    removePredefinedExpense (payload: any) {
        return this.predefinedCollection().doc(payload.id).delete();
    }

    async getPredefinedExpenses () {
        const querySnapshot: _firebase.firestore.QuerySnapshot = await this.predefinedCollection().get();

        const data = {};
        querySnapshot.forEach( doc => {
            data[doc.id] = { ...doc.data(), id: doc.id }
        });

        return data;
    }

    saveDiaryExpense (payload: any) {
        return this.diaryCollection().add({...payload})
    }

    updateDiaryExpense(payload: any) {
        return this.diaryCollection().doc(payload.id).update({...payload})
    }

    removeDiaryExpense (payload: any) {
        return this.diaryCollection().doc(payload.id).delete();
    }

    async getDiaryExpense () {
        const querySnapshot: _firebase.firestore.QuerySnapshot = await this.diaryCollection().get();
        const data = {};
        querySnapshot.forEach( doc => {
            data[doc.id] = { ...doc.data(), id: doc.id }
        });

        return data;
    }


    async getTransactions() {
        const querySnapshot: _firebase.firestore.QuerySnapshot = await this.transactionCollection().get();
        
        const data = {};
        querySnapshot.forEach( doc => {
            data[doc.id] = { ...doc.data(), id: doc.id }
        });

        return data;
    }

    updateTransactions(payload: any) {
        return this.diaryCollection().doc(payload.id).update({...payload})
    }

    removeTransactions (payload: any) {
        return this.diaryCollection().doc(payload.id).delete();
    }


    saveTransaction (payload: any) {
        const currentTime = new Date().getTime();
        return this.transactionCollection().add({...payload, updatedAt: currentTime , createdAt: currentTime})
    }
    isUserAuth () {
        return new Promise((resolve, reject) => {
            const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
                if (user) {
                    const userApp = {
                        uid: user.uid,
                        email: user.email,
                        errorMessage: null
                    }
                    resolve(userApp);
                    this.uid = user.uid;
                    return;
                }
                unsubscribe();
                resolve(user);
                return;
            }, (error) => { reject(error) });
        })
    }
    
    async login (email, password) {
        await firebaseApp.auth().setPersistence(_firebase.auth.Auth.Persistence.LOCAL)
        const response = await firebaseApp.auth().signInWithEmailAndPassword(email, password);
        return {
            uid: response.user.uid,
            email: response.user.email,
            errorMessage: null
        }
    }

    async logout () {
        await firebaseApp.auth().signOut();
        return null
    }

    async getFamily () {
        const docRef = await this.db.collection(collections.users).doc(this.uid).get();
        console.log('family: ', docRef.data());

    }

}

export default new HttpService();