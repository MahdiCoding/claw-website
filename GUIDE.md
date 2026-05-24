# CLAW Website — Owner's Guide
## كيفية إدارة موقع CLAW

---

## 📁 File Structure | هيكل الملفات

```
claw-website/
├── index.html       → Main website page
├── style.css        → All visual design (colors, fonts, layout)
├── app.js           → Website behavior (cart, language, orders)
├── products.js      → ⭐ YOUR PRODUCTS — Edit this file to manage items
└── images/          → Put your product photos here
    ├── tee-black.jpg
    ├── hoodie-white.jpg
    └── ... (your images)
```

---

## ➕ HOW TO ADD A PRODUCT | كيفية إضافة منتج

Open `products.js` and copy this block, paste it inside the array before the last `]`:

```javascript
{
  id: 9,                          // ← give it a unique number
  name: "New Item Name",          // ← English name
  nameAr: "اسم المنتج",          // ← Arabic name
  price: 750,                     // ← price in EGP (numbers only)
  category: "streetwear",         // ← "streetwear" or "luxury" or "accessories"
  image: "images/my-photo.jpg",   // ← put your photo in /images/ folder
  sizes: ["S", "M", "L", "XL"],  // ← sizes available
  badge: "NEW",                   // ← leave "" for no badge, or write "NEW" / "LIMITED" / "BESTSELLER"
  badgeAr: "جديد"                 // ← Arabic badge text (or leave "" empty)
},
```

---

## ❌ HOW TO DELETE A PRODUCT | كيفية حذف منتج

Open `products.js`, find the product block you want to delete, and remove it.

**Example — delete product with id 3:**
Find this:
```
  {
    id: 3,
    name: "Wide Leg Cargo Pants",
    ...
  },
```
And delete the entire block from `{` to `},`

---

## 🖼️ ADDING IMAGES | إضافة الصور

1. Put your image file (JPG or PNG) in the `/images/` folder
2. In `products.js`, set: `image: "images/your-filename.jpg"`
3. If no image is added, the site shows a placeholder automatically ✅

**Recommended image size:** 800×1100px (portrait, 3:4 ratio)

---

## 💰 ORDERS | الطلبات

- All orders are **Cash on Delivery** (الدفع عند الاستلام)
- When a customer places an order, you will see it in your browser console (F12 → Console tab)
- **To receive orders by WhatsApp or Email**, you'll need to connect a form service like:
  - **Formspree** (free): https://formspree.io
  - **WhatsApp Business API**
  - Just let me know and I can add this for you!

---

## 🌐 HOW TO HOST THE WEBSITE | كيفية رفع الموقع

**Option 1 — Free hosting with Netlify (Recommended):**
1. Go to https://netlify.com and create a free account
2. Drag and drop your entire `claw-website` folder onto the Netlify dashboard
3. Your site will be live in 30 seconds with a free URL like `claw-brand.netlify.app`
4. You can connect a custom domain (e.g. `clawbrand.com`) from Netlify settings

**Option 2 — GitHub Pages (Free):**
1. Create a GitHub account at https://github.com
2. Create a new repository and upload all your files
3. Go to Settings → Pages → Deploy from branch
4. Your site is live at `yourusername.github.io/claw-website`

**Option 3 — Any web hosting provider:**
Upload all files via FTP to `public_html` folder.

---

## 🎨 CHANGING COLORS | تغيير الألوان

Open `style.css` and find the `:root` block at the top:

```css
:root {
  --black:  #0a0a0a;   /* main text & buttons */
  --white:  #fafafa;   /* background */
  --off:    #f2f0ed;   /* hero background */
  --accent: #b8a88a;   /* gold accent color */
}
```

Change any hex color code to update the whole site.

---

## ❓ Need help? Contact your developer.
