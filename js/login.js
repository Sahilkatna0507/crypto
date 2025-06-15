// login.js
import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {

  // Open/Close popup handlers
  document.getElementById('loginBtn')?.addEventListener('click', () => {
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

    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    if (!email || !password) {
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
    }
  });

});
