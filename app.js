const firebaseConfig = {
  apiKey: "AIzaSyDMLdK2ax7ul7I3_nzzzgzzdv-RGUoRazo",
  authDomain: "agre-tech-ccf27.firebaseapp.com",
  projectId: "agre-tech-ccf27",
  storageBucket: "agre-tech-ccf27.firebasestorage.app",
  messagingSenderId: "811052594008",
  appId: "1:811052594008:web:517a7eba566d9f978deb2d"
};

app = firebase.initializeApp(firebaseConfig);//
auth = firebase.auth();
db = firebase.database ? firebase.database() : null;

_auth = auth;
_db = db;

window.requireAuth = function requireAuth() {
  _auth.onAuthStateChanged((user) => {
    const userBadge = document.getElementById("userBadge");
    if (user) {
      if (userBadge) userBadge.textContent = user.email || user.uid;
    } else {
      window.location.href = "index.html";
    }
  });
};

// // Sign out helper
// window.doSignOut = async function() {
//   try {
//     await _auth.signOut();
//     window.location.href = "index.html";
//   } catch (e) {
//     alert(e.message || e);
//   }
// };

// Convenience: read/write to RTDB
window.dbSet = (path, value) => _db.ref(path).set(value);
window.dbGet = (path) => _db.ref(path).get().then(s=>s.val());
window.dbOn  = (path, cb) => _db.ref(path).on('value', snap => cb(snap.val()));

var LIGHT = firebase.database().ref("/fromAltera/B");
LIGHT.on('value',reciveData);

function reciveData(snapshot) 
{ 
  document.getElementById("ldrValue").innerText=snapshot.val();
}



// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
    
    const precentbuttons = document.querySelectorAll('.btn-percent');

    precentbuttons.forEach(button => {
        button.addEventListener('click', (e) => {
            
            const val = Number(e.target.id);
            
            console.log("Sending value:", val);

            firebase.database().ref("toAltera").set(val)
                .catch(err => console.error("Error:", err));
        });
    });

});
