

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
