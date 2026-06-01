// sections.jsx — Shop, About, Contact

function Shop() {
  const {
    content,
    addToCart,
    country,
    resolveLine,
    fmtLocal
  } = useStore();
  return /*#__PURE__*/React.createElement("section", {
    id: "shop",
    className: "shop",
    "data-screen-label": "02 Shop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Shop the heat"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: `'${content.headingFont}', Georgia, serif`
    }
  }, "Bundle & Save"), /*#__PURE__*/React.createElement("p", null, "One spray transforms any plate. Pick a bundle and bring some fire home.")), /*#__PURE__*/React.createElement("div", {
    className: "product-grid"
  }, content.products.map(p => {
    const r = country ? resolveLine(p) : {
      local: null
    };
    return /*#__PURE__*/React.createElement("article", {
      key: p.id,
      className: "product-card",
      "data-screen-label": `Product · ${p.name}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "product-card-img"
    }, /*#__PURE__*/React.createElement("img", {
      src: p.image,
      alt: p.name
    })), /*#__PURE__*/React.createElement("div", {
      className: "product-card-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "product-card-name"
    }, p.name), /*#__PURE__*/React.createElement("div", {
      className: "product-card-size"
    }, p.size), r.local != null && /*#__PURE__*/React.createElement("div", {
      className: "product-card-price"
    }, fmtLocal(r.local))), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      onClick: () => addToCart(p.id)
    }, "Add to cart"));
  })));
}
function About() {
  const {
    content
  } = useStore();
  const [open, setOpen] = React.useState(false);
  const extraParas = (content.aboutBody || '').split('\n\n').filter(Boolean);
  return /*#__PURE__*/React.createElement("section", {
    id: "story",
    className: "about",
    "data-screen-label": "03 Our Story"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-image"
  }), /*#__PURE__*/React.createElement("div", {
    className: "about-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Our Story"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: `'${content.headingFont}', Georgia, serif`
    }
  }, content.aboutTitle || 'A Heritage in a Bottle'), /*#__PURE__*/React.createElement("p", null, content.aboutIntro), /*#__PURE__*/React.createElement("div", {
    className: `extra ${open ? 'open' : ''}`
  }, extraParas.map((para, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, para)), content.aboutPullquote && /*#__PURE__*/React.createElement("div", {
    className: "pull"
  }, "\"", content.aboutPullquote, "\"")), /*#__PURE__*/React.createElement("button", {
    className: "more-toggle",
    onClick: () => setOpen(o => !o)
  }, open ? 'Less ↑' : 'More ↓'), /*#__PURE__*/React.createElement("div", {
    className: "about-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "100%"), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Natural")), /*#__PURE__*/React.createElement("div", {
    className: "about-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "0"), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Additives")), /*#__PURE__*/React.createElement("div", {
    className: "about-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "\u221E"), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Possibilities"))))));
}
function Contact() {
  const {
    content
  } = useStore();
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    className: "contact",
    "data-screen-label": "04 Contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Get in touch"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: `'${content.headingFont}', Georgia, serif`
    }
  }, "Say hello."), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Wholesale, partnerships, recipes you want us to try \u2014 we read everything. Send us a note any time.")), /*#__PURE__*/React.createElement("div", {
    className: "contact-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Reach us"), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${content.contactEmail}`
  }, content.contactEmail), /*#__PURE__*/React.createElement("p", null, content.contactPhone), /*#__PURE__*/React.createElement("p", null, content.contactAddress)), /*#__PURE__*/React.createElement("div", {
    className: "contact-col"
  }, /*#__PURE__*/React.createElement("h4", null, "TikTok"), /*#__PURE__*/React.createElement("a", {
    href: `https://www.tiktok.com/@${(content.tiktokHandle || 'atachilioil').replace(/^@?(TikTok\.)?/i, '')}`,
    target: "_blank",
    rel: "noopener"
  }, content.tiktokHandle || '@atachilioil'), /*#__PURE__*/React.createElement("a", {
    href: `https://instagram.com/${(content.instagramHandle || '').replace('@', '')}`,
    target: "_blank",
    rel: "noopener",
    style: {
      marginTop: 12
    }
  }, "Instagram ", content.instagramHandle || '@atachillioil'))), /*#__PURE__*/React.createElement("div", {
    className: "copyright"
  }, /*#__PURE__*/React.createElement("div", null, content.footerCopyright || `© ${new Date().getFullYear()} Atachilioil.com All rights reserved.`), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: "#home"
  }, "Back to top \u2191")))));
}
Object.assign(window, {
  Shop,
  About,
  Contact
});