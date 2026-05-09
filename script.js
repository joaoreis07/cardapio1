const PRODUCT_KEY = "produtos";
const CART_KEY = "carrinho";
const PHONE_KEY = "telefone";
const DRINKS_SEEDED_KEY = "refrigerantesSeeded";

const page = document.body.dataset.page;
const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const fallbackImage =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop stop-color="#fff2df"/>
        <stop offset="1" stop-color="#f36f21"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#g)"/>
    <circle cx="400" cy="250" r="110" fill="#fff8ef" opacity=".9"/>
    <rect x="235" y="340" width="330" height="70" rx="35" fill="#211713"/>
    <rect x="260" y="310" width="280" height="55" rx="28" fill="#f7c66b"/>
    <text x="400" y="485" text-anchor="middle" font-family="Arial" font-size="42" font-weight="700" fill="#211713">Sabor da Casa</text>
  </svg>`);

const removalOptions = ["sem cebola", "sem tomate", "sem alface", "sem milho", "sem molho"];
const addOnGroups = [
  {
    name: "Queijos",
    items: [
      { name: "Mussarela", price: 2 },
      { name: "Cheddar", price: 3 }
    ]
  },
  {
    name: "Proteínas",
    items: [
      { name: "Hambúrguer extra", price: 5 },
      { name: "Bacon", price: 4 },
      { name: "Ovo", price: 2 }
    ]
  },
  {
    name: "Complementos",
    items: [{ name: "Batata palha", price: 2 }]
  },
  {
    name: "Molhos",
    items: [
      { name: "Maionese da casa", price: 1.5 },
      { name: "Ketchup", price: 1 },
      { name: "Mostarda", price: 1 },
      { name: "Molho especial", price: 2 }
    ]
  }
];

const drinkImage =
  "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=80";

const drinkColors = {
  "Coca-Cola": ["#c91518", "#5b0b0d"],
  "Coca-Cola Zero": ["#171717", "#c91518"],
  "Guaraná Antarctica": ["#1f9d55", "#f6d365"],
  "Guaraná Antarctica Zero": ["#0f5132", "#171717"],
  "Fanta Laranja": ["#ff7a18", "#ffd166"],
  "Fanta Uva": ["#7b2cbf", "#f3c4fb"],
  Sprite: ["#16a34a", "#7dd3fc"],
  "Sprite Zero": ["#0f766e", "#f8fafc"],
  Pepsi: ["#0b5ed7", "#ef233c"],
  "Pepsi Black": ["#111827", "#0b5ed7"],
  "Schweppes Citrus": ["#facc15", "#15803d"],
  "Schweppes Tônica": ["#f8fafc", "#d4af37"],
  "Sukita Laranja": ["#fb8500", "#ffb703"],
  "Dolly Guaraná": ["#22c55e", "#facc15"]
};

function makeDrinkImage(name, size) {
  const [primary, secondary] = drinkColors[name] || ["#f36f21", "#1f9d55"];
  const safeName = escapeSvg(name);
  const safeSize = escapeSvg(size.toUpperCase());
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 675">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="${primary}"/>
          <stop offset="1" stop-color="${secondary}"/>
        </linearGradient>
      </defs>
      <rect width="900" height="675" fill="#fff8ef"/>
      <rect x="56" y="56" width="788" height="563" rx="42" fill="url(#bg)"/>
      <circle cx="710" cy="164" r="98" fill="#ffffff" opacity=".16"/>
      <circle cx="182" cy="510" r="132" fill="#ffffff" opacity=".12"/>
      <rect x="350" y="106" width="200" height="420" rx="64" fill="#ffffff" opacity=".92"/>
      <rect x="376" y="158" width="148" height="278" rx="34" fill="${primary}"/>
      <rect x="376" y="252" width="148" height="94" fill="${secondary}" opacity=".88"/>
      <rect x="386" y="452" width="128" height="36" rx="18" fill="#d9edf7"/>
      <text x="450" y="292" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="800" fill="#ffffff">${safeName}</text>
      <text x="450" y="345" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" fill="#ffffff">${safeSize}</text>
      <text x="450" y="582" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="800" fill="#ffffff">Sabor da Casa</text>
    </svg>`;

  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function escapeSvg(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function makeDrinkProducts(subcategory, size, price, names) {
  return names.map((name) => ({
    id: crypto.randomUUID(),
    name: `${name} ${size}`,
    price,
    description: `Refrigerante ${name} gelado, embalagem ${size}.`,
    category: "Refrigerantes",
    subcategory,
    removals: [],
    addOnGroups: [],
    image: makeDrinkImage(name, size)
  }));
}

const drinkProducts = [
  ...makeDrinkProducts("Lata", "lata 350ml", 6, [
    "Coca-Cola",
    "Coca-Cola Zero",
    "Guaraná Antarctica",
    "Guaraná Antarctica Zero",
    "Fanta Laranja",
    "Fanta Uva",
    "Sprite",
    "Sprite Zero",
    "Pepsi",
    "Pepsi Black",
    "Schweppes Citrus",
    "Schweppes Tônica"
  ]),
  ...makeDrinkProducts("1 Litro", "1 litro", 10, [
    "Coca-Cola",
    "Coca-Cola Zero",
    "Guaraná Antarctica",
    "Fanta Laranja",
    "Fanta Uva",
    "Sprite",
    "Pepsi"
  ]),
  ...makeDrinkProducts("2 Litros", "2 litros", 14, [
    "Coca-Cola",
    "Coca-Cola Zero",
    "Guaraná Antarctica",
    "Guaraná Antarctica Zero",
    "Fanta Laranja",
    "Fanta Uva",
    "Sprite",
    "Pepsi",
    "Sukita Laranja",
    "Dolly Guaraná"
  ])
];

const sampleProducts = [
  {
    id: crypto.randomUUID(),
    name: "X-Burguer",
    price: 12,
    description: "Pão brioche, hambúrguer artesanal, queijo e molho da casa.",
    category: "Lanches",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: crypto.randomUUID(),
    name: "X-Salada",
    price: 14,
    description: "Hambúrguer, queijo, alface, tomate, milho e maionese.",
    category: "Lanches",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: crypto.randomUUID(),
    name: "X-Bacon",
    price: 16,
    description: "Hambúrguer, queijo derretido, bacon crocante e salada.",
    category: "Lanches",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: crypto.randomUUID(),
    name: "X-Tudo",
    price: 22,
    description: "Hambúrguer, bacon, ovo, queijo, presunto, salada, milho e molho especial.",
    category: "Lanches",
    image: "https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?auto=format&fit=crop&w=900&q=80"
  },
  ...drinkProducts
];

function getProducts() {
  const products = JSON.parse(localStorage.getItem(PRODUCT_KEY) || "[]");
  if (products.length) return seedDrinkProductsOnce(normalizeDrinkCategories(products));
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(sampleProducts));
  localStorage.setItem(DRINKS_SEEDED_KEY, "true");
  return sampleProducts;
}

