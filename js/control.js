// --- 1. הגדרות וחיבורים ל-HTML ---
const streamImg = document.getElementById('ipcam');      
const streamInput = document.getElementById('streamInput'); 
const saveBtn = document.getElementById('saveBtn');        
const autoSwitch = document.getElementById('autoSwitch');

var starCountRef = firebase.database().ref('/camIp');
starCountRef.on('value', (snapshot) => {
    const detect = snapshot.val();
    if (detect && streamImg) {
        streamImg.src = 'http://' + detect + ':81/stream';
        console.log("Camera Stream Updated:", detect);}
});
if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
        const url = streamInput.value.trim();
        localStorage.setItem('esp32camStreamUrl', url);
        if (url && 3) {
            streamImg.src = url;
        }
        try { 
            await firebase.database().ref('/settings/esp32camStreamUrl').set(url); 
            alert("הכתובת נשמרה!");
        } catch (e) { 
            console.warn("Error saving stream URL:", e); 
        }
    });
}

if (autoSwitch) {
    autoSwitch.addEventListener('change', async (e) => {
        try {
            await firebase.database().ref('/settings/autoMode').set(e.target.checked);
        } catch (e) {
            console.warn("Error setting auto mode:", e);
        }
    });
}



var LIGHT = firebase.database().ref("/fromAltera/B");
LIGHT.on('value', reciveData);

function reciveData(snapshot) { 
    const val = snapshot.val();
    const lightImg = document.getElementById("lightAmount");
    const lightText = document.getElementById("lightText");

    if (lightImg && lightText) {
        if(val > 100) {
            lightImg.src = "img/day.png"; 
            lightText.innerText = "it is day time";
        } else {
            lightImg.src = "img/night.png"; 
            lightText.innerText = "it is night time";
        }
    }
    console.log("LDR Value:", val);
}

function auto(){
  const sw= document.getElementById("autoSwitch");
  if (sw.checked){
    firebase.database().ref("/toAltera").set(193);
  }else{
    firebase.database().ref("/toAltera").set(192);
  }
}

function automatic(){
  const sw2= document.getElementById("autoMatic");
  if (sw2.checked){
    firebase.database().ref("/toAltera").set(144);
  }else{
    firebase.database().ref("/toAltera").set(128);
  }
}

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

// משתנים לשמירת המצב (מתחילים ב-0)
let bit4 = "0", bit1 = "0", bit0 = "0"; 
let speedBits = "00";

function updateCycles(num) {
    bit4 = (num & 4) ? "1" : "0"; 
    bit1 = (num & 2) ? "1" : "0"; 
    bit0 = (num & 1) ? "1" : "0"; 
}

function updateSpeed(bits) {
    speedBits = bits;
}

function sendToFirebase() {
    let bit76 = "10";
    let bit5  = "1";  

    let finalByteStr = bit76 + bit5 + bit4 + speedBits + bit1 + bit0;
    
    // המרה למספר עשרוני (בסיס 10)
    let decimalValue = parseInt(finalByteStr, 2);

    document.getElementById('bin-output').innerText = "הערך העשרוני: " + decimalValue;
    
    firebase.database().ref("/toAltera").set(decimalValue);
    
    console.log("נשלח כעשרוני:", decimalValue);
}





// app = firebase.initializeApp(firebaseConfig);


//   requireAuth();

//   // Load stream URL from RTDB or localStorage fallback
//   const streamImg = document.getElementById('camStream');
//   const streamInput = document.getElementById('streamUrl');
//   const saveBtn = document.getElementById('saveStream');

//   async function loadStreamUrl() {
//     try {
//       const url = await dbGet('/settings/esp32camStreamUrl');
//       const finalUrl = url || localStorage.getItem('esp32camStreamUrl') || '';
//       streamInput.value = finalUrl;
//       if (finalUrl) streamImg.src = finalUrl;
//     } catch (e) {
//       console.warn(e);
//     }
//   }

//   saveBtn.addEventListener('click', async () => {
//     const url = streamInput.value.trim();
//     localStorage.setItem('esp32camStreamUrl', url);
//     if (url) streamImg.src = url;
//     try { await dbSet('/settings/esp32camStreamUrl', url); } catch (e) { console.warn(e); }
//   });

//   // Auto/Manual switch
//   const autoSwitch = document.getElementById('autoSwitch');
//   const modeBadge = document.getElementById('modeBadge');

//   dbOn('/settings/autoMode', (val) => {
//     const isAuto = !!val;
//     autoSwitch.checked = isAuto;
//     modeBadge.className = 'badge ' + (isAuto ? 'bg-success' : 'bg-secondary');
//     modeBadge.textContent = isAuto ? 'AUTOMATIC' : 'MANUAL';
//   });

//   autoSwitch.addEventListener('change', async (e) => {
//     await dbSet('/settings/autoMode', e.target.checked);
//   });

// //   // Example sensor read (LDR) if you publish it to /getting values from esp32/ldr2
// //   const ldrEl = document.getElementById('ldrValue');
// //   dbOn('/getting values from esp32/ldr2', (val) => {
// //     if (ldrEl) ldrEl.textContent = (val ?? '—');
// //   });

// //   loadStreamUrl();
// // });



// var LIGHT = firebase.database().ref("/fromAltera/B");
// LIGHT.on('value',reciveData);

// function reciveData(snapshot) { 

