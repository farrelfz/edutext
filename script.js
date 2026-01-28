/*
 * EduText Website Scripts
 *
 * This file contains client‑side logic for Google sign‑in and
 * placeholder payment integration. Replace the client IDs and server
 * endpoints with your own configurations.
 */

// Google Sign‑in callback
function handleCredentialResponse(response) {
  // Decode the JWT token if needed and extract basic profile information.
  // For demonstration purposes, we'll simply show a welcome alert.
  const jwt = response.credential;
  // TODO: verify the token on your server and create or update user in database.
  alert('Login berhasil! Selamat datang di EduText!');
  // After successful sign‑in, redirect the user to the dashboard
  window.location.href = 'dashboard.html';
}

// Placeholder payment initiation function
function initiatePayment() {
  // In a real application, you would call your payment gateway API (e.g. Midtrans Snap, DOKU, Xendit)
  // and redirect the user to the payment page or open a payment modal.
  alert(
    'Integrasi pembayaran lokal belum diaktifkan pada demo ini.\nSilakan hubungi kami untuk mengaktifkan pembayaran.'
  );
}

// Example function to render Google sign‑in button programmatically (if needed)
// window.onload = function () {
//   google.accounts.id.initialize({
//     client_id: 'YOUR_GOOGLE_CLIENT_ID',
//     callback: handleCredentialResponse,
//   });
//   google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
//     theme: 'outline',
//     size: 'large',
//   });
//   google.accounts.id.prompt(); // display the One Tap prompt if desired
// };