function seedDrinkProductsOnce(products) {
  if (localStorage.getItem(DRINKS_SEEDED_KEY) === "true") return products;

  const productKeys = new Set(products.map((product) => `${product.category}|${product.subcategory || ""}|${product.name}`.toLowerCase()));
  const missingDrinks = drinkProducts.filter((product) => !productKeys.has(`${product.category}|${product.subcategory || ""}|${product.name}`.toLowerCase()));
  const updatedProducts = [...products, ...missingDrinks];

  saveProducts(updatedProducts);
  localStorage.setItem(DRINKS_SEEDED_KEY, "true");
  return updatedProducts;
}

function normalizeDrinkCategories(products) {
  let changed = false;
  const normalizedProducts = products.map((product) => {
    const subcategory = getDrinkSubcategory(product);
    if (!subcategory) return product;

    const normalizedProduct = {
      ...product,
      category: "Refrigerantes",
      subcategory,
      image: shouldReplaceDrinkImage(product) ? makeDrinkImage(getDrinkBaseName(product), getDrinkSizeLabel(subcategory)) : product.image
    };

    if (
      product.category !== normalizedProduct.category ||
      product.subcategory !== normalizedProduct.subcategory ||
      product.image !== normalizedProduct.image
    ) {
      changed = true;
    }

    return normalizedProduct;
  });

  if (changed) saveProducts(normalizedProducts);
  return normalizedProducts;
}

function shouldReplaceDrinkImage(product) {
  return !product.image || product.image === drinkImage;
}

