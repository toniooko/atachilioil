// components.jsx — Navbar + section wrappers + small bits

function Navbar() {
  const {
    cartCount,
    setCartOpen,
    activeSection
  } = useStore();
  const link = (id, label) => /*#__PURE__*/React.createElement("a", {
    href: `#${id}`,
    className: activeSection === id ? 'active' : '',
    onClick: e => {

      // smooth scroll handled by CSS scroll-behavior
    }
  }, label);
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#home",
    className: "nav-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "logo.png",
    alt: "AT\xC1"
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, link('story', 'Our Story'), link('shop', 'Shop All'), link('contact', 'Contact'), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "nav-cart",
    onClick: e => {
      e.preventDefault();
      setCartOpen(true);
    }
  }, "Cart (", cartCount, ")"))));
}
function Hero() {
  const {
    content,
    setActiveSection
  } = useStore();
  return /*#__PURE__*/React.createElement("section", {
    id: "home",
    className: "hero",
    "data-screen-label": "01 Home"
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: `'${content.headingFont || 'Playfair Display'}', Georgia, serif`,
      fontSize: "40px"
    }
  }, content.tagline || 'A Burst of Spicy Goodness'), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, content.subtagline), /*#__PURE__*/React.createElement("div", {
    className: "hero-image"
  }, /*#__PURE__*/React.createElement("img", {
    src: "hero-bottle.png",
    alt: "AT\xC1 chili oil bottle"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#shop",
    className: "btn btn-primary"
  }, "Shop the bottle"), /*#__PURE__*/React.createElement("a", {
    href: "#story",
    className: "btn btn-outline"
  }, "Our story")));
}

// scroll-spy hook used by App
function useScrollSpy(ids) {
  const {
    setActiveSection
  } = useStore();
  React.useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      // Pick the entry with highest intersection ratio that's visible
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length > 0) {
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveSection(visible[0].target.id);
      }
    }, {
      rootMargin: '-30% 0px -50% 0px',
      threshold: [0.05, 0.2, 0.5]
    });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
}
Object.assign(window, {
  Navbar,
  Hero,
  useScrollSpy
});