// ============================================================
//  CLAW — PRODUCTS FILE
//  HOW TO ADD AN ITEM:
//    Copy one product block and paste it inside the array.
//    Change the id, name, nameAr, price, category, and image.
//
//  HOW TO DELETE AN ITEM:
//    Find the product block and delete it (from { to the closing },)
//
//  CATEGORIES: "streetwear" | "luxury" | "accessories"
//
//  IMAGE: put your image file in the /images/ folder
//         then write "images/your-file.jpg" here.
//         Or paste any image URL from the web.
// ============================================================

const PRODUCTS = [
  {
    id: 1,
    name: "CLAW  Tee",
    nameAr: "تيشيرت  CLAW",
    price: 850,
    category: "streetwear",
    image: "images/tee-black.jpg",
    sizes: ["S", "M", "L", "XL"],
    badge: "NEW",
    badgeAr: "جديد"
  },
  {
    id: 2,
    name: "Minimal Logo Hoodie",
    nameAr: "هودي بشعار بسيط",
    price: 1450,
    category: "streetwear",
    image: "images/hoodie-white.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "",
    badgeAr: ""
  },
  {
    id: 3,
    name: "Wide Leg Cargo Pants",
    nameAr: "بنطال كارجو واسع",
    price: 1200,
    category: "streetwear",
    image: "images/cargo-beige.jpg",
    sizes: ["S", "M", "L", "XL"],
    badge: "BESTSELLER",
    badgeAr: "الأكثر مبيعاً"
  },
  {
    id: 4,
    name: "CLAW Structured Blazer",
    nameAr: "بليزر CLAW المنظم",
    price: 2800,
    category: "luxury",
    image: "images/blazer-black.jpg",
    sizes: ["S", "M", "L", "XL"],
    badge: "LIMITED",
    badgeAr: "محدود"
  },
  {
    id: 5,
    name: "Silk Blend Shirt",
    nameAr: "قميص حرير",
    price: 1900,
    category: "luxury",
    image: "images/shirt-ivory.jpg",
    sizes: ["S", "M", "L", "XL"],
    badge: "",
    badgeAr: ""
  },
  {
    id: 6,
    name: "CLAW Signature Cap",
    nameAr: "كاب CLAW المميز",
    price: 450,
    category: "accessories",
    image: "images/cap-black.jpg",
    sizes: ["ONE SIZE"],
    badge: "NEW",
    badgeAr: "جديد"
  },
  {
    id: 7,
    name: "Leather Crossbody Bag",
    nameAr: "شنطة جلد كروس بودي",
    price: 1650,
    category: "accessories",
    image: "images/bag-black.jpg",
    sizes: ["ONE SIZE"],
    badge: "",
    badgeAr: ""
  },
  {
    id: 8,
    name: "CLAW Chain Necklace",
    nameAr: "سلسلة CLAW",
    price: 550,
    category: "accessories",
    image: "images/chain-silver.jpg",
    sizes: ["ONE SIZE"],
    badge: "NEW",
    badgeAr: "جديد"
  }
];
