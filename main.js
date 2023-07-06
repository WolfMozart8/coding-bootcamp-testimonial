const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

// .text-main .personal-info .img-person
const animable = document.querySelectorAll(".animable")

const changeDom = {
  name: document.querySelector(".text-name"),
  job: document.querySelector(".text-job"),
  text: document.querySelector(".text-main"),
  img: document.querySelector(".img-person"),
};

// for setTimeout (delay)
const animTime1 = 200;
const animTime2 = 100;

let canSlide = true;
let actual = 0; // for testimonialList index
const testimonialList = [];

// slide functions
function actionPrev() {
  if (canSlide) {
    if (actual >= testimonialList.length - 1) {
      actual = 0;
    } else {
      actual++;
    }
    animationSlide("right", animTime1, animTime2)
    slideTimer()

  }
}
function actionNext() {
  if (canSlide) {
    if (actual === 0) {
      actual = testimonialList.length - 1;
    } else {
      actual--;
    }
    animationSlide("left", animTime1, animTime2)
    slideTimer()

  }
}

// change dom info from the *actual* array index
function changeDomFunction() {
  changeDom.name.textContent = testimonialList[actual].name;
  changeDom.job.textContent = testimonialList[actual].job;
  changeDom.text.textContent = testimonialList[actual].text;
  changeDom.img.src = testimonialList[actual].imgSrc;
}

// create new tesstimonial
function NewTestimonial(name, job, imgSrc, text) {
  this.name = name;
  this.job = job;
  this.imgSrc = imgSrc;
  this.text = text;

  return {
    name,
    job,
    imgSrc,
    text,
  };
}

    // create testimonials

// name
// job
// image source
// text

const tanya = new NewTestimonial(
  "Tanya Sinclair",
  "UX Engineer",
  "./images/image-tanya.jpg",
  "“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”"
);

const john = new NewTestimonial(
  "John Tarkpor",
  "Junior Front-end Developer",
  "./images/image-john.jpg",
  "“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ”"
);

// add to array
testimonialList.push(tanya);
testimonialList.push(john);


// animation
const animationSlide = (side, time1, time2) => {
  if (side === "left") {

    animable.forEach((element) => {
      element.classList.add("to-left")
    })

    setTimeout(() => {
      changeDomFunction()
      animable.forEach((element) => {
        element.classList.remove("to-left")
        element.classList.add("from-right")
      })
      setTimeout(() => {
        animable.forEach(element => {
          element.classList.remove("from-right")
        })
      }, time2)
    }, time1)
  }
  else if (side === "right") {

    animable.forEach((element) => {
      element.classList.add("to-right")
    })

    setTimeout(() => {
      changeDomFunction()
      animable.forEach((element) => {
        element.classList.remove("to-right")
        element.classList.add("from-left")
      })
      setTimeout(() => {
        animable.forEach(element => {
          element.classList.remove("from-left")
        })
      }, time2)
    }, time1)
  }
}

// time for the next slide
function slideTimer() {
  canSlide = false
  setTimeout(() => {
    canSlide = true
  }, 500)
}

    // event listeners

// touch events
let startX;

function sliderTouchStart(event) {
  startX = event.touches[0].clientX; // save the first touch
}

function sliderTouchEnd (event) {
  const endX = event.changedTouches[0].clientX;
  const touchLength = Math.round(startX) - Math.round(endX)
  if (endX < startX && touchLength > 50 && canSlide) {  // touch to left
    actionNext()
  } else if (endX > startX && touchLength < -50 && canSlide) {   // touch to right
    actionPrev()
  }
}

// mouse wheel events
function sliderWheel(e) {
    const posX = e.deltaX

    if (posX > 10 && canSlide) {
      actionNext()
    } else if (posX < -10 && canSlide) {
      actionPrev()
    }
}

// buttons
btnPrev.addEventListener("click", actionPrev);
btnNext.addEventListener("click", actionNext);
// touch controls
document.addEventListener("touchstart", sliderTouchStart);
document.addEventListener("touchend", sliderTouchEnd);
// mouse wheel
document.body.addEventListener("wheel", sliderWheel)


// initial state
changeDomFunction();
