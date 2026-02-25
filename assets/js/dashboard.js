// Dashboard Logic

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    // Sidebar Toggle Logic
    const initSidebar = () => {
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');

        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent immediate closing
                sidebar.classList.toggle('hidden');
                sidebar.classList.toggle('fixed');
                sidebar.classList.toggle('inset-0');
                sidebar.classList.toggle('z-50');
                sidebar.classList.toggle('w-full'); // Full width on mobile
            });

            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                if (!sidebar.classList.contains('hidden') &&
                    !sidebar.contains(e.target) &&
                    !sidebarToggle.contains(e.target) &&
                    window.innerWidth < 768) { // Only on mobile

                    sidebar.classList.add('hidden');
                    sidebar.classList.remove('fixed', 'inset-0', 'z-50', 'w-full');
                }
            });
        }
    };
    initSidebar();

    // Chart Initialization
    const initCharts = () => {
        const ctx = document.getElementById('revenueChart');
        if (ctx && window.Chart) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Revenue',
                        data: [12000, 19000, 15000, 25000, 22000, 30000],
                        borderColor: '#0d9488',
                        tension: 0.4,
                        fill: true,
                        backgroundColor: 'rgba(13, 148, 136, 0.1)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    };
    initCharts();

    // Student Progress Logic (if applicable)
    const initProgress = () => {
        // Placeholder for future progress tracking logic
    };
    initProgress();
});

// Navigation Logic (SPA for Admin)
function navigateTo(viewId) {
    // Hide all views
    document.querySelectorAll('.dashboard-view').forEach(view => {
        view.classList.add('hidden');
    });

    // Show target view
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
        target.classList.remove('hidden');
    }

    // Update Sidebar Active State
    document.querySelectorAll('aside nav a').forEach(link => {
        link.classList.remove('bg-brand-50', 'dark:bg-brand-900/30', 'text-brand-700', 'dark:text-brand-400');
        link.classList.add('text-slate-600', 'dark:text-slate-400');

        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(viewId)) {
            link.classList.add('bg-brand-50', 'dark:bg-brand-900/30', 'text-brand-700', 'dark:text-brand-400');
            link.classList.remove('text-slate-600', 'dark:text-slate-400');
        }
    });
}

// Logout Confirmation Logic
function showLogoutConfirm() {
    const modal = document.getElementById('logout-modal');
    const content = document.getElementById('logout-modal-content');
    if (modal && content) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
        }, 10);
    }
}

function hideLogoutConfirm() {
    const modal = document.getElementById('logout-modal');
    const content = document.getElementById('logout-modal-content');
    if (modal && content) {
        content.classList.add('scale-95', 'opacity-0');
        content.classList.remove('scale-100', 'opacity-100');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

function confirmLogout() {
    // Standard redirect to home after logout
    window.location.href = 'index.html';
}
