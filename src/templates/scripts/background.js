export function getBackgroundScript() {
  return `<script>
function initBackgroundRotation() {
  const bgImgs = document.querySelectorAll('.background-slide');
  let bgIndex = 0;
  
  setInterval(() => {
    bgImgs.forEach((img, i) => img.classList.toggle('active', i === bgIndex));
    bgIndex = (bgIndex + 1) % bgImgs.length;
  }, 30000);
}

document.addEventListener('DOMContentLoaded', function() {
  initBackgroundRotation();
});
</script>`;
}
