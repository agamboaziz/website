

firebase.initializeApp(firebaseConfig);

const _auth = firebase.auth();

function showAlert(el, msg, type='danger') {
  el.classList.remove('d-none','alert-danger','alert-success','alert-warning','alert-info','alert-primary');
  el.classList.add('alert-' + type);
  el.textContent = msg;
}

function clearAlert(el) {
  el.classList.add('d-none');
  el.textContent='';
  el.classList.remove('alert-danger','alert-success','alert-warning','alert-info','alert-primary');
}

function signup() {
    const alertBox = document.getElementById("signup-alert");
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    clearAlert(alertBox);

    if (!email || !password) {
        return showAlert(alertBox, "Please enter email and password.", "warning");
    }

    if (!email.includes("@") || !email.includes(".")) {
        return showAlert(alertBox, "Invalid email format.", "warning");
    }

    if (password.length < 6) {
        return showAlert(alertBox, "Password must be at least 6 characters.", "warning");
    }

    _auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            showAlert(alertBox, "Account created successfully!", "success");
            console.log(userCredential.user.uid);

            setTimeout(() => {
                window.location.href = "../login.html";
            }, 800);
        })
        .catch((error) => {
            showAlert(alertBox, error.message, "danger");
        });
}


function login() {
    const alertBox = document.getElementById("signup-alert");
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    clearAlert(alertBox);

    if (!email || !password) {
    return showAlert(alertBox, "Please enter email and password.", "warning");
    }

    _auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
            showAlert(alertBox, "Account Logged in successfully!", "success");
            console.log(userCredential.user.uid);

            setTimeout(() => {
                window.location.href = "../control.html";
            }, 800);
        })
        .catch((error) => {
            showAlert(alertBox, error.message, "danger");
        });
}


// // אתחול Firebase עם ההגדרות שלך
// firebase.initializeApp(firebaseConfig);

// // יצירת אובייקט Authentication לשימוש בהתחברות והרשמה
// const _auth = firebase.auth();



// /***************************************************
//  * פונקציות עזר להצגת התראות (Alert)
//  ***************************************************/

// // פונקציה להצגת הודעה לאלמנט HTML
// // el = האלמנט להצגת ההודעה
// // msg = ההודעה עצמה
// // type = סוג ההודעה (danger, success, warning וכו')
// function showAlert(el, msg, type='danger') {

//   // מסירים את כל המחלקות הקודמות כדי לא להצטבר
//   el.classList.remove('d-none','alert-danger','alert-success','alert-warning','alert-info','alert-primary');

//   // מוסיפים את המחלקה המתאימה לסוג ההודעה
//   el.classList.add('alert-' + type);

//   // מציבים את הטקסט של ההודעה
//   el.textContent = msg;
// }

// // פונקציה לניקוי ההודעה מהאלמנט
// function clearAlert(el) {

//   // מוסיפים את המחלקה שמסתירה את האלמנט
//   el.classList.add('d-none');

//   // מנקים את הטקסט
//   el.textContent='';

//   // מסירים את כל מחלקות ההודעה הקודמות
//   el.classList.remove('alert-danger','alert-success','alert-warning','alert-info','alert-primary');
// }



// /***************************************************
//  * פונקציית הרשמה (Signup)
//  ***************************************************/
// function signup() {

//     // משתנה שמצביע על תיבת ההודעות בדף
//     const alertBox = document.getElementById("signup-alert");

//     // קבלת הערכים מהשדות בדף
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value;

//     // ניקוי הודעה קודמת אם קיימת
//     clearAlert(alertBox);

//     // בדיקה אם השדות ריקים
//     if (!email || !password) {
//         return showAlert(alertBox, "Please enter email and password.", "warning");
//     }

//     // בדיקה בסיסית של פורמט המייל
//     if (!email.includes("@") || !email.includes(".")) {
//         return showAlert(alertBox, "Invalid email format.", "warning");
//     }

//     // בדיקה אם הסיסמה מספיק ארוכה
//     if (password.length < 6) {
//         return showAlert(alertBox, "Password must be at least 6 characters.", "warning");
//     }

//     // יצירת משתמש חדש ב-Firebase עם האימייל והסיסמה
//     _auth.createUserWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // אם הצליח — מציג הודעת הצלחה
//             showAlert(alertBox, "Account created successfully!", "success");

//             // מדפיס את ה-UID של המשתמש בקונסול (לבדיקה)
//             console.log(userCredential.user.uid);

//             // אחרי 800ms — מפנה את המשתמש לדף ההתחברות
//             setTimeout(() => {
//                 window.location.href = "../login.html";
//             }, 800);
//         })
//         .catch((error) => {
//             // אם קרתה שגיאה — מציגים את ההודעה לאלמנט
//             showAlert(alertBox, error.message, "danger");
//         });
// }



// /***************************************************
//  * פונקציית התחברות (Login)
//  ***************************************************/
// function login() {

//     // משתנה שמצביע על תיבת ההודעות בדף
//     const alertBox = document.getElementById("signup-alert");

//     // קבלת הערכים מהשדות בדף
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value;

//     // ניקוי הודעה קודמת אם קיימת
//     clearAlert(alertBox);

//     // בדיקה אם השדות ריקים
//     if (!email || !password) {
//         return showAlert(alertBox, "Please enter email and password.", "warning");
//     }

//     // התחברות המשתמש ב-Firebase
//     _auth.signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {

//             // אם ההתחברות הצליחה — מציגים הודעת הצלחה
//             showAlert(alertBox, "Account Logged in successfully!", "success");

//             // מדפיס את ה-UID של המשתמש בקונסול
//             console.log(userCredential.user.uid);

//             // אחרי 800ms — מפנה את המשתמש לדף control.html
//             setTimeout(() => {
//                 window.location.href = "../control.html";
//             }, 800);
//         })
//         .catch((error) => {
//             // אם קרתה שגיאה — מציגים את ההודעה לאלמנט
//             showAlert(alertBox, error.message, "danger");
//         });
// }
