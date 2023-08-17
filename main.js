var courseN = document.getElementById('courseName');
var courseC = document.getElementById('courseCategory');
var courseP = document.getElementById('coursePrice');
var courseD = document.getElementById('courseDescription');
var courseCap = document.getElementById('courseCapacity');
var addbtn=document.getElementById('click');
var data = document.getElementById('data');
var delbtn=document.getElementById('deleteBtn');
var search= document.getElementById('search');
var currentindex=0;
var courses = JSON.parse(localStorage.getItem('courses'))
var update = document.getElementById('update');
update.style.display="none";

var isNameValid = false;
var isCategoryValid = false;
var isPriceValid = false;
var isDescriptionValid = false;
var isCapacityValid = false;


if (JSON.parse(localStorage.getItem('courses')) == null) {courses = [ ]}
else{
    JSON.parse(localStorage.getItem('courses')) == null}

displaydata();



function checkInput(){
    addbtn.setAttribute('disabled', 'disabled');

    if(isNameValid && isCategoryValid && isCapacityValid && isDescriptionValid && isPriceValid)
    addbtn.removeAttribute('disabled')
    else
    addbtn.setAttribute('disabled','disabled')
  
}







function resetpage(){


    addbtn.setAttribute('disabled','disabled')
courseN.classList.remove('is-valid')
courseC.classList.remove('is-valid')
courseCap.classList.remove('is-valid')
courseD.classList.remove('is-valid')
courseP.classList.remove('is-valid')


}


addbtn.onclick = function(e){
  e.preventDefault();
  addCourse();
  resetCourse();
displaydata();
resetpage();







}

delbtn.onclick = function() {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

            courses=[];
            data.innerHTML=''
            localStorage.setItem('courses', JSON.stringify(courses))

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })



   
}

function addCourse(){
  var course = {
    courseN: courseN.value,
    courseC : courseC.value,
    courseP: courseP.value,
    courseD: courseD.value,
    courseCap: courseCap.value
  }
  if(courseP.value==0)
  course.courseP='Free'

  courses.push(course);
  localStorage.setItem('courses', JSON.stringify(courses))

//   sweetalert

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })


}


function resetCourse(){
courseN.value=''
courseC.value=''
courseP.value=''
courseD.value=''
courseCap.value=''
}


function displaydata(){
    var result = ``
   for(var i=0; i<courses.length; i++) {
    result+=`
   <tr>

    <td>${i+1}</td>
    <td>${courses[i].courseN}</td>
    <td>${courses[i].courseC}</td>
    <td>${courses[i].courseP}</td>
    <td>${courses[i].courseD}</td>
    <td>${courses[i].courseCap}</td>
    <td><button class ="btn btn-info" onclick="getcourse(${i})">update </button></td>
    <td><button class ="btn btn-danger"  onclick="delcourse(${i})">delete </button></td>

   </tr>
    
     `
   }
   data.innerHTML=result
    

    
}


// update
function getcourse (index){
    currentindex=index
    var course = courses[index]

    courseN.value=course.courseN
    courseC.value=course.courseC
    courseP.value=course.courseP
    courseD.value=course.courseD
    courseCap.value=course.courseCap
    update.style.display='inline'
    addbtn.style.display='none'
}

update.onclick = function(e){
    e.preventDefault();
    updateCourse();
    displaydata();
    update.style.display='none';
    addbtn.style.display='inline';
    resetCourse();
    resetpage();


}

function updateCourse(){
    var course = {
        courseN: courseN.value,
        courseC : courseC.value,
        courseP: courseP.value,
        courseD: courseD.value,
        courseCap: courseCap.value
      }

      var prevName = courses[currentindex].courseN
      courses[currentindex].courseN=course.courseN
      courses[currentindex].courseC=course.courseC
      courses[currentindex].courseP=course.courseP
      courses[currentindex].courseD=course.courseD
      courses[currentindex].courseCap=course.courseCap
      localStorage.setItem('courses',JSON.stringify(courses))

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your update has been saved',
        showConfirmButton: false,
        timer: 1500
      })

    




}

// on delete course button
function delcourse(index) {


    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

            courses.splice(index, 1);
            displaydata();
  localStorage.setItem('courses', JSON.stringify(courses))

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

    

}

