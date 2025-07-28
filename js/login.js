import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
  // Open/Close popup handlers
  document.getElementById('loginBtn')?.addEventListener('click', () => {
    console.log('Login button clicked');
    document.getElementById('loginPopup').classList.remove('hidden');
  });

  document.getElementById('loginClose')?.addEventListener('click', () => {
    document.getElementById('loginPopup').classList.add('hidden');
  });

  document.getElementById('openRegister')?.addEventListener('click', () => {
    document.getElementById('loginPopup').classList.add('hidden');
    document.getElementById('registerPopup').classList.remove('hidden');
  });

  document.getElementById('registerClose')?.addEventListener('click', () => {
    document.getElementById('registerPopup').classList.add('hidden');
  });

  // Handle registration with Supabase Auth
  document.getElementById('registerSubmit')?.addEventListener('click', async () => {
    const email = document.getElementById('regEmail')?.value.trim();
    const password = document.getElementById('regPass')?.value.trim();
    const confirm = document.getElementById('regConfirm')?.value.trim();
    const phone = document.getElementById('regMobile')?.value.trim();
    const name = document.getElementById('regName')?.value.trim();

    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    if (!email || !password || !phone || !name) {
      alert('Please fill all fields');
      return;
    }
  
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error('Signup Error!', error);
      alert(error.message);
    } else {
      console.log('Signup Successful!', data);
      alert('Signup successful. Please check your email for confirmation.');

      // Once Signup is successful, insert additional details into profiles
      if (data?.user) {
        const { error: profileError } = await supabase.from('profiles').insert([{
          id: data?.user?.id,
          name: name,
          phone: phone
        }]);

        if (profileError) {
          console.error('Profile Error!', profileError);
          alert('Signup was successful, but we could not save profile details');
        }
      }
      document.getElementById('registerPopup').classList.add('hidden');
    }
  });

  // Handle login with Supabase Auth
  document.getElementById('loginSubmit')?.addEventListener('click', async () => {
    const email = document.getElementById('loginUsername')?.value.trim();
    const password = document.getElementById('loginPass')?.value.trim();

    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }
  
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Login Error!', error);
      alert(error.message);
    } else {
      console.log('Login Successful!', data);
      alert('Login successful');
      document.getElementById('loginPopup').classList.add('hidden');
      // Update UI
      document.getElementById('loginBtn').classList.add('hidden'); // Hide login button
      document.getElementById('logoutBtn').classList.remove('hidden'); // Show logout button
      document.getElementById('userName').textContent = data?.user?.email; // Display user email
    }
});

// Handle logout
document.getElementById('logoutBtn')?.addEventListener('click', async () => {
    await supabase.auth.signOut();

    // Update UI back to initial state
    document.getElementById('loginBtn').classList.remove('hidden'); // show login button again
    document.getElementById('logoutBtn').classList.add('hidden'); // hide logout button
    document.getElementById('userName').textContent = '';
    alert('You have been successfully logged out');
});

// (Optional) On page load, check if a user is already authenticated
document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
      // User is already authenticated
      document.getElementById('loginBtn').classList.add('hidden'); 
      document.getElementById('logoutBtn').classList.remove('hidden'); 
      document.getElementById('userName').textContent = session?.user?.email;
    }
});


});
