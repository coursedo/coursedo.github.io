import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDuWf_0QhybMvAqQTPcBA3YoEiwWtqbLLU',
  authDomain: 'coursedo-f3365.firebaseapp.com',
  projectId: 'coursedo-f3365',
  storageBucket: 'coursedo-f3365.appspot.com',
  messagingSenderId: '796599806619',
  appId: '1:796599806619:web:305598416c94d70e31b43e',
  measurementId: 'G-85NDZ9JHMP'
}

const CoursedoFirebase = !firebase.apps?.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

export default CoursedoFirebase
