// app.jsx — root component; mounts everything

function ApplyTokens() {
  const {
    content
  } = useStore();
  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', content.accentColor || '#D93B25');
    // derive accent-soft as a tinted version
    document.documentElement.style.setProperty('--accent-soft', mixHex(content.accentColor || '#D93B25', '#ffffff', 0.92));
    document.documentElement.style.setProperty('--heading', `'${content.headingFont || 'Playfair Display'}', Georgia, serif`);
  }, [content.accentColor, content.headingFont]);
  return null;
}
function mixHex(hex, otherHex, weight) {
  // weight = 0..1 amount of otherHex
  const a = hex.replace('#', '');
  const b = otherHex.replace('#', '');
  const ar = parseInt(a.slice(0, 2), 16),
    ag = parseInt(a.slice(2, 4), 16),
    ab = parseInt(a.slice(4, 6), 16);
  const br = parseInt(b.slice(0, 2), 16),
    bg = parseInt(b.slice(2, 4), 16),
    bb = parseInt(b.slice(4, 6), 16);
  const r = Math.round(ar * (1 - weight) + br * weight);
  const g = Math.round(ag * (1 - weight) + bg * weight);
  const bl = Math.round(ab * (1 - weight) + bb * weight);
  return '#' + [r, g, bl].map(x => x.toString(16).padStart(2, '0')).join('');
}
function ScrollSpy() {
  useScrollSpy(['home', 'shop', 'story', 'contact']);
  return null;
}
function Tweaks() {
  const {
    content,
    setContent
  } = useStore();
  const [tweaks, setTweak] = useTweaks({
    accentColor: content.accentColor,
    headingFont: content.headingFont,
    showCmsButton: true,
    sectionSpacing: 100
  });

  // mirror tweaks → content for preview
  React.useEffect(() => {
    if (tweaks.accentColor !== content.accentColor || tweaks.headingFont !== content.headingFont) {
      setContent(c => ({
        ...c,
        accentColor: tweaks.accentColor,
        headingFont: tweaks.headingFont
      }));
    }
  }, [tweaks.accentColor, tweaks.headingFont]);
  React.useEffect(() => {
    document.documentElement.style.setProperty('--section-spacing', `${tweaks.sectionSpacing}px`);
  }, [tweaks.sectionSpacing]);
  React.useEffect(() => {
    document.querySelectorAll('.cms-fab').forEach(el => {
      el.style.display = tweaks.showCmsButton ? '' : 'none';
    });
  }, [tweaks.showCmsButton]);
  return /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    title: "Brand"
  }, /*#__PURE__*/React.createElement(TweakColor, {
    label: "Accent color",
    value: tweaks.accentColor,
    onChange: v => setTweak('accentColor', v)
  }), /*#__PURE__*/React.createElement(TweakSelect, {
    label: "Heading font",
    value: tweaks.headingFont,
    options: ['Playfair Display', 'Inter', 'Georgia', 'Helvetica'],
    onChange: v => setTweak('headingFont', v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    title: "Layout"
  }, /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Section spacing",
    min: 40,
    max: 160,
    step: 10,
    value: tweaks.sectionSpacing,
    onChange: v => setTweak('sectionSpacing', v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    title: "Admin"
  }, /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Show CMS button",
    value: tweaks.showCmsButton,
    onChange: v => setTweak('showCmsButton', v)
  })));
}
function App() {
  return /*#__PURE__*/React.createElement(StoreProvider, null, /*#__PURE__*/React.createElement(ApplyTokens, null), /*#__PURE__*/React.createElement(ScrollSpy, null), /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Shop, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(Contact, null)), /*#__PURE__*/React.createElement(CartDrawer, null), /*#__PURE__*/React.createElement(CmsButton, null), /*#__PURE__*/React.createElement(CmsModal, null), /*#__PURE__*/React.createElement(Tweaks, null));
}
function bootApp() {
  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
    setTimeout(bootApp, 50);
    return;
  }
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
}
bootApp();