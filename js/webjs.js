/**
 * WEB222 – Final Assignment
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Chan Lai Kuen
 *      Student ID: 147820211
 *      Date:       08/07/2022
 */
window.addEventListener('DOMContentLoaded', loadPage);

// called to set up the page once the DOM content is loaded.
function loadPage() {
  getTodayDate();
  formHideJob();
  radioBtns();
  validateForm();
}

// get the current date when loading the page
function getTodayDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = date.getDate();
  day = day < 10 ? "0" + day : day;
  let str = month + "/" + day + "/" + year;
  const time = document.querySelectorAll('.todaydate'); 
  for (let i = 0; i < time.length; ++i) {
    time[i].setAttribute('datetime', str);
    time[i].innerText = '';
    time[i].innerText = str;
  }
}

// hides the <div id="job"> that include pay rate, company name and company website
function formHideJob() {
  const job = document.querySelector('#job');
  job.setAttribute('hidden', '');

  const payRate = document.querySelector('#payrate');
  payRate.removeAttribute('required');
}

// shows the job with pay rate, company name and company website
function formShowJob() {
  const job = document.querySelector('#job');
  job.removeAttribute('hidden');

  const payRate = document.querySelector('#payrate');
  payRate.setAttribute('required', '');
}

// shows all the buttons;when user click the "hiring" button, the 
// job related fields will display on
function radioBtns() {
  const radioBtns = document.querySelectorAll('.radio-items');
  for (let i = 0; i < radioBtns.length; ++i) {
    if (radioBtns[i].value === 'hiring') {
      radioBtns[i].addEventListener('click', function (event) {
        formShowJob();
        event.stopPropagation();
      });
    } else {
      radioBtns[i].addEventListener('click', function (event) {
        formHideJob();
        event.stopPropagation();
      });
    }
  }
}

// validates pay rate
function validPay(pay) {
  try {
    parseInt(pay);
    return pay >= 0; 
  } catch (err) {
    console.error(err);
    return false;
  }
}

// form validation
function validateForm() {
  const form = document.querySelector('#contact-form');

  form.onsubmit = function (event) {
    const job = document
      .querySelector('#contact-form')
      .getAttribute('hidden'); 

    if (!form.checkValidity()) {
      form.classList.add('was-validated');

      event.preventDefault();
      return false;
    }

    //call the validPay function to valid, if fail; 
    if (!job && !validPay(form.pay.value)) {
      form.pay.setCustomValidity('$0 or greater.');
      form.classList.add('was-validated');

      form.pay.oninput = function () {
        if (!validPay(form.pay.value)) {
          form.pay.setCustomValidity('$0 or greater.');
        } else {
          form.pay.setCustomValidity('');
          form.pay.oninput = null;
        }
      };

      event.preventDefault();
      // return false;
    }

  };
}