// const { autoSwitch } = require("./control");

/**
 * Shared Firebase init + helpers
 * Uses Firebase compat v11.0.2
 */
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



function servoswitch(){
  const sw = document.getElementById("servoswitcher");
  if (sw.checked){
    firebase.database().ref("servo").set(1);
  }else{
    firebase.database().ref("servo").set(0);
  }
}



// // אתחול Firebase עם הגדרות הפרויקט
// app = firebase.initializeApp(firebaseConfig);

// // יצירת אובייקט התחברות (Authentication)
// auth = firebase.auth();

// // יצירת אובייקט מסד נתונים (Realtime Database)
// // אם firebase.database קיים — נשתמש בו
// db = firebase.database ? firebase.database() : null;

// // יצירת משתנים מקומיים (לשימוש בקוד) שמצביעים לאותם אובייקטים
// // כי בהמשך הקוד השתמשת ב־_auth ו־_db
// _auth = auth;
// _db = db;



// /* -------------------------------------------------------------------
//    בדיקת התחברות — מוודא שרק משתמש מחובר יכול להיכנס לדפים פנימיים
// ------------------------------------------------------------------- */
// window.requireAuth = function requireAuth() {

//   // מאזין לשינוי סטטוס התחברות (התחבר/התנתק)
//   _auth.onAuthStateChanged((user) => {

//     // אלמנט שמראה מי המשתמש המחובר
//     const userBadge = document.getElementById("userBadge");

//     if (user) {
//       // אם המשתמש מחובר — נציג את המייל או את ה־UID
//       if (userBadge) userBadge.textContent = user.email || user.uid;
//     } else {
//       // אם אין משתמש מחובר — נשלח לדף הבית
//       window.location.href = "index.html";
//     }
//   });
// };



// /* -------------------------------------------------------------------
//    פונקציה להתנתקות מהחשבון
// ------------------------------------------------------------------- */
// window.doSignOut = async function() {
//   try {
//     // ביצוע התנתקות
//     await _auth.signOut();

//     // שליחה חזרה לדף הראשי
//     window.location.href = "index.html";
//   } catch (e) {
//     // במקרה של שגיאה — מציגים הודעה
//     alert(e.message || e);
//   }
// };



// /* -------------------------------------------------------------------
//    פונקציות עזר לעבודה עם מסד הנתונים
// ------------------------------------------------------------------- */

// // כתיבה למסד הנתונים (Set)
// window.dbSet = (path, value) => _db.ref(path).set(value);

// // קריאה חד־פעמית (Get)
// window.dbGet = (path) => _db.ref(path).get().then(s => s.val());

// // האזנה בזמן אמת לנתיב כלשהו
// window.dbOn  = (path, cb) => _db.ref(path).on('value', snap => cb(snap.val()));



// /* -------------------------------------------------------------------
//    קבלת נתוני חיישן LDR מה־ESP32 בזמן אמת
// ------------------------------------------------------------------- */

// // הפניה לנתיב במסד הנתונים שבו ה־ESP32 שולח את ערך החיישן
// var LIGHT = firebase.database().ref("/getting values from esp32/ldr2");

// // האזנה לערכים חדשים — בכל פעם שהחיישן משתנה, הפונקציה reciveData מופעלת
// LIGHT.on('value', reciveData);



// // פונקציה שמעדכנת את הערך על המסך בכל פעם שמתקבל נתון חדש מהחיישן
// function reciveData(snapshot) { 
//   // מציג את הערך בתוך האלמנט עם id="ldrValue"
//   document.getElementById("ldrValue").innerText = snapshot.val();
// }



// /* -------------------------------------------------------------------
//    שליטה על מצב AUTO/MANUAL מה־switch
// ------------------------------------------------------------------- */

// // פונקציה שמופעלת בכל פעם שהמשתמש מזיז את המתג (switch)
// function auto(){
  
//   // קבלת המתג עצמו מהדף
//   const sw = document.getElementById("autoSwitch");

//   // אם המתג דלוק (אוטומטי)
//   if (sw.checked){
//     // כתיבה למסד הנתונים — מצב אוטומטי
//     firebase.database().ref("/auto").set(1);
  
//   } else {
//     // כתיבה למסד הנתונים — מצב ידני
//     firebase.database().ref("/auto").set(0);
//   }
// }


