document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('complaintForm');
    const fileUpload = document.getElementById('fileUpload');
    const fileList = document.getElementById('fileList');
    const captchaText = document.getElementById('captchaText');
    const captchaInput = document.getElementById('captchaInput');
    // const regenrateCaptcha =document.getElementById('regenrateCaptcha');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    
    let captchaCode = '';

    // Generate CAPTCHA
    function generateCaptcha() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz0123456789';
        captchaCode = '';
        for (let i = 0; i < 6; i++) {
            captchaCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        captchaText.textContent = captchaCode;
    }

    // Validate file size (5MB max)
    fileUpload.addEventListener('change', function() {
        fileList.innerHTML = '';
        let hasError = false;

        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];
            const fileItem = document.createElement('div');
            
            if (file.size > 5242880) { // 5MB in bytes
                fileItem.innerHTML = `<span class="file-error">✗ ${file.name} (Too large)</span>`;
                hasError = true;
            } else {
                fileItem.textContent = `✓ ${file.name}`;
            }
            
            fileList.appendChild(fileItem);
        }

        if (hasError) {
            this.value = ''; // Clear invalid files
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate CAPTCHA
        if (captchaInput.value !== captchaCode) {
            alert('Invalid CAPTCHA! Please try again.');
            generateCaptcha();
            captchaInput.value = '';
            return;
        }

        // Generate random complaint ID (simulate backend)
        const complaintId = '#' + Math.floor(Math.random() * 90000 + 10000);
        document.getElementById('complaintID').textContent = complaintId;

        // Show success modal
        successModal.show();

        // Reset form
        form.reset();
        fileList.innerHTML = '';
        generateCaptcha();
    });

    // Initialize CAPTCHA
    generateCaptcha();

    
});