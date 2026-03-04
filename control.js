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
        if (url && streamImg) {
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
        if(val < 100) {
            // תיקון נתיב: בלי הסלאש בהתחלה
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

})
