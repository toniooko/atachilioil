// store.jsx — central state for site content + cart + selected country
// Uses localStorage to persist edits and cart between visits.

const STORAGE_KEY = 'ata_site_v6';
const CART_KEY = 'ata_cart_v1';
const COUNTRY_KEY = 'ata_country_v2';
const CMS_AUTH_KEY = 'ata_cms_auth_v1';

// Default password for the CMS demo. Change at runtime via CMS settings.
const CMS_DEFAULT_PASSWORD = 'ata-admin';

// Also clear stale localStorage from old versions when defaults change shape
const STALE_KEYS = ['ata_site_v1', 'ata_site_v2', 'ata_site_v3', 'ata_site_v4', 'ata_site_v5', 'ata_country_v1'];
function loadContent() {
  try {
    STALE_KEYS.forEach(k => localStorage.removeItem(k));
  } catch (e) {}
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Deep-merge so new default fields (e.g. aboutIntro, aboutPullquote) appear
      // even if the stored object predates them.
      return {
        ...window.__ATA_DEFAULTS,
        ...parsed,
        // products / countries: keep stored if present, else defaults
        products: parsed.products || window.__ATA_DEFAULTS.products,
        countries: parsed.countries || window.__ATA_DEFAULTS.countries
      };
    }
  } catch (e) {}
  return window.__ATA_DEFAULTS;
}
function saveContent(content) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (e) {}
}
function loadCart() {
  try {
    const v = localStorage.getItem(CART_KEY);
    if (v) return JSON.parse(v);
  } catch (e) {}
  return [];
}
function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {}
}
function loadCountry() {
  // Returns just the saved country code (or null) — the actual country object
  // is resolved live from current `content.countries` in the provider so that
  // CMS edits to prices / shipping reflect immediately.
  try {
    const v = localStorage.getItem(COUNTRY_KEY);
    if (!v) return null;
    const parsed = JSON.parse(v);
    return parsed?.code || null;
  } catch (e) {}
  return null;
}
function saveCountry(c) {
  try {
    localStorage.setItem(COUNTRY_KEY, JSON.stringify(c ? {
      code: c.code
    } : null));
  } catch (e) {}
}

// All pricing is now MANUAL per country.
// Each country defines: currency, symbol, prices[productId] (local amount),
// and shippingFee (local amount). No automatic conversion.

function isWholeCurrency(ccy) {
  return ccy === 'NGN' || ccy === 'ZAR' || ccy === 'GHS';
}
function formatLocal(country, localAmount) {
  if (!country) return '—';
  const v = localAmount || 0;
  if (isWholeCurrency(country.currency)) {
    return `${country.symbol}${Math.round(v).toLocaleString()}`;
  }
  return `${country.symbol}${v.toFixed(2)}`;
}

// Resolve the local price for a product in a country.
// Returns null if not set — caller should treat as "price on request".
function resolveLineLocal(country, product) {
  if (!country) return {
    local: null
  };
  const raw = country.prices && country.prices[product.id];
  if (raw == null || raw === '') return {
    local: null
  };
  const num = parseFloat(raw);
  if (isNaN(num)) return {
    local: null
  };
  return {
    local: num
  };
}
function resolveShipping(country) {
  if (!country) return 0;
  const raw = country.shippingFee;
  if (raw == null || raw === '') return 0;
  const num = parseFloat(raw);
  return isNaN(num) ? 0 : num;
}
var StoreContext = null;
function getStoreContext() {
  if (!StoreContext) StoreContext = React.createContext(null);
  return StoreContext;
}
function StoreProvider({
  children
}) {
  const Ctx = getStoreContext();
  const [content, setContent] = React.useState(loadContent);
  const [cart, setCart] = React.useState(loadCart);
  const [countryCode, setCountryCode] = React.useState(loadCountry);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cmsOpen, setCmsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('home');

  // Live-resolve the country object from current content.countries so CMS edits
  // to prices/shipping take effect immediately for any selected region.
  const country = React.useMemo(() => (content.countries || []).find(c => c.code === countryCode) || null, [content, countryCode]);
  const setCountry = c => setCountryCode(c ? c.code : null);
  React.useEffect(() => {
    saveContent(content);
  }, [content]);
  React.useEffect(() => {
    saveCart(cart);
  }, [cart]);
  React.useEffect(() => {
    saveCountry(country);
  }, [countryCode]);
  const addToCart = (productId, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === productId);
      if (existing) {
        return prev.map(c => c.id === productId ? {
          ...c,
          qty: c.qty + qty
        } : c);
      }
      return [...prev, {
        id: productId,
        qty
      }];
    });
    setCartOpen(true);
  };
  const updateQty = (productId, qty) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(c => c.id !== productId));
    } else {
      setCart(prev => prev.map(c => c.id === productId ? {
        ...c,
        qty
      } : c));
    }
  };
  const removeItem = productId => {
    setCart(prev => prev.filter(c => c.id !== productId));
  };
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);
  const cartLines = cart.map(c => {
    const product = content.products.find(p => p.id === c.id);
    return product ? {
      ...c,
      product
    } : null;
  }).filter(Boolean);

  // Manual pricing only — totals computed in country's local currency.
  const subtotalLocal = country ? cartLines.reduce((sum, line) => {
    const r = resolveLineLocal(country, line.product);
    return sum + (r.local || 0) * line.qty;
  }, 0) : 0;
  const shippingLocal = country && cartLines.length > 0 ? resolveShipping(country) : 0;
  const totalLocal = subtotalLocal + shippingLocal;

  // Detect missing prices so the UI can warn.
  const missingPrices = country ? cartLines.filter(line => resolveLineLocal(country, line.product).local == null) : [];
  const value = {
    content,
    setContent,
    cart,
    cartLines,
    cartCount,
    addToCart,
    updateQty,
    removeItem,
    clearCart,
    country,
    setCountry,
    subtotalLocal,
    shippingLocal,
    totalLocal,
    missingPrices,
    fmtLocal: local => formatLocal(country, local),
    resolveLine: product => resolveLineLocal(country, product),
    cartOpen,
    setCartOpen,
    cmsOpen,
    setCmsOpen,
    activeSection,
    setActiveSection
  };
  return /*#__PURE__*/React.createElement(Ctx.Provider, {
    value: value
  }, children);
}
const useStore = () => React.useContext(getStoreContext());
Object.assign(window, {
  StoreProvider,
  useStore,
  formatLocal,
  resolveLineLocal,
  resolveShipping,
  CMS_AUTH_KEY,
  CMS_DEFAULT_PASSWORD,
  STORAGE_KEY
});