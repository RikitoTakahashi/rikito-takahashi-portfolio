import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css'; // Swiperの基本CSSを読み込む

function main() {
    // --- DOM要素の取得エリア ---
    // 主要な要素は関数の最初にまとめて取得するのが一般的です
    const preloader = document.getElementById('preloader');
    const headerEl = document.getElementById('header');
    const bentoBtn = document.getElementById('bento-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    // --- プリローダー ---
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('-w-is-hidden');
        }
        document.body.classList.add('-w-loaded');
        if (headerEl) {
            headerEl.classList.add('-w-is-visible');
        }
    });

    // --- ヘッダー関連 ---
    if(headerEl) {
        window.addEventListener('scroll', () => {
            headerEl.classList.toggle('-w-is-scrolled', window.scrollY > 50);
        });
    }

    if (bentoBtn && mobileNav) {
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        bentoBtn.addEventListener('click', () => {
            const isOpen = bentoBtn.classList.toggle('-w-is-active');
            mobileNav.classList.toggle('-w-is-open', isOpen);
            document.body.classList.toggle('-w-no-scroll', isOpen);
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                bentoBtn.classList.remove('-w-is-active');
                mobileNav.classList.remove('-w-is-open');
                document.body.classList.remove('-w-no-scroll');
            });
        });
    }

    // --- Swiper初期化 (表示枚数調整) ---
    const swiperEl = document.querySelector('.swiper');
    if (swiperEl) {
        const swiper = new Swiper('.swiper', {

            modules: [Autoplay],

            loop: true,
            speed: 8000, 
            autoplay: {
                delay: 0, 
                disableOnInteraction: false,
            },
            allowTouchMove: false, 
            slidesPerView: 1.5,
            spaceBetween: 16,
            centeredSlides: true,
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                    centeredSlides: false,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 32,
                    centeredSlides: false,
                }
            }
        });
    }

// --- Works (モーダル機能) ---
const worksGrids = document.querySelectorAll('.-w-works-grid'); // 1. クラス名で全てのグリッドを取得
const modal = document.getElementById('modal');

// 2. グリッドが1つ以上見つかった場合のみ処理を実行
if (worksGrids.length > 0 && modal && window.worksData) {
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');

  // 3. 見つかった全てのグリッドに対して、クリックイベントを設定
    worksGrids.forEach(grid => {
        grid.addEventListener('click', (e) => {
        const card = e.target.closest('.-w-work-card');
        if (card && card.dataset.id) {
            const workId = card.dataset.id;
            const work = window.worksData.find(w => w.id === workId);
            if (work) {
            openModal(work);
            }
        }
        });
    });

  // ↓ openModal, closeModalの関数自体は変更なし
    function openModal(work) {
        modalContent.innerHTML = `
        <img src="${work.image.url}?w=800" alt="${work.title}" class="-w-modal-body__image">
        <h2 class="-w-modal-body__title">${work.title}</h2>
        <div class="-w-modal-body__description">
            <h3>担当範囲</h3><p>${work.role}</p>
            <h3>使用技術</h3><p>${work.skill}</p>
            ${work.url ? `<h3>サイトURL</h3><p><a href="${work.url}" target="_blank" rel="noopener noreferrer">${work.url}</a></p>` : ''}
            ${work.detail ? `<h3>概要</h3><div>${work.detail}</div>` : ''}
            ${work.ingenuity ? `<h3>工夫した点</h3><div>${work.ingenuity}</div>` : ''}
        </div>`;
        modalContent.scrollTop = 0;
        modal.classList.add('-w-is-open');
        document.body.classList.add('-w-no-scroll');
    }

    function closeModal() {
        modal.classList.remove('-w-is-open');
        document.body.classList.remove('-w-no-scroll');
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('-w-is-open')) closeModal(); });
    }

    // --- TOPへ戻るボタン（最終版） ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
    // ボタンの表示・非表示を制御するロジック
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('-w-is-visible', window.scrollY > 300);
    });

    // ボタンがクリックされた時のスムーズスクロール処理
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    });
    }

    // --- スクロールアニメーションのロジック ---
    const animationTargets = document.querySelectorAll('.-w-scroll-animation, .-w-scroll-animation-stagger');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('-w-scroll-animation-stagger')) {
                    entry.target.classList.add('-w-is-visible');
                    const children = entry.target.children;
                    for (let i = 0; i < children.length; i++) {
                        if (!children[i].style.transitionDelay) {
                             children[i].style.transitionDelay = `${i * 150}ms`;
                        }
                    }
                } else {
                    entry.target.classList.add('-w-is-visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -15% 0px',
    });

    animationTargets.forEach(target => {
        observer.observe(target);
    });
};

// ページのHTML読み込み完了を待って、main関数を実行
document.addEventListener('DOMContentLoaded', main);
