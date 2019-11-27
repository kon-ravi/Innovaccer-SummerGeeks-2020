$('#submitBtn').on('click', function() {
  let flag = true;
  let ticketNo = $('#ticketInp').val();
  if (ticketNo.length <= 2) {
    $('.dispErr').css('display', 'block');
    $('.dispErr').text('Enter Correct Ticket Number');
    return false;
  }
  $('.dispErr').css('display', 'none');
  $('.overlay').show();
  return fetch('/visitor/checkout', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ticketNo: ticketNo })
  })
    .then(result => {
      $('.overlay').hide();
      if (result.status === 404) {
        $('.dispErr').css('display', 'block');
        $('.dispErr').text('No Such Ticket Number');
        throw new Error();
      }
      if (result.status === 405) {
        $('.dispErr').css('display', 'block');
        $('.dispErr').text('Ticket Already Checked Out!');
        throw new Error();
      }
      return result.json();
    })
    .then(res => {
      $('.overlay').hide();
      alert(
        'You have been successfully checked out! You will shortly recieve an email breifing about your visit! Hope to see you soon! In 3 seconds you will be redirected to the home page!'
      );
      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    })
    .catch(err => {
      return false;
    });
});