function getDrinkBaseName(product) {
  return String(product.name || "")
    .replace(/\s*lata\s*350ml$/i, "")
    .replace(/\s*1\s*litro$/i, "")
    .replace(/\s*2\s*litros$/i, "")
    .trim();
}

function getDrinkSizeLabel(subcategory) {
  if (subcategory === "Lata") return "lata 350ml";
  if (subcategory === "1 Litro") return "1 litro";
  if (subcategory === "2 Litros") return "2 litros";
  return subcategory;
}

function saveProducts(products) {
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
}

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatPrice(value) {
  return money.format(Number(value || 0));
}

function cleanPhone(value) {
  return String(value || "").replace(/\D/g, "");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function productImage(product) {
  return product.image || fallbackImage;
}

function getDisplayCategory(product) {
  return getDrinkSubcategory(product) ? "Refrigerantes" : product.category || "Outros";
}

function getDrinkSubcategory(product) {
  if (product.subcategory) return product.subcategory;
  if (product.category === "Refrigerante Lata") return "Lata";
  if (product.category === "Refrigerante 1 Litro") return "1 Litro";
  if (product.category === "Refrigerante 2 Litros") return "2 Litros";
  return "";
}

function getProductRemovals(product) {
  return Array.isArray(product.removals) ? product.removals : removalOptions;
}

function getProductAddOnGroups(product) {
  return Array.isArray(product.addOnGroups) ? product.addOnGroups : addOnGroups;
}

// Cardápio do cliente
if (page === "menu") {
  initMenu();
}

function initMenu() {
  let selectedCategory = "Todos";
  let selectedDrinkSubcategory = "Todos";

  const categoryTabs = document.getElementById("categoryTabs");
  const productsArea = document.getElementById("productsArea");
  const cartDrawer = document.getElementById("cartDrawer");
  const productModal = document.getElementById("productModal");

  document.getElementById("openCart").addEventListener("click", () => cartDrawer.classList.add("open"));
  document.getElementById("closeCart").addEventListener("click", () => cartDrawer.classList.remove("open"));
  document.getElementById("checkoutBtn").addEventListener("click", checkoutWhatsApp);
  document.getElementById("closeProductModal").addEventListener("click", closeProductModal);
  productModal.addEventListener("click", (event) => {
    if (event.target === productModal) closeProductModal();
  });

  renderMenu();
  renderCart();

  function renderMenu() {
    const products = getProducts();
    const categories = ["Todos", ...new Set(products.map(getDisplayCategory))];

    categoryTabs.innerHTML = categories
      .map((category) => `<button class="${category === selectedCategory ? "active" : ""}" data-category="${category}">${category}</button>`)
      .join("");

    categoryTabs.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;
        selectedDrinkSubcategory = "Todos";
        renderMenu();
      });
    });

    const visibleProducts = getVisibleProducts(products, selectedCategory, selectedDrinkSubcategory);

    const groupedProducts = groupByCategory(visibleProducts);
    const drinkSubcategoryMarkup = selectedCategory === "Refrigerantes" ? renderDrinkSubcategories(products) : "";

    productsArea.innerHTML = drinkSubcategoryMarkup + Object.entries(groupedProducts)
      .map(([category, items]) => {
        const cards = items
          .map(
            (product) => `
            <article class="product-card">
              <img src="${productImage(product)}" alt="${product.name}" loading="lazy">
              <div class="product-body">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price-row">
                  <strong class="price">${formatPrice(product.price)}</strong>
                  <button class="primary-button add-product" data-id="${product.id}" type="button">Adicionar</button>
                </div>
              </div>
            </article>`
          )
          .join("");
        return `<h2 class="category-title">${category}</h2><div class="product-grid">${cards}</div>`;
      })
      .join("");

    productsArea.querySelectorAll(".subcategory-tabs button").forEach((button) => {
      button.addEventListener("click", () => {
        selectedDrinkSubcategory = button.dataset.subcategory;
        renderMenu();
      });
    });

    productsArea.querySelectorAll(".add-product").forEach((button) => {
      button.addEventListener("click", () => openProductModal(button.dataset.id));
    });
  }

  function renderDrinkSubcategories(products) {
    const subcategories = [
      "Todos",
      ...new Set(products.filter((product) => getDisplayCategory(product) === "Refrigerantes").map(getDrinkSubcategory).filter(Boolean))
    ];

    return `
      <div class="subcategory-tabs" aria-label="Tipos de refrigerante">
        ${subcategories
          .map(
            (subcategory) =>
              `<button class="${subcategory === selectedDrinkSubcategory ? "active" : ""}" data-subcategory="${subcategory}" type="button">${subcategory}</button>`
          )
          .join("")}
      </div>`;
  }
}

