(() => {
  // constants
  const ZOOM_MAX = 250;
  const ZOOM_MIN = 50;
  const ZOOM_STEP = 10;
  const CONTENT_CONTAINER_SELECTOR = 'body > main';

  // content container element
  const contentContainer: HTMLElement = document.querySelector(CONTENT_CONTAINER_SELECTOR);
  
  // ui elements
  const themeSelect: HTMLSelectElement = document.getElementById('theme-select') as HTMLSelectElement;
  const fontSelect: HTMLSelectElement = document.getElementById('font-select') as HTMLSelectElement;
  const plusZoomBtn: HTMLElement = document.getElementById('zoom-plus');
  const minusZoomBtn: HTMLElement = document.getElementById('zoom-minus');
  const zoomLabel: HTMLElement = document.getElementById('zoom-label');
  
  //
  const setTheme = (theme: 'light' | 'sepia' | 'dark') => {
    contentContainer.dataset.theme = theme;
    themeSelect.value = theme;
  };

  const setFont = (font: 'default' | 'kopubbatang' | 'nanumgothic' | 'nanummyeongjo') => {
    contentContainer.dataset.font = font;
    fontSelect.value = font;
  };

  const setZoom = (zoom: number) => {
    contentContainer.dataset.zoom = zoom.toString();
    zoomLabel.innerHTML = zoom.toString();
  };
  
  const handleThemeSelectChange = (event) => {
    setTheme(themeSelect.value as any);
  };

  const handleFontSelectChange = (event) => {
    setFont(fontSelect.value as any);
  };

  const handleZoomBtnClick = (event) => {
    const isIncrease = event.target === plusZoomBtn;
    const currentValue = parseInt(contentContainer.dataset.zoom) || 100;
  
    let newValue = currentValue + (isIncrease ? 1 : -1) * ZOOM_STEP;
    
    if (newValue > ZOOM_MAX) {
      newValue = ZOOM_MAX;
    } else if (newValue < ZOOM_MIN) {
      newValue = ZOOM_MIN;
    }
    
    setZoom(newValue);
  };
  
  // bind event
  themeSelect.addEventListener('change', handleThemeSelectChange);
  fontSelect.addEventListener('change', handleFontSelectChange);
  [plusZoomBtn, minusZoomBtn].forEach((btn) => btn.addEventListener('click', handleZoomBtnClick));
  
  // init
  setTheme(themeSelect.value as any || 'light');
  setFont(fontSelect.value as any || 'default');
  setZoom(parseInt(zoomLabel.innerText) || 100);
})();