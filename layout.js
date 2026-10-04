document.addEventListener('DOMContentLoaded', () => {
    // Jangan render layout di halaman login
    if (window.location.pathname.includes('login.html')) return;

    const role = localStorage.getItem('sirekap_role') || 'user';
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const navbarHtml = `
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link text-danger font-weight-bold" href="#" onclick="event.preventDefault(); logout();">
              <i class="fas fa-sign-out-alt"></i> Logout
            </a>
          </li>
        </ul>
      </nav>
    `;

    const adminMenuHtml = role === 'administrator' ? `
        <li class="nav-item">
        <a href="users.html" class="nav-link ${currentPath === 'users.html' ? 'active' : ''}">
            <i class="nav-icon fas fa-users-cog"></i>
            <p>Manajemen User</p>
        </a>
        </li>
        <li class="nav-item">
        <a href="dicetak.html" class="nav-link ${currentPath === 'dicetak.html' ? 'active' : ''}">
            <i class="nav-icon fas fa-print"></i>
            <p>Data Dicetak</p>
        </a>
        </li>
        <li class="nav-item">
        <a href="permohonan_dicetak.html" class="nav-link ${currentPath === 'permohonan_dicetak.html' ? 'active' : ''}">
            <i class="nav-icon fas fa-check-double"></i>
            <p>Status Cetak</p>
        </a>
        </li>
    ` : '';

    const sidebarHtml = `
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index.html" class="brand-link">
          <span class="brand-text font-weight-light pl-3"><strong>SIREKAP Cloud</strong></span>
        </a>
        <div class="sidebar">
          <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li class="nav-item">
                <a href="index.html" class="nav-link ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">
                  <i class="nav-icon fas fa-file-alt"></i>
                  <p>Data Permohonan</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pembanding.html" class="nav-link ${currentPath === 'pembanding.html' ? 'active' : ''}">
                  <i class="nav-icon fas fa-copy"></i>
                  <p>Data Pembanding</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="sinkronisasi.html" class="nav-link ${currentPath === 'sinkronisasi.html' ? 'active' : ''}">
                  <i class="nav-icon fas fa-sync-alt"></i>
                  <p>Hasil Sinkronisasi</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="laporan_permohonan.html" class="nav-link ${currentPath === 'laporan_permohonan.html' ? 'active' : ''}">
                  <i class="nav-icon fas fa-chart-bar"></i>
                  <p>Laporan Permohonan</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="laporan_tanpa_tptl.html" class="nav-link ${currentPath === 'laporan_tanpa_tptl.html' ? 'active' : ''}">
                  <i class="nav-icon fas fa-chart-pie"></i>
                  <p>Laporan Tanpa TP/TL</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="laporan_detail.html" class="nav-link ${currentPath === 'laporan_detail.html' ? 'active' : ''}">
                  <i class="nav-icon fas fa-list-alt"></i>
                  <p>Laporan Detail</p>
                </a>
              </li>
              ${adminMenuHtml}
            </ul>
          </nav>
        </div>
      </aside>
    `;

    // Inject ke dalam div wrapper (sebelum div content-wrapper)
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
        wrapper.insertAdjacentHTML('afterbegin', navbarHtml + sidebarHtml);
    }
});
