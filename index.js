
let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
var constraints = {
    audio: false,
    video: {
        facingMode: 'user'
    }
}
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.setAttribute('playsinline', '')

function takeshot() {
  
    let div =
        document.getElementById('photoframe'); 
     
  
    html2canvas(div,{ 
        dpi: 144,
        allowTaint: true
      }).then(
        
        function (canvas) {
            
            return Canvas2Image.saveAsPNG(canvas);
        })
   
}
camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia(constraints);
	  video.srcObject = stream;
});
camera_button.click();
click_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg', 1.0); 
    //takeshot();
   	// data url of the image
   //	console.log(image_data_url);
});



const items = document.querySelectorAll('img');
const itemCount = items.length;
const nextItem = document.querySelector('.next');
const previousItem = document.querySelector('.previous');
let count = 0;

function showNextItem() {
  items[count].classList.remove('active');

  if(count < itemCount - 1) {
    count++;
  } else {
    count = 0;
  }

  items[count].classList.add('active');
  console.log(count);
}

function showPreviousItem() {
  items[count].classList.remove('active');

  if(count > 0) {
    count--;
  } else {
    count = itemCount - 1;
  }

  items[count].classList.add('active');
  console.log(count);
}

nextItem.addEventListener('click', showNextItem);
previousItem.addEventListener('click', showPreviousItem);

$(document).ready(function(){
    $('.frame').click(function(){
        var imagePath = $(this).attr('src');
        $('.framebg').css({"background-image": "url(" + imagePath + ")"});   
        $('.card').css({"background-image": "url(" + imagePath + ")"});   
       });
});