
document.addEventListener('DOMContentLoaded', function() {
  
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const userData = localStorage.getItem('userData');
    
    if (!userLoggedIn || userLoggedIn !== 'true' || !userData) {
        
        alert('Please login to access notes.');
        window.location.href = 'login.html';
        return;
    }
    
   
    console.log('User authenticated, allowing access to notes page');
});