search.onkeyup = function(){
    var result=``
    for(var i=0; i<courses.length; i++) {
        if(courses[i].courseN.toLowerCase().includes(search.value.toLowerCase())){
            result += `
            
            <tr>         
                <td>${i+1}</td>
                <td>${courses[i].courseN}</td>
                <td>${courses[i].courseC}</td>
                <td>${courses[i].courseP}</td>
                <td>${courses[i].courseD}</td>
                <td>${courses[i].courseCap}</td>
                <td><button class ="btn btn-info" onclick="getcourse(${i})">update </button></td>
                <td><button class ="btn btn-danger"  onclick="delcourse(${i})">delete </button></td>   
            </tr> 
            `


        }
        data.innerHTML=result
    }


}




//validdation
// we use regex to validate the inputs



//coursename validation
var namealert=document.getElementById("nameAlert")
nameAlert.style.display='none'


courseN.onkeyup = function(){
    var pattern = /^[A-Z][a-z]{2,10}$/
    if(pattern.test(courseN.value)){

        isNameValid=true
        
        if(courseN.classList.contains('is-invalid'))
        courseN.classList.replace('is-invalid','is-valid')

        courseN.classList.add('is-valid')
        nameAlert.style.display='none'

    }
    

    else{
        isNameValid=false
        nameAlert.style.display='block'
        if(courseN.classList.contains('is-valid'))
        courseN.classList.replace('is-valid','is-invalid')
        courseN.classList.add('is-invalid')
    }

    checkInput();   
 
}




// couresCategory validation
var catAlert = document.getElementById('catAlert')
catAlert.style.display='none'


courseC.onkeyup = function(){
    var pattern = /^[A-Z][a-z]{2,20}$/
    if(pattern.test(courseC.value)){

        isCategoryValid=true
        if(courseC.classList.contains('is-invalid'))
        courseC.classList.replace('is-invalid','is-valid')

        courseC.classList.add('is-valid')
        catAlert.style.display='none'

    }

    else{
        isCategoryValid=false
        catAlert.style.display='block'

        if(courseC.classList.contains('is-valid'))
        courseC.classList.replace('is-valid','is-invalid')
        courseC.classList.add('is-invalid')
    }

    checkInput();   
}




// couresPrice validation


var pricealert = document.getElementById('priceAlert')
pricealert.style.display='none'

courseP.onkeyup = function(){
    var pattern = /^[0-9]{1,4}$/
    if(pattern.test(courseP.value)){

        isPriceValid=true
        if(courseP.classList.contains('is-invalid'))
        courseP.classList.replace('is-invalid','is-valid')

        courseP.classList.add('is-valid')
        pricealert.style.display='none'
    }

    else{
        isPriceValid=false
        if(courseP.classList.contains('is-valid'))
        courseP.classList.replace('is-valid','is-invalid')
        courseP.classList.add('is-invalid')
        pricealert.style.display='block'
    }

    checkInput();   
}





// couresDescription validation

var desalert = document.getElementById('desAlert')
desalert.style.display='none'

courseD.onkeyup = function(){
    var pattern = /^[A-Z][A-Za-z0-9\s]{2,120}$/
    if(pattern.test(courseD.value)){

        isDescriptionValid=true
        if(courseD.classList.contains('is-invalid'))
        courseD.classList.replace('is-invalid','is-valid')

        courseD.classList.add('is-valid')
desalert.style.display='none'

    }

    else{
        isDescriptionValid=false
        if(courseD.classList.contains('is-valid'))
        courseD.classList.replace('is-valid','is-invalid')
        courseD.classList.add('is-invalid')
desalert.style.display='block'

    }

    checkInput();   
}





// couresCapacity validation

var capalert = document.getElementById('capAlert')
capalert.style.display='none'

courseCap.onkeyup = function(){
    var pattern = /^[0-9]{1,3}$/
    if(pattern.test(courseCap.value)){

        isCapacityValid=true
        if(courseCap.classList.contains('is-invalid'))
        courseCap.classList.replace('is-invalid','is-valid')

        courseCap.classList.add('is-valid')
       capalert.style.display='none'
    }

    else{
        isCapacityValid=false
        capalert.style.display='block'
        if(courseCap.classList.contains('is-valid'))
        courseCap.classList.replace('is-valid','is-invalid')
        courseCap.classList.add('is-invalid')
    }

    checkInput();   
}
