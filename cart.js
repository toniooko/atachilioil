// cart.jsx — Cart drawer with country picker, cart, checkout, success

function CartDrawer() {
  const s = useStore();
  const {
    cartOpen,
    setCartOpen,
    cartLines,
    country,
    setCountry,
    content,
    updateQty,
    removeItem,
    clearCart
  } = s;

  // step: 'country' (if no country yet & cart has items) | 'cart' | 'checkout' | 'success'
  const [step, setStep] = React.useState('cart');
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const [orderInfo, setOrderInfo] = React.useState(null);
  React.useEffect(() => {
    if (cartOpen) {
      // fresh open
      if (cartLines.length === 0) setStep('cart');else if (!country) setStep('country');else setStep('cart');
    }
  }, [cartOpen]);
  const close = () => setCartOpen(false);
  const goCheckout = () => {
    if (!country) {
      setStep('country');
      return;
    }
    setPaymentMethod(country.payments[0]);
    setStep('checkout');
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: `cart-overlay ${cartOpen ? 'open' : ''}`,
    onClick: close
  }), /*#__PURE__*/React.createElement("aside", {
    className: `cart-drawer ${cartOpen ? 'open' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "cart-head"
  }, /*#__PURE__*/React.createElement("h3", null, step === 'country' && 'Choose region', step === 'cart' && 'Your bag', step === 'checkout' && 'Checkout', step === 'success' && 'Order placed'), /*#__PURE__*/React.createElement("button", {
    className: "cart-close",
    onClick: close,
    "aria-label": "Close cart"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "cart-body"
  }, step === 'country' && /*#__PURE__*/React.createElement(CountryStep, {
    onPicked: () => setStep('cart')
  }), step === 'cart' && /*#__PURE__*/React.createElement(CartStep, {
    onCheckout: goCheckout
  }), step === 'checkout' && /*#__PURE__*/React.createElement(CheckoutStep, {
    paymentMethod: paymentMethod,
    setPaymentMethod: setPaymentMethod,
    onComplete: info => {
      setOrderInfo(info);
      clearCart();
      setStep('success');
    },
    onBack: () => setStep('cart')
  }), step === 'success' && /*#__PURE__*/React.createElement(SuccessStep, {
    orderInfo: orderInfo,
    onClose: close
  }))));
}
function CountryStep({
  onPicked
}) {
  const {
    content,
    setCountry
  } = useStore();
  return /*#__PURE__*/React.createElement("div", {
    className: "cart-step"
  }, /*#__PURE__*/React.createElement("h4", null, "Where are you ordering from?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--ink-soft)',
      marginTop: -8,
      marginBottom: 18
    }
  }, "Prices and payment options will adjust to match your country."), /*#__PURE__*/React.createElement("div", {
    className: "country-grid"
  }, content.countries.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.code,
    className: "country-pick",
    onClick: () => {
      setCountry(c);
      onPicked();
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, c.name), /*#__PURE__*/React.createElement("div", {
    className: "ccy"
  }, c.currency, " \xB7 ", c.payments.join(' / '))), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, c.symbol)))));
}
function CartStep({
  onCheckout
}) {
  const {
    cartLines,
    fmtLocal,
    resolveLine,
    updateQty,
    removeItem,
    country,
    setCountry,
    subtotalLocal,
    shippingLocal,
    totalLocal,
    missingPrices,
    setCartOpen
  } = useStore();
  if (cartLines.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "cart-empty"
    }, /*#__PURE__*/React.createElement("p", null, "Your bag is empty."), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      onClick: () => {
        setCartOpen(false);
        setTimeout(() => document.getElementById('shop')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        }), 200);
      }
    }, "Shop the bottle"));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, country && /*#__PURE__*/React.createElement("div", {
    className: "country-banner"
  }, /*#__PURE__*/React.createElement("div", null, "Shipping to ", /*#__PURE__*/React.createElement("strong", null, country.name), " \xB7 prices in ", country.currency), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCountry(null)
  }, "Change")), country && missingPrices.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      background: '#fff4e8',
      border: '1px solid #f0c48a',
      fontSize: 13,
      marginBottom: 14,
      color: '#7a4a00'
    }
  }, "\u26A0 No price set for ", /*#__PURE__*/React.createElement("strong", null, missingPrices.map(l => l.product.name).join(', ')), " in ", country.name, ". Set it in the CMS \u2192 Countries & Pricing tab."), /*#__PURE__*/React.createElement("div", {
    className: "cart-lines"
  }, cartLines.map(line => {
    const r = resolveLine(line.product);
    const lineLocal = (r.local || 0) * line.qty;
    return /*#__PURE__*/React.createElement("div", {
      key: line.id,
      className: "cart-line"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cart-line-img"
    }, /*#__PURE__*/React.createElement("img", {
      src: line.product.image,
      alt: line.product.name
    })), /*#__PURE__*/React.createElement("div", {
      className: "cart-line-info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "name"
    }, line.product.name), /*#__PURE__*/React.createElement("div", {
      className: "meta"
    }, line.product.size), /*#__PURE__*/React.createElement("div", {
      className: "cart-line-qty"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => updateQty(line.id, line.qty - 1)
    }, "\u2212"), /*#__PURE__*/React.createElement("span", {
      className: "q"
    }, line.qty), /*#__PURE__*/React.createElement("button", {
      onClick: () => updateQty(line.id, line.qty + 1)
    }, "+"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "cart-line-price"
    }, country ? r.local != null ? fmtLocal(lineLocal) : '—' : 'Pick country'), /*#__PURE__*/React.createElement("button", {
      className: "cart-line-remove",
      onClick: () => removeItem(line.id)
    }, "Remove")));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 20
    }
  }), /*#__PURE__*/React.createElement(FootSummary, {
    onCheckout: onCheckout
  }));
}
function FootSummary({
  onCheckout
}) {
  const {
    fmtLocal,
    country,
    subtotalLocal,
    shippingLocal,
    totalLocal,
    missingPrices
  } = useStore();
  const ready = !!country && missingPrices.length === 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "cart-foot",
    style: {
      margin: '0 -28px -1px',
      position: 'sticky',
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cart-totals"
  }, /*#__PURE__*/React.createElement("span", null, "Subtotal"), /*#__PURE__*/React.createElement("span", null, country ? fmtLocal(subtotalLocal) : '—')), /*#__PURE__*/React.createElement("div", {
    className: "cart-totals"
  }, /*#__PURE__*/React.createElement("span", null, "Shipping"), /*#__PURE__*/React.createElement("span", null, country ? shippingLocal === 0 ? 'Free' : fmtLocal(shippingLocal) : '—')), /*#__PURE__*/React.createElement("div", {
    className: "cart-totals total"
  }, /*#__PURE__*/React.createElement("span", null, "Total"), /*#__PURE__*/React.createElement("span", null, country ? fmtLocal(totalLocal) : '—')), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-accent btn-block",
    onClick: onCheckout,
    disabled: !ready,
    style: {
      opacity: ready ? 1 : 0.5,
      cursor: ready ? 'pointer' : 'not-allowed'
    }
  }, country ? 'Continue to checkout' : 'Choose region & checkout'));
}
function CheckoutStep({
  paymentMethod,
  setPaymentMethod,
  onComplete,
  onBack
}) {
  const {
    country,
    totalLocal,
    fmtLocal,
    content,
    cartLines
  } = useStore();
  const totalDisplay = fmtLocal(totalLocal);
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postal: ''
  });
  const upd = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const valid = form.name && form.email && form.address && form.city;
  const submit = e => {
    e.preventDefault();
    if (!valid) return;
    // mock submit; in production this hits Stripe / Paystack
    onComplete({
      ...form,
      payment: paymentMethod,
      total: totalDisplay,
      country: country.name,
      orderId: 'ATA-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    });
  };
  return /*#__PURE__*/React.createElement("form", {
    className: "cart-step",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onBack,
    style: {
      background: 'none',
      border: 'none',
      fontSize: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--ink-faint)',
      padding: 0,
      marginBottom: 16
    }
  }, "\u2190 Back to bag"), /*#__PURE__*/React.createElement("h4", null, "Delivery details"), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Full name"), /*#__PURE__*/React.createElement("input", {
    value: form.name,
    onChange: e => upd('name', e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: form.email,
    onChange: e => upd('email', e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Street address"), /*#__PURE__*/React.createElement("input", {
    value: form.address,
    onChange: e => upd('address', e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "City"), /*#__PURE__*/React.createElement("input", {
    value: form.city,
    onChange: e => upd('city', e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Postal code"), /*#__PURE__*/React.createElement("input", {
    value: form.postal,
    onChange: e => upd('postal', e.target.value)
  }))), /*#__PURE__*/React.createElement("h4", {
    style: {
      marginTop: 18
    }
  }, "Payment (", country.currency, ")"), /*#__PURE__*/React.createElement("div", {
    className: "payment-options"
  }, country.payments.map(p => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: p,
    className: `payment-pick ${paymentMethod === p ? 'selected' : ''}`,
    onClick: () => setPaymentMethod(p)
  }, /*#__PURE__*/React.createElement("span", {
    className: "pip"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, p), " \xB7 ", paymentDescription(p))))), /*#__PURE__*/React.createElement("div", {
    className: "cart-foot",
    style: {
      margin: '24px -28px -1px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cart-totals total"
  }, /*#__PURE__*/React.createElement("span", null, "Total"), /*#__PURE__*/React.createElement("span", null, totalDisplay)), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-accent btn-block",
    disabled: !valid,
    style: {
      opacity: valid ? 1 : 0.4,
      cursor: valid ? 'pointer' : 'not-allowed'
    }
  }, "Place order via ", paymentMethod), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      textAlign: 'center',
      marginTop: 10,
      color: 'var(--ink-faint)',
      letterSpacing: '0.04em'
    }
  }, "Demo checkout \u2014 wire to ", paymentMethod, " on deployment.")));
}
function paymentDescription(method) {
  if (method === 'Paystack') return 'cards, bank transfer, USSD';
  if (method === 'Stripe') return 'cards worldwide';
  if (method === 'PayPal') return 'PayPal balance or card';
  if (method === 'Flutterwave') return 'cards, mobile money';
  return '';
}
function SuccessStep({
  orderInfo,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "success"
  }, /*#__PURE__*/React.createElement("div", {
    className: "check"
  }, "\u2713"), /*#__PURE__*/React.createElement("h3", null, "Thank you, ", orderInfo?.name?.split(' ')[0] || 'friend', "!"), /*#__PURE__*/React.createElement("p", null, "Order ", /*#__PURE__*/React.createElement("strong", null, orderInfo?.orderId), " placed.", /*#__PURE__*/React.createElement("br", null), "We've sent a receipt to ", orderInfo?.email, ".", /*#__PURE__*/React.createElement("br", null), "Total charged: ", /*#__PURE__*/React.createElement("strong", null, orderInfo?.total), " via ", orderInfo?.payment, "."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onClose
  }, "Continue browsing"));
}
Object.assign(window, {
  CartDrawer
});