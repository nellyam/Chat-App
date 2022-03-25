const errorMsg = document.querySelector('#error');

const loginBtn = document.querySelector('#login');

loginBtn.addEventListener('click', evt => {

    // Hide error message
    errorMsg.style.display = 'none';

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    if(!username || !password) {
        errorMsg.style.display = '';
        evt.preventDefault();
    }

});