function getVisibleProducts(products, selectedCategory, selectedDrinkSubcategory) {
  if (selectedCategory === "Todos") return products;

  return products.filter((product) => {
    const displayCategory = getDisplayCategory(product);
    if (displayCategory !== selectedCategory) return false;
    if (selectedCategory !== "Refrigerantes" || selectedDrinkSubcategory === "Todos") return true;
    return getDrinkSubcategory(product) === selectedDrinkSubcategory;
  });
}

function limitProductsForAllView(products, selectedCategory) {
  if (selectedCategory !== "Todos") return products;

  const categoryCounts = {};
  return products.filter((product) => {
    const category = getDisplayCategory(product);
    categoryCounts[category] = categoryCounts[category] || 0;
    categoryCounts[category] += 1;
    return categoryCounts[category] <= 3;
  });
}

function groupByCategory(products) {
  return products.reduce((groups, product) => {
    const category = getDisplayCategory(product);
    groups[category] = groups[category] || [];
    groups[category].push(product);
    return groups;
  }, {});
}

function openProductModal(productId) {
  const product = getProducts().find((item) => item.id === productId);
  if (!product) return;

  const modal = document.getElementById("productModal");
  const content = document.getElementById("modalContent");
  document.getElementById("modalTitle").textContent = product.name;

  const productRemovals = getProductRemovals(product);
  const productAddOnGroups = getProductAddOnGroups(product);

  const removalMarkup = productRemovals
    .map(
      (name) => `
      <div class="check-row">
        <label><input type="checkbox" name="remove" value="${name}"> ${capitalize(name)}</label>
        <span>grátis</span>
      </div>`
    )
    .join("");

  const addOnMarkup = productAddOnGroups
    .map(
      (group) => `
      <div class="option-group">
        <h3>${group.name}</h3>
        <div class="option-list">
          ${group.items
            .map(
              (item) => `
              <div class="check-row">
                <label><input type="checkbox" name="addon" value="${item.name}" data-price="${item.price}"> ${item.name}</label>
                <span>+ ${formatPrice(item.price)}</span>
              </div>`
            )
            .join("")}
        </div>
      </div>`
    )
    .join("");
  const removalSection = productRemovals.length
    ? `
      <div class="option-group">
        <h3>Remover ingredientes</h3>
        <div class="option-list">${removalMarkup}</div>
      </div>`
    : "";

  content.innerHTML = `
    <img class="modal-product-image" src="${productImage(product)}" alt="${product.name}">
    <form class="custom-area" id="customForm">
      ${removalSection}
      ${addOnMarkup}
      <label class="option-group">
        <h3>Observação</h3>
        <textarea id="itemNote" rows="4" placeholder="Ex: ponto da carne, molho separado, retirar guardanapo..."></textarea>
      </label>
      <button class="primary-button" type="submit">Adicionar ao carrinho</button>
    </form>`;

  document.getElementById("customForm").addEventListener("submit", (event) => {
    event.preventDefault();
    addCustomizedProduct(product);
  });

  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add("open"));
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  modal.classList.remove("open");
  setTimeout(() => {
    modal.hidden = true;
    document.getElementById("modalContent").innerHTML = "";
  }, 180);
}

function addCustomizedProduct(product) {
  const removed = [...document.querySelectorAll('input[name="remove"]:checked')].map((input) => input.value);
  const addons = [...document.querySelectorAll('input[name="addon"]:checked')].map((input) => ({
    name: input.value,
    price: Number(input.dataset.price)
  }));
  const note = document.getElementById("itemNote").value.trim();
  const itemTotal = product.price + addons.reduce((sum, addon) => sum + addon.price, 0);

  const cart = getCart();
  cart.push({
    id: crypto.randomUUID(),
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.image || "",
    removed,
    addons,
    note,
    quantity: 1,
    unitTotal: itemTotal
  });

  saveCart(cart);
  renderCart();
  closeProductModal();
  showToast("Produto adicionado ao carrinho");
}

