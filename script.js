// Screen Elements
const paymentStep = document.getElementById('payment-step');
const otpStep = document.getElementById('otp-step');
const successStep = document.getElementById('success-step');

// Forms
const paymentForm = document.getElementById('payment-form');
const otpForm = document.getElementById('otp-form');

// OTP Inputs
const otpInputs = document.querySelectorAll('.otp-input');

// --- 1. Handle Payment Submission ---
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    
    // In a real app, you would validate the card and call an API here.
    // For the UI demo, we immediately transition to the OTP step.
    
    paymentStep.classList.remove('active');
    otpStep.classList.add('active');
    
    // Focus the first OTP input automatically
    otpInputs[0].focus();
});

// --- 2. Handle OTP Auto-Advance UX ---
otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        // If the input has a value and it's not the last input, move to the next
        if (input.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        // If the user hits Backspace and the field is empty, move to the previous input
        if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
            otpInputs[index - 1].focus();
        }
    });
});

// --- 3. Handle OTP Verification Submission ---
otpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Gather the full OTP code
    let code = '';
    otpInputs.forEach(input => code += input.value);
    
    // In a real app, verify the code with your backend here.
    console.log("Verifying Code:", code);

    // Transition to Success Screen
    otpStep.classList.remove('active');
    successStep.classList.add('active');
});

// Optional: Format Card Number (adds spaces automatically)
document.getElementById('card-number').addEventListener('input', function (e) {
    this.value = this.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
});