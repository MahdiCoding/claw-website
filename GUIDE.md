# CLAW Website — Owner's Guide

---

## 📁 File Structure

```
claw-website/
├── index.html        → Main website
├── style.css         → All design & styling
├── app.js            → Cart, language, orders
├── products.js       → Products list
├── netlify.toml      → Netlify settings
├── admin/
│   ├── index.html    → Admin panel page
│   └── config.yml    → Admin panel config
└── images/           → Your product photos
```

---

## 🚀 HOW TO HOST (Step by step)

### Step 1 — Push to GitHub
1. Go to github.com and log in as MahdiCoding
2. Click "New repository" → name it `claw-website` → set to Public → Create
3. Upload all your files to it (drag and drop in GitHub)

### Step 2 — Connect to Netlify
1. Go to netlify.com → Sign up with GitHub
2. Click "Add new site" → "Import an existing project" → GitHub
3. Select your `claw-website` repository
4. Click "Deploy site" — your site goes live in 30 seconds

### Step 3 — Enable the Admin Panel
1. In Netlify dashboard → go to **Identity** tab
2. Click **"Enable Identity"**
3. Scroll down to **"Registration"** → set to **"Invite only"**
4. Go to **"Services"** → **"Git Gateway"** → click **"Enable Git Gateway"**
5. Go to **Identity** → **"Invite users"** → enter your email → send invite
6. Check your email → click the invite link → set your password
7. Now go to `yoursite.netlify.app/admin` → log in → you're in!

---

## 🛍 MANAGING PRODUCTS (via Admin Panel)

Go to `yoursite.com/admin` and log in.

### Add a product:
- Click **"New Product"**
- Fill in: name (EN + AR), price, category, sizes, image, badge
- Click **Publish** → product appears on site within 1 minute

### Delete a product:
- Find it in the list → open it → click **Delete**

### Mark as Sold Out:
- Open the product → toggle **"Sold Out?"** to ON
- The item will show greyed out with "SOLD OUT" badge
- Customers cannot add it to cart

### Put item on Sale:
- Open the product → set **"Sale Price"** to the discounted price
- Set badge to **"SALE"**
- The original price shows with a strikethrough, sale price shows in red

---

## 🖼️ ADDING PRODUCT IMAGES

**Via Admin Panel:**
- When adding/editing a product, click the image field → upload directly

**Manually:**
- Put JPG/PNG in the `/images/` folder
- Recommended size: 800×1100px
- Compress at squoosh.app before uploading

---

## 💰 ORDERS

Every order goes silently to: **cillian.vip150@gmail.com**

Email subject: `New CLAW Order — [Customer Name]`
Contains: name, phone, address, items, total, payment method

---

## 🎨 CHANGING COLORS

Open `style.css`, find `:root` at the top:
```css
:root {
  --black:  #0a0a0a;
  --white:  #fafafa;
  --off:    #f2f0ed;
  --accent: #b8a88a;  ← gold color
}
```
