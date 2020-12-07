const logOut = document.querySelector('#logout');
/*
const url = 'https://localhost:8000';// change url when uploading to server

logOut.addEventListener('click', async (evt) => {
    evt.preventDefault();
    try {
      const options = {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      const response = await fetch(url + '/auth/logout', options);
      const json = await response.json();
      console.log(json);
      // remove token
      sessionStorage.removeItem('token');
      alert('You have logged out');
    }
    catch (e) {
      console.log(e.message);
    }
  });
  */