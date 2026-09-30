/* Generic Stream LXP external-loading test. No production or organisation-specific code. */
(function () {
  function markLoaded() {
    var el = document.getElementById('stream-external-js-status');
    if (el) {
      el.textContent = '✓ External JavaScript loaded successfully';
      el.setAttribute('data-js-loaded', 'true');
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markLoaded);
  } else {
    markLoaded();
  }
})();
