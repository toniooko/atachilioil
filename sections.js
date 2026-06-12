// cms.jsx — mini content management system, password-protected.

function CmsButton() {
  const {
    setCmsOpen
  } = useStore();
  return /*#__PURE__*/React.createElement("button", {
    className: "cms-fab",
    onClick: () => setCmsOpen(true),
    title: "Edit site content (CMS)"
  }, "\u270E");
}
function CmsModal() {
  const {
    cmsOpen,
    setCmsOpen,
    content,
    setContent
  } = useStore();
  const [authed, setAuthed] = React.useState(() => {
    try {
      return localStorage.getItem(CMS_AUTH_KEY) === '1';
    } catch (e) {
      return false;
    }
  });
  const [tab, setTab] = React.useState('hero');
  const [draft, setDraft] = React.useState(content);
  const [dirty, setDirty] = React.useState(false);
  React.useEffect(() => {
    if (cmsOpen) {
      setDraft(content);
      setDirty(false);
    }
  }, [cmsOpen]);
  if (!cmsOpen) return null;
  const close = () => {
    if (dirty && !confirm('Discard unsaved changes?')) return;
    setCmsOpen(false);
  };
  const save = () => {
    setContent(draft);
    setDirty(false);
    alert('Saved! Changes are stored in your browser. Export anytime to publish.');
  };
  const upd = changes => {
    setDraft(d => ({
      ...d,
      ...changes
    }));
    setDirty(true);
  };
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ata-content.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  const importJson = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const obj = JSON.parse(r.result);
        setDraft(d => ({
          ...d,
          ...obj
        }));
        setDirty(true);
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    r.readAsText(file);
  };
  const reset = () => {
    if (!confirm('Reset all content to defaults? This will discard your edits.')) return;
    setDraft(window.__ATA_DEFAULTS);
    setDirty(true);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "cms-modal",
    onClick: e => {
      if (e.target === e.currentTarget) close();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cms-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cms-head"
  }, /*#__PURE__*/React.createElement("h3", null, "Content Manager"), /*#__PURE__*/React.createElement("button", {
    className: "cart-close",
    onClick: close
  }, "\u2715")), !authed ? /*#__PURE__*/React.createElement(CmsLogin, {
    onAuthed: () => setAuthed(true)
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cms-tabs"
  }, [['hero', 'Hero'], ['products', 'Products'], ['about', 'About'], ['contact', 'Contact'], ['countries', 'Countries & Pricing'], ['data', 'Import / Export']].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: `cms-tab ${tab === k ? 'active' : ''}`,
    onClick: () => setTab(k)
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "cms-body"
  }, tab === 'hero' && /*#__PURE__*/React.createElement(CmsHero, {
    draft: draft,
    upd: upd
  }), tab === 'products' && /*#__PURE__*/React.createElement(CmsProducts, {
    draft: draft,
    upd: upd
  }), tab === 'about' && /*#__PURE__*/React.createElement(CmsAbout, {
    draft: draft,
    upd: upd
  }), tab === 'contact' && /*#__PURE__*/React.createElement(CmsContact, {
    draft: draft,
    upd: upd
  }), tab === 'countries' && /*#__PURE__*/React.createElement(CmsCountries, {
    draft: draft,
    upd: upd
  }), tab === 'data' && /*#__PURE__*/React.createElement(CmsData, {
    draft: draft,
    exportJson: exportJson,
    importJson: importJson,
    reset: reset
  })), /*#__PURE__*/React.createElement("div", {
    className: "cms-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hint"
  }, dirty ? 'Unsaved changes' : 'All changes saved'), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    onClick: close
  }, "Close"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-accent",
    onClick: save,
    disabled: !dirty,
    style: {
      opacity: dirty ? 1 : 0.4
    }
  }, "Save changes"))))));
}
function CmsLogin({
  onAuthed
}) {
  const [pw, setPw] = React.useState('');
  const [err, setErr] = React.useState('');
  const submit = e => {
    e.preventDefault();
    if (pw === CMS_DEFAULT_PASSWORD) {
      try {
        localStorage.setItem(CMS_AUTH_KEY, '1');
      } catch (e) {}
      onAuthed();
    } else {
      setErr('Wrong password.');
    }
  };
  return /*#__PURE__*/React.createElement("form", {
    className: "cms-login",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--ink-soft)',
      marginBottom: 24
    }
  }, "Enter the admin password to edit site content."), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: pw,
    onChange: e => setPw(e.target.value),
    autoFocus: true
  })), err && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--accent)',
      fontSize: 13,
      marginBottom: 12
    }
  }, err), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-accent"
  }, "Sign in"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      marginTop: 24,
      color: 'var(--ink-faint)'
    }
  }, "Default password: ", /*#__PURE__*/React.createElement("code", null, "ata-admin"), " \u2014 change in code (CMS_DEFAULT_PASSWORD)"));
}
function CmsHero({
  draft,
  upd
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Tagline (hero headline)"), /*#__PURE__*/React.createElement("input", {
    value: draft.tagline,
    onChange: e => upd({
      tagline: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Sub-tagline"), /*#__PURE__*/React.createElement("textarea", {
    rows: 2,
    value: draft.subtagline,
    onChange: e => upd({
      subtagline: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Heading font"), /*#__PURE__*/React.createElement("select", {
    value: draft.headingFont,
    onChange: e => upd({
      headingFont: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "Playfair Display"), /*#__PURE__*/React.createElement("option", null, "Inter"), /*#__PURE__*/React.createElement("option", null, "Georgia"), /*#__PURE__*/React.createElement("option", null, "Helvetica"))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Accent color"), /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: draft.accentColor,
    onChange: e => upd({
      accentColor: e.target.value
    }),
    style: {
      width: 80,
      height: 40,
      padding: 2
    }
  })));
}
function CmsProducts({
  draft,
  upd
}) {
  const updProduct = (i, changes) => {
    const products = draft.products.map((p, idx) => idx === i ? {
      ...p,
      ...changes
    } : p);
    upd({
      products
    });
  };
  const handleImage = (i, file) => {
    const r = new FileReader();
    r.onload = () => updProduct(i, {
      image: r.result
    });
    r.readAsDataURL(file);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 18,
      marginBottom: 18,
      borderBottom: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-faint)',
      marginBottom: 12
    }
  }, "Bundle section heading"), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Eyebrow (small label above title)"), /*#__PURE__*/React.createElement("input", {
    value: draft.shopEyebrow ?? '',
    onChange: e => upd({ shopEyebrow: e.target.value })
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Section title"), /*#__PURE__*/React.createElement("input", {
    value: draft.shopTitle ?? '',
    onChange: e => upd({ shopTitle: e.target.value })
  })), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: { marginBottom: 0 }
  }, /*#__PURE__*/React.createElement("label", null, "Section description"), /*#__PURE__*/React.createElement("textarea", {
    rows: 2,
    value: draft.shopDescription ?? '',
    onChange: e => upd({ shopDescription: e.target.value })
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--ink-faint)',
      marginBottom: 16
    }
  }, "Edit product names, sizes, images, and descriptions. Pricing is set per country in the", /*#__PURE__*/React.createElement("strong", null, " Countries & Pricing"), " tab."), draft.products.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: "cms-product"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: p.image,
    alt: ""
  }), /*#__PURE__*/React.createElement("label", {
    className: "btn btn-outline",
    style: {
      padding: '6px 8px',
      fontSize: 10,
      marginTop: 6,
      display: 'block',
      textAlign: 'center'
    }
  }, "Replace", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    style: {
      display: 'none'
    },
    onChange: e => e.target.files?.[0] && handleImage(i, e.target.files[0])
  }))), /*#__PURE__*/React.createElement("div", {
    className: "cms-product-fields"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Name"), /*#__PURE__*/React.createElement("input", {
    value: p.name,
    onChange: e => updProduct(i, {
      name: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Size"), /*#__PURE__*/React.createElement("input", {
    value: p.size,
    onChange: e => updProduct(i, {
      size: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, "Description"), /*#__PURE__*/React.createElement("textarea", {
    rows: 2,
    value: p.description,
    onChange: e => updProduct(i, {
      description: e.target.value
    })
  }))))));
}
function CmsAbout({
  draft,
  upd
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "About title"), /*#__PURE__*/React.createElement("input", {
    value: draft.aboutTitle,
    onChange: e => upd({
      aboutTitle: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Intro paragraph (always visible)"), /*#__PURE__*/React.createElement("textarea", {
    rows: 4,
    value: draft.aboutIntro || '',
    onChange: e => upd({
      aboutIntro: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Expanded body \u2014 shown after \"More\" (blank line = paragraph break)"), /*#__PURE__*/React.createElement("textarea", {
    rows: 12,
    value: draft.aboutBody,
    onChange: e => upd({
      aboutBody: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Pull-quote (optional)"), /*#__PURE__*/React.createElement("input", {
    value: draft.aboutPullquote || '',
    onChange: e => upd({
      aboutPullquote: e.target.value
    })
  })));
}
function CmsContact({
  draft,
  upd
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Email"), /*#__PURE__*/React.createElement("input", {
    value: draft.contactEmail,
    onChange: e => upd({
      contactEmail: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Phone"), /*#__PURE__*/React.createElement("input", {
    value: draft.contactPhone,
    onChange: e => upd({
      contactPhone: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Address"), /*#__PURE__*/React.createElement("input", {
    value: draft.contactAddress,
    onChange: e => upd({
      contactAddress: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Instagram handle"), /*#__PURE__*/React.createElement("input", {
    value: draft.instagramHandle,
    onChange: e => upd({
      instagramHandle: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Shipping note"), /*#__PURE__*/React.createElement("textarea", {
    rows: 2,
    value: draft.shippingNote,
    onChange: e => upd({
      shippingNote: e.target.value
    })
  })));
}
function CmsCountries({
  draft,
  upd
}) {
  const updC = (i, changes) => {
    const countries = draft.countries.map((c, idx) => idx === i ? {
      ...c,
      ...changes
    } : c);
    upd({
      countries
    });
  };
  const updPrice = (i, productId, val) => {
    const country = draft.countries[i];
    const prices = {
      ...(country.prices || {})
    };
    if (val === '' || val == null) delete prices[productId];else prices[productId] = val;
    updC(i, {
      prices
    });
  };
  const removeC = i => upd({
    countries: draft.countries.filter((_, idx) => idx !== i)
  });
  const addC = () => {
    upd({
      countries: [...draft.countries, {
        code: 'XX',
        name: 'New',
        currency: 'USD',
        symbol: '$',
        payments: ['Stripe'],
        prices: {},
        shippingFee: 0
      }]
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--ink-faint)',
      marginBottom: 8
    }
  }, "Set a manual price for each product, in each country, in that country's local currency. Leave a price blank to hide that product for that region. Prices are ", /*#__PURE__*/React.createElement("strong", null, "not"), " auto-converted \u2014 what you type is what the customer pays."), draft.countries.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '14px',
      border: '1px solid var(--line)',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '60px 1fr 110px 1.4fr 30px',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: c.code,
    onChange: e => updC(i, {
      code: e.target.value
    }),
    placeholder: "Code"
  }), /*#__PURE__*/React.createElement("input", {
    value: c.name,
    onChange: e => updC(i, {
      name: e.target.value
    }),
    placeholder: "Name"
  }), /*#__PURE__*/React.createElement("input", {
    value: `${c.symbol} ${c.currency}`,
    onChange: e => {
      const parts = e.target.value.split(' ');
      updC(i, {
        symbol: parts[0] || '',
        currency: parts[1] || c.currency
      });
    },
    placeholder: "Sym CCY"
  }), /*#__PURE__*/React.createElement("input", {
    value: (c.payments || []).join(','),
    onChange: e => updC(i, {
      payments: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
    }),
    placeholder: "Payments (comma)"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => removeC(i),
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--accent)',
      fontSize: 16
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      paddingTop: 10,
      borderTop: '1px dashed var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-faint)',
      marginBottom: 6
    }
  }, "Prices in ", c.currency, " (", c.symbol, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${draft.products.length + 1}, 1fr)`,
      gap: 8
    }
  }, draft.products.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: "field",
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      textTransform: 'none',
      letterSpacing: '0.04em',
      fontSize: 11
    }
  }, p.name), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    placeholder: `${c.symbol} —`,
    value: c.prices?.[p.id] ?? '',
    onChange: e => updPrice(i, p.id, e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      textTransform: 'none',
      letterSpacing: '0.04em',
      fontSize: 11,
      fontWeight: 700,
      color: 'var(--accent)'
    }
  }, "Shipping"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    placeholder: `${c.symbol} 0 = free`,
    value: c.shippingFee ?? '',
    onChange: e => updC(i, {
      shippingFee: e.target.value
    })
  })))))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    onClick: addC,
    style: {
      marginTop: 12
    }
  }, "+ Add country"));
}
function CmsData({
  draft,
  exportJson,
  importJson,
  reset
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--heading)',
      fontSize: 18,
      marginBottom: 8
    }
  }, "Backup & restore"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--ink-soft)',
      marginBottom: 16
    }
  }, "Export your edits as a JSON file you can keep, share, or paste into the source HTML to make them permanent."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: exportJson
  }, "Export content as JSON"), /*#__PURE__*/React.createElement("label", {
    className: "btn btn-outline",
    style: {
      margin: 0
    }
  }, "Import JSON\u2026", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "application/json",
    style: {
      display: 'none'
    },
    onChange: importJson
  }))), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--heading)',
      fontSize: 18,
      marginBottom: 8
    }
  }, "Reset"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--ink-soft)',
      marginBottom: 12
    }
  }, "Restore everything to the original content shipped with the site."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    onClick: reset
  }, "Reset to defaults"), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--heading)',
      fontSize: 18,
      marginTop: 32,
      marginBottom: 8
    }
  }, "How publishing works"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--ink-soft)'
    }
  }, "Edits live in your browser's storage. To publish them to all visitors permanently, export the JSON, paste it into the ", /*#__PURE__*/React.createElement("code", null, "__ATA_DEFAULTS"), " block at the top of ", /*#__PURE__*/React.createElement("code", null, "index.html"), ", then re-upload to your host."));
}
Object.assign(window, {
  CmsButton,
  CmsModal
});