$('#submitBtn').on('click', function() {
  let flag = true;
  let host = {};
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
          host['firstName'] = $(this).val();
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
          host['lastName'] = $(this).val();
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
          host['email'] = $(this).val();
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
          host['phoneNumber'] = $(this).val();
          flag = true;
        }
        break;
      case 4:
        if ($(this).val().length <= 10) {
          $('.dispErr').css('display', 'block');
          $('.dispErr').text('Enter Full Address');
          flag = false;
          return false;
        } else {
          flag = true;
          host['address'] = $(this).val();
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
    return fetch('/host', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(host)
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
          'Welcome! You Have Been Added As A Host. Whenever Someone Would Come To Visit You You Will Be Notified Through E-Mail! You Will Be Redirected To The Home Page In 3 Seconds'
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
