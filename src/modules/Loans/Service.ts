import * as _firebase from 'firebase/app';
import { firebaseApp, database } from '../../shared/services/HttpService';

class LoanService {

    db: _firebase.firestore.Firestore
    uid = null;
    
    constructor(db) {
        this.db = db;
    }

    
    app () {

        // const uid = (firebaseApp.auth().currentUser || { uid: 0}).uid;
        const uid = 'h0jVDBFEapT1E3iDqIZGTPisxVD3';
        const appId = 'JL8hsq0s0iSmv6UBe3Nd';

        return this.db.collection('_users').doc(uid).collection('apps').doc(appId);
    }

    async getCurrentLoans () {
        const querySnapshot = await this.app().collection('current_loans').get();

        return querySnapshot.docs.map((doc) => {
            const loan = doc.data();

            return {
                ...loan,
                whom: loan.whom.toLowerCase(),
                id: doc.id,
            };
        });
    }

}


export default new LoanService(database);