function renderCart() {
  const cart = getCart();
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartCount || !cartTotal) return;

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.unitTotal * item.quantity, 0);
  cartCount.textContent = totalQuantity;
  cartTotal.textContent = formatPrice(totalPrice);

  if (!cart.length) {
    cartItems.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <article class="cart-item">
        <div class="price-row">
          <h3>${item.name}</h3>
          <button class="remove-item" data-id="${item.id}" type="button" aria-label="Remover item">×</button>
        </div>
        ${item.addons.length ? `<p>Adicionais: ${item.addons.map((addon) => `${addon.name} (${formatPrice(addon.price)})`).join(", ")}</p>` : ""}
        ${item.removed.length ? `<p>Remover: ${item.removed.join(", ")}</p>` : ""}
        ${item.note ? `<p>Obs: ${item.note}</p>` : ""}
        <div class="cart-actions">
          <div class="qty-control">
            <button data-id="${item.id}" data-action="minus" type="button">−</button>
            <strong>${item.quantity}</strong>
            <button data-id="${item.id}" data-action="plus" type="button">+</button>
          </div>
          <strong class="price">${formatPrice(item.unitTotal * item.quantity)}</strong>
        </div>
      </article>`
    )
    .join("");

  cartItems.querySelectorAll(".qty-control button").forEach((button) => {
    button.addEventListener("click", () => changeQuantity(button.dataset.id, button.dataset.action));
  });

  cartItems.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => removeCartItem(button.dataset.id));
  });
}

function changeQuantity(itemId, action) {
  const cart = getCart()
    .map((item) => {
      if (item.id !== itemId) return item;
      return { ...item, quantity: action === "plus" ? item.quantity + 1 : item.quantity - 1 };
    })
    .filter((item) => item.quantity > 0);
  saveCart(cart);
  renderCart();
}

function removeCartItem(itemId) {
  saveCart(getCart().filter((item) => item.id !== itemId));
  renderCart();
}

function checkoutWhatsApp() {
  const phone = cleanPhone(localStorage.getItem(PHONE_KEY));
  const cart = getCart();

  if (!phone) {
    alert("Configure o WhatsApp no painel admin");
    return;
  }

  if (!cart.length) {
    alert("Adicione pelo menos um produto ao carrinho");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.unitTotal * item.quantity, 0);
  const lines = ["Olá! Quero fazer um pedido no Sabor da Casa:", ""];

  cart.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.quantity}x ${item.name} - ${formatPrice(item.unitTotal * item.quantity)}`);
    if (item.addons.length) lines.push(`   Adicionais: ${item.addons.map((addon) => `${addon.name} (+${formatPrice(addon.price)})`).join(", ")}`);
    if (item.removed.length) lines.push(`   Remover: ${item.removed.join(", ")}`);
    if (item.note) lines.push(`   Observação: ${item.note}`);
    lines.push("");
  });

  lines.push(`Total: ${formatPrice(total)}`);
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
}

// Painel administrativo
if (page === "admin") {
  initAdmin();
}

function initAdmin() {
  const productForm = document.getElementById("productForm");
  const productImageInput = document.getElementById("productImage");
  const savePhone = document.getElementById("savePhone");
  const cancelEdit = document.getElementById("cancelEdit");

  renderAdminProducts();
  renderPhone();

  productImageInput.addEventListener("change", previewSelectedImage);
  productForm.addEventListener("submit", saveProductFromForm);
  savePhone.addEventListener("click", savePhoneNumber);
  cancelEdit.addEventListener("click", resetProductForm);
}

function previewSelectedImage() {
  const file = document.getElementById("productImage").files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const preview = document.getElementById("imagePreview");
    preview.src = reader.result;
    preview.classList.add("show");
  };
  reader.readAsDataURL(file);
}

function saveProductFromForm(event) {
  event.preventDefault();

  const file = document.getElementById("productImage").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => persistProduct(reader.result);
    reader.readAsDataURL(file);
    return;
  }

  persistProduct(null);
}

