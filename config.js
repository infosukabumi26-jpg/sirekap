const CONFIG = {
    // Ganti URL di bawah ini dengan URL Web App dari Google Apps Script Anda (berakhiran /exec)
    API_URL: "https://script.google.com/macros/s/AKfycbw7gQrAPs69qTsIr2JJtNOQ8IcX4WAv0Yrepv-FZDYWU_qQjiJM3W55bAfHpzcRZkc/exec"
};

// Cek autentikasi sebelum merender halaman
function checkAuth() {
    const token = localStorage.getItem('sirekap_token');
    const path = window.location.pathname;

    // Jika tidak ada token dan bukan di halaman login, arahkan ke login
    if (!token && !path.includes('login.html')) {
        window.location.href = 'login.html';
    }

    // Jika ada token dan di halaman login, arahkan ke index
    if (token && path.includes('login.html')) {
        window.location.href = 'index.html';
    }
}

// Panggil cek autentikasi
checkAuth();

function logout() {
    Swal.fire({
        title: 'Konfirmasi Keluar',
        text: 'Apakah Anda yakin ingin keluar dari sistem?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('sirekap_token');
            localStorage.removeItem('sirekap_role');
            window.location.href = 'login.html';
        }
    });
}
