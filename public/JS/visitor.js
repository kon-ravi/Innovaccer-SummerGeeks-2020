$('#submitBtn').on('click', function() {
  let flag = true;
  let visitor = {};
  $('.form-control').each(function(ind) {
    switch (ind) {
      case 0:
        if (
          $(this).val().length <= 0 ||
          !$(this)
            .val()
            .match('^[a-zA-Z]+$')
        ) {
          $('.dispErr').css('display', 'block');
          $('.dispErr').text(
            'First Name Should Contain Only Lowercase And Uppercase Alphabets'
          );
          flag = false;
          return false;
        } else {
          visitor['firstName'] = $(this).val();
          flag = true;
        }
        break;
      case 1:
        if (
          $(this).val().length <= 0 ||
          !$(this)
            .val()
            .match('^[a-zA-Z]+$')
        ) {
          $('.dispErr').css('display', 'block');
          $('.dispErr').text(
            'Last Name Should Contain Only Lowercase And Uppercase Alphabets'
          );
          flag = false;
          return false;
        } else {
          visitor['lastName'] = $(this).val();
          flag = true;
        }
        break;
      case 2:
        if (
          $(this).val().length <= 0 ||
          !$(this)
            .val()
            .match('[a-zA-Z0-9]+@[a-z]+[.][a-z]+')
        ) {
          $('.dispErr').css('display', 'block');
          $('.dispErr').text('Email Is Wrong');
          flag = false;
          return false;
        } else {
          visitor['email'] = $(this).val();
          flag = true;
        }
        break;
      case 3:
        if ($(this).val().length != 10) {
          $('.dispErr').css('display', 'block');
          $('.dispErr').text('Phone Number Is Not Correct');
          flag = false;
          return false;
        } else {
          visitor['phoneNumber'] = $(this).val();
          flag = true;
        }
        break;
      case 4:
        if ($(this).val() == '0') {
          $('.dispErr').css('display', 'block');
          $('.dispErr').text('Select A Host');
          flag = false;
          return false;
        } else {
          flag = true;
          visitor['hostId'] = $(this).val();
        }
        break;
    }
    if (!flag) {
      return false;
    }
  });
  if (!flag) {
    return false;
  } else {
    $('.dispErr').css('display', 'none');
    $('.overlay').show();
    return fetch('/visitor', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(visitor)
    })
      .then(result => {
        $('.overlay').hide();
        if (result.status != 200) {
          throw new Error();
        }
        return result.json();
      })
      .then(res => {
        $('.overlay').hide();
        alert(
          'Welcome! Your ticket number is ' +
            res.ticketId +
            '. Kindly note it for checking out!You will be redirected to home page in 3 seconds.'
        );
        setTimeout(() => {
          window.location.assign('/');
        }, 3000);
      })
      .catch(err => {
        $('.overlay').hide();
        alert('Some error occurred at the backend!');
        return false;
      });
  }
});
