import firebase from 'firebase/compat/app'
import 'firebase/analytics'
import { firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();