function persistProduct(newImage) {
  const productId = document.getElementById("productId").value;
  const products = getProducts();
  const existing = products.find((product) => product.id === productId);

  const product = {
    id: productId || crypto.randomUUID(),
    name: document.getElementById("productName").value.trim(),
    price: Number(document.getElementById("productPrice").value),
    description: document.getElementById("productDescription").value.trim(),
    category: document.getElementById("productCategory").value.trim(),
    subcategory: existing?.subcategory || "",
    removals: parseRemovals(document.getElementById("productRemovals").value),
    addOnGroups: parseAddons(document.getElementById("productAddons").value),
    image: newImage || existing?.image || ""
  };

  if (productId) {
    saveProducts(products.map((item) => (item.id === productId ? product : item)));
    showToast("Produto atualizado");
  } else {
    saveProducts([...products, product]);
    showToast("Produto cadastrado");
  }

  resetProductForm();
  renderAdminProducts();
}

function renderAdminProducts() {
  const container = document.getElementById("adminProducts");
  if (!container) return;

  const products = getProducts();
  if (!products.length) {
    container.innerHTML = "<p>Nenhum produto cadastrado.</p>";
    return;
  }

  container.innerHTML = products
    .map(
      (product) => `
      <article class="admin-product">
        <img src="${productImage(product)}" alt="${product.name}">
        <div>
          <h3>${product.name}</h3>
          <p>${product.category} · ${formatPrice(product.price)}</p>
          <p>${product.description}</p>
          <p>${getProductRemovals(product).length} ingredientes removíveis · ${countAddons(product)} adicionais</p>
        </div>
        <div class="admin-actions">
          <button class="ghost-button edit-product" data-id="${product.id}" type="button">Editar</button>
          <button class="danger-button delete-product" data-id="${product.id}" type="button">Excluir</button>
        </div>
      </article>`
    )
    .join("");

  container.querySelectorAll(".edit-product").forEach((button) => {
    button.addEventListener("click", () => editProduct(button.dataset.id));
  });
  container.querySelectorAll(".delete-product").forEach((button) => {
    button.addEventListener("click", () => deleteProduct(button.dataset.id));
  });
}

function editProduct(productId) {
  const product = getProducts().find((item) => item.id === productId);
  if (!product) return;

  document.getElementById("formTitle").textContent = "Editar produto";
  document.getElementById("productId").value = product.id;
  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productDescription").value = product.description;
  document.getElementById("productCategory").value = product.category;
  document.getElementById("productRemovals").value = formatRemovalsForForm(product);
  document.getElementById("productAddons").value = formatAddonsForForm(product);

  const preview = document.getElementById("imagePreview");
  preview.src = productImage(product);
  preview.classList.add("show");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteProduct(productId) {
  if (!confirm("Deseja excluir este produto?")) return;
  saveProducts(getProducts().filter((product) => product.id !== productId));
  renderAdminProducts();
  showToast("Produto excluído");
}

function resetProductForm() {
  document.getElementById("productForm").reset();
  document.getElementById("productId").value = "";
  document.getElementById("formTitle").textContent = "Cadastrar produto";
  document.getElementById("imagePreview").classList.remove("show");
}

function parseRemovals(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseAddons(value) {
  const groups = {};

  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const [groupName, itemName, rawPrice] = line.split(";").map((part) => part?.trim());
      const price = Number(String(rawPrice || "0").replace(",", "."));

      if (!groupName || !itemName || Number.isNaN(price)) return;
      groups[groupName] = groups[groupName] || [];
      groups[groupName].push({ name: itemName, price });
    });

  return Object.entries(groups).map(([name, items]) => ({ name, items }));
}

function formatRemovalsForForm(product) {
  return getProductRemovals(product).join("\n");
}

function formatAddonsForForm(product) {
  return getProductAddOnGroups(product)
    .flatMap((group) => group.items.map((item) => `${group.name}; ${item.name}; ${item.price}`))
    .join("\n");
}

function countAddons(product) {
  return getProductAddOnGroups(product).reduce((total, group) => total + group.items.length, 0);
}

function savePhoneNumber() {
  const phone = cleanPhone(document.getElementById("phoneInput").value);
  if (!phone) {
    alert("Informe um número de WhatsApp válido");
    return;
  }
  localStorage.setItem(PHONE_KEY, phone);
  renderPhone();
  showToast("WhatsApp salvo");
}

function renderPhone() {
  const phone = localStorage.getItem(PHONE_KEY) || "";
  document.getElementById("phoneInput").value = phone;
  document.getElementById("currentPhone").textContent = phone || "Não configurado";
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