//    if(snapshot.val()<200){
//     document.getElementById("lightAmount").src = "/img/day.png";
//     document.getElementById("lightText").innerText = "it is day time";
//     }
//   else if(snapshot.val()>=200){
//     document.getElementById("lightAmount").src = "/img/night.png";
//     document.getElementById("lightText").innerText = "it is night time";
//   }
//     console.log(snapshot.val())
// }
// var starCountRef = firebase.database().ref('/camIp');
// starCountRef.on('value', (snapshot) => {
//   const detect = snapshot.val();
//   document.getElementById('ipcam').src = 'http://'+detect+':81/stream';

//   console.log(detect);
// });

// // יוצרים משתנה LIGHT שמקשר לנתיב שבו חיישן ה-LDR שולח את הערכים בפיירבייס
// var LIGHT = firebase.database().ref("/getting values from esp32/ldr2");

// // מאזינים לשינויים בזמן אמת בנתיב הזה, ומפעילים את הפונקציה reciveData בכל שינוי
// LIGHT.on('value', reciveData);


// // הפונקציה שמטפלת בערך שנקלט מהחיישן
// function reciveData(snapshot) { 

//     // בודקים אם הערך שנקלט קטן מ-200 (כלומר אור יום)
//     if(snapshot.val() < 200){
//         // משנים את מקור התמונה ל-"day.png"
//         document.getElementById("lightAmount").src = "img/day.png";

//         // מציגים טקסט שמסביר שהשעה היא יום
//         document.getElementById("lightText").innerText = "it is day time";
//     }
//     // אם הערך גדול או שווה ל-200 (כלומר חושך / לילה)
//     else if(snapshot.val() >= 200){
//         // משנים את מקור התמונה ל-"night.png"
//         document.getElementById("lightAmount").src = "img/night.png";

//         // מציגים טקסט שמסביר שהשעה היא לילה
//         document.getElementById("lightText").innerText = "it is night time";
//     }

//     // מדפיסים את הערך שהתקבל מהחיישן לקונסול — שימושי לבדיקה/debug
//     console.log(snapshot.val());
// }








// // אתחול Firebase עם ההגדרות שהגדרת בקובץ firebaseConfig
// app = firebase.initializeApp(firebaseConfig);


// // קורא לפונקציה שמוודאת שמשתמש מחובר לפני שמטען את הדף
// requireAuth();


// // מצביעים לאלמנטים בדף — התמונה של ה-ESP32-CAM, שדה הקלט של ה-URL וכפתור השמירה
// const streamImg = document.getElementById('camStream');    // תמונת ה-MJPEG stream
// const streamInput = document.getElementById('streamUrl');  // שדה הקלט להזנת כתובת ה-stream
// const saveBtn = document.getElementById('saveStream');    // כפתור שמירה לכתובת


// // פונקציה שמטעינה את כתובת ה-ESP32-CAM מה-RTDB או מ-localStorage
// async function loadStreamUrl() {
//   try {
//     // מנסה לקרוא את הכתובת מ-Firebase Realtime Database
//     const url = await dbGet('/settings/esp32camStreamUrl');

//     // אם אין ב-Firebase, בודק ב-localStorage, ואם גם שם אין — מגדיר מחרוזת ריקה
//     const finalUrl = url || localStorage.getItem('esp32camStreamUrl') || '';

//     // מכניס את הכתובת לשדה הקלט בדף
//     streamInput.value = finalUrl;

//     // אם יש כתובת — מציב אותה גם בתג <img> כדי להציג את ה-Stream
//     if (finalUrl) streamImg.src = finalUrl;
//   } catch (e) {
//     // אם יש שגיאה בקריאה ל-Firebase — מציגים הודעת אזהרה בקונסול
//     console.warn(e);
//   }
// }


// // מאזינים ללחיצה על כפתור השמירה
// saveBtn.addEventListener('click', async () => {

//   // מקבלים את הערך מהשדה, ומסירים רווחים מיותרים
//   const url = streamInput.value.trim();

//   // שומרים את הכתובת גם ב-localStorage (לשימוש מקומי)
//   localStorage.setItem('esp32camStreamUrl', url);

//   // אם יש כתובת — מציבים אותה גם בתמונה
//   if (url) streamImg.src = url;

//   try {
//     // מנסים לשמור את הכתובת ב-Firebase Realtime Database
//     await dbSet('/settings/esp32camStreamUrl', url);
//   } catch (e) {
//     // אם יש שגיאה בשמירה — מציגים אזהרה בקונסול
//     console.warn(e);
//   }
// });


// // מצביעים לאלמנט הסוויץ' ול-badge שמראה את מצב AUTO/MANUAL
// const autoSwitch = document.getElementById('autoSwitch');
// const modeBadge = document.getElementById('modeBadge');


// // מאזינים לשינויים בערך autoMode ב-Firebase
// dbOn('/settings/autoMode', (val) => {

//   // הופכים את הערך ל-Boolean (true/false)
//   const isAuto = !!val;

//   // מעדכנים את הסוויץ' בהתאם לערך
//   autoSwitch.checked = isAuto;

//   // מעדכנים את ה-badge עם צבע וטקסט בהתאם למצב
//   modeBadge.className = 'badge ' + (isAuto ? 'bg-success' : 'bg-secondary');
//   modeBadge.textContent = isAuto ? 'AUTOMATIC' : 'MANUAL';
// });


// // מאזינים לשינוי במתג ה-AUTO/MANUAL
// autoSwitch.addEventListener('change', async (e) => {

//   // מעדכנים את הערך ב-Firebase לפי מצב הסוויץ'
//   await dbSet('/settings/autoMode', e.target.checked);
// });
