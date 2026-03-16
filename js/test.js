const firebaseConfig = {
  apiKey: "AIzaSyDMLdK2ax7ul7I3_nzzzgzzdv-RGUoRazo",
  authDomain: "agre-tech-ccf27.firebaseapp.com",
  projectId: "agre-tech-ccf27",
  storageBucket: "agre-tech-ccf27.firebasestorage.app",
  messagingSenderId: "811052594008",
  appId: "1:811052594008:web:517a7eba566d9f978deb2d"
};


app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
console.log(auth)

          function sign(){
            email =  document.getElementById("email").value
            password =  document.getElementById("password").value

            auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in 
              var user = userCredential.user;
              console.log(user)
              // ...
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorMessage)
              // ..
            });

          }
// a=-2
// b=6
// c=-4
// z=(b*b)-(4*a*c)
// if(z<0){
//   console.log('error')
// }
// else if(z==0){
//   console.log(-b/(2*a))  
// }
// else{
//     console.log(((-b)+Math.sqrt(z))/(2*a))
//     console.log(((-b)-Math.sqrt(z))/(2*a))
// }
 

// function user(name,age,pass){
//      this.name = name
//      this.age = age
//      this.pass = pass
//      this.print = function(){
//         console.log("age:"+this.age)
//      }

// }
// user1= new user("agam",19,"agam1234")
// user2= new user("adam",18,"adam123")
// user3= new user("or",30,"or30")
// user4= new user("amit",10,"amit1010")

// userlist = [user1,user2,user3,user4]
// maxage = user1.age
// for(i=0;i<userlist.length;i++){
//     if(userlist[i].age>maxage){
//         maxage =  userlist[i].age
//     }
// }
// console.log(maxage)




// function book(name,price,auther,category,id){
//      this.name = name
//      this.price = price
//      this.auther = auther
//      this.category = category
//      this.id = id

//      this.update = function (newName,newPrice,newAuther,newCategory,newId){
//         this.newName = newName
//         this.newPrice = newPrice
//         this.newAuther = newAuther
//         this.newCategory =newCategory
//         this.newId = newId
//      }
// }


// function store(name,books){
//     store1= new store("stimatski",books)
// }

// function test(name,subject,grade,date){
//     this.name = name
//     this.subject = subject
//     this.grade = grade
//     this.date = date
//     this.set_grade = function(grade)
//     {
//         this.grade = grade
//     }
//     this.print = function()
//     {
//         console.log(this.name+"\n"+this.student+"\n"+this.grade+"\n"+this.date)
//     }

// }
// function student(name,id,grades){
//     this.name = name
//     this.id = id
//     this.grades = grades
//        this.print = function(){
//         console.log(this.name+"\n"+this.id+"\n"+this.grades+"\n"+this.final_grade+"\n")
//         for(i=0;i<this.grades.length;i++){
//          console.log(this.grades[i].print())   
//         }
//        }
//        this.set_grade = function(grade)
//        {
//         this.grades.push(grades)
//        }
//        this.avg = function()
//        {
//         avg=0
//         sum=0
//         for(i=0;i<grades.length;i++)
//         {
//             sum= sum+grades[i].grade
//         }
//         console.log(sum)
//         avg= sum/grades.length
//         return(avg)
//        }
// }
// student1 = new student("agam",329550131,[])
// test1 = new test("agam","math",100,1)
// test2 = new test("agam","math",90,6)
// test3 = new test("agam","math",98,20)
// student1.set_grade(test1)
// student1.set_grade(test2)
// student1.set_grade(test3)
// student1.print()
// console.log(student1.avg())
















