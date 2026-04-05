export interface ShoppingRecommendation {
  name: string;
  nameJP: string;
  priceEstimate: number;
  category: "food" | "souvenir" | "anime" | "fashion" | "cosmetics" | "electronics" | "other";
  tip?: string;
  tipTH?: string;
  unsplashQuery: string; // Search query for Unsplash image
}

export interface LocationShopping {
  locationName: string;
  locationNameJP: string;
  items: ShoppingRecommendation[];
}

export const shoppingByDay: Record<number, LocationShopping[]> = {
  0: [
    {
      locationName: "Asakusa (Senso-ji)",
      locationNameJP: "浅草",
      items: [
        { name: "Omamori (Amulet)", nameJP: "お守り", priceEstimate: 500, category: "souvenir", tip: "Traditional amulets for luck, health, love", tipTH: "เครื่องราง สวยงาม มีหลายแบบ", unsplashQuery: "japanese+omamori+amulet" },
        { name: "Edo-style Fan", nameJP: "江戸うちわ", priceEstimate: 1000, category: "souvenir", tip: "Traditional Japanese hand fan", tipTH: "พัดญี่ปุ่นแบบดั้งเดิม", unsplashQuery: "japanese+fuchiwa+fan" },
        { name: "Ningyo-yaki", nameJP: "人形焼", priceEstimate: 600, category: "food", tip: "Small cakes shaped like lanterns", tipTH: "ขนมรูปโคมไฟ สดใหม่จากเตา", unsplashQuery: "japanese+ningyoyaki+cake" },
      ],
    },
    {
      locationName: "Tokyo Skytree",
      locationNameJP: "東京スカイツリー",
      items: [
        { name: "Sumikko Gurashi Goods", nameJP: "すみっコぐらし", priceEstimate: 1500, category: "souvenir", tip: "Exclusive Skytree character merch", tipTH: "สินค้าคาแรคเตอร์เฉพาะที่นี่", unsplashQuery: "tokyo+skytree+souvenir+shop" },
        { name: "Skytree KitKat", nameJP: "スカイツリー限定キットカット", priceEstimate: 800, category: "food", tip: "Tokyo banana flavored KitKat", tipTH: "KitKat รส Tokyo Banana เฉพาะที่นี่", unsplashQuery: "japanese+kitkat+matcha" },
      ],
    },
    {
      locationName: "Ameyoko Market",
      locationNameJP: "アメ横",
      items: [
        { name: "Dried Seafood", nameJP: "干物", priceEstimate: 500, category: "food", tip: "Dried squid, scallops", tipTH: "ปลาหมึกแห้ง หอยเชลล์แห้ง", unsplashQuery: "dried+squid+seafood+japan" },
        { name: "Seasonal Fruit", nameJP: "フルーツ", priceEstimate: 1000, category: "food", tip: "Strawberries, grapes, melon", tipTH: "สตรอว์เบอร์รี องุ่น เมล่อน", unsplashQuery: "japanese+fruit+strawberry+market" },
        { name: "Japanese Spices", nameJP: "スパイス", priceEstimate: 300, category: "food", tip: "Shichimi, wasabi powder", tipTH: "ชิชิมิ วาซาบิผง", unsplashQuery: "japanese+spices+shichimi+wasabi" },
      ],
    },
    {
      locationName: "Takeya / Don Quijote",
      locationNameJP: "ドン・キホーテ",
      items: [
        { name: "Tokyo Banana", nameJP: "東京ばな奈", priceEstimate: 800, category: "food", tip: "Most popular Tokyo souvenir", tipTH: "ของฝากอันดับ 1 ของโตเกียว", unsplashQuery: "tokyo+banana+cake" },
        { name: "Matcha KitKat", nameJP: "抹茶キットカット", priceEstimate: 600, category: "food", tip: "Japan exclusive flavors", tipTH: "KitKat รสญี่ปุ่นเท่านั้น", unsplashQuery: "matcha+kitkat+japan" },
        { name: "Shiseido Cosmetics", nameJP: "資生堂コスメ", priceEstimate: 2000, category: "cosmetics", tip: "Japanese brands cheaper here", tipTH: "เครื่องสำอางญี่ปุ่นถูกกว่าไทย", unsplashQuery: "japanese+cosmetics+skincare" },
      ],
    },
  ],
  1: [
    {
      locationName: "Gala Yuzawa",
      locationNameJP: "ガーラ湯沢",
      items: [
        { name: "Yuzawa Sake", nameJP: "湯沢の日本酒", priceEstimate: 1500, category: "food", tip: "Niigata famous sake", tipTH: "สาเก Niigata มีชื่อเสียง", unsplashQuery: "japanese+sake+niigata" },
        { name: "Ski Gloves", nameJP: "スキー手袋", priceEstimate: 1500, category: "other", tip: "Waterproof, warm", tipTH: "ถุงมือกันน้ำ กันหนาว", unsplashQuery: "ski+gloves+snow+japan" },
      ],
    },
  ],
  2: [
    {
      locationName: "Kamakura",
      locationNameJP: "鎌倉",
      items: [
        { name: "Hato Popo (Pigeon Cookie)", nameJP: "鳩ぽっぽ", priceEstimate: 500, category: "food", tip: "Famous Kamakura cookie", tipTH: "คุกกี้รูปนกพิราบ ของดี镰仓", unsplashQuery: "japanese+cookie+traditional" },
        { name: "Great Buddha Keychain", nameJP: "大仏キーホルダー", priceEstimate: 400, category: "souvenir", tip: "Miniature Great Buddha", tipTH: "พวงกุญแจพระใหญ่", unsplashQuery: "kamakura+buddha+souvenir" },
      ],
    },
    {
      locationName: "Akihabara",
      locationNameJP: "秋葉原",
      items: [
        { name: "FIGMA / Nendoroid", nameJP: "フィグマ/ねんどろいど", priceEstimate: 5000, category: "anime", tip: "20-40% cheaper than Thailand", tipTH: "ถูกกว่าไทย 20-40%", unsplashQuery: "nendoroid+anime+figure" },
        { name: "Gunpla (Gundam)", nameJP: "ガンプラ", priceEstimate: 2000, category: "anime", tip: "Cheapest in Japan", tipTH: "ถูกสุดในญี่ปุ่น", unsplashQuery: "gundam+model+gunpla" },
        { name: "Trading Cards", nameJP: "トレーディングカード", priceEstimate: 3000, category: "anime", tip: "Pokemon, One Piece", tipTH: "โปเกมอน วันพีช ราคางาม", unsplashQuery: "pokemon+trading+cards+japan" },
        { name: "Retro Games", nameJP: "レトロゲーム", priceEstimate: 2000, category: "anime", tip: "GBA, DS, Switch — secondhand", tipTH: "เกมมือสองราคาถูก", unsplashQuery: "retro+video+games+japan" },
      ],
    },
  ],
  3: [
    {
      locationName: "Kawagoe",
      locationNameJP: "川越",
      items: [
        { name: "Sweet Potato Snacks", nameJP: "芋菓子", priceEstimate: 500, category: "food", tip: "Kawagoe famous", tipTH: "ขนมมันหวาน Kawagoe", unsplashQuery: "japanese+sweet+potato+snack" },
      ],
    },
    {
      locationName: "Shibuya / Harajuku",
      locationNameJP: "渋谷・原宿",
      items: [
        { name: "Shibuya 109 Fashion", nameJP: "SHIBUYA109", priceEstimate: 5000, category: "fashion", tip: "Latest street fashion", tipTH: "แฟชั่นสตรีทล่าสุด", unsplashQuery: "shibuya+fashion+street+style" },
        { name: "Kawaii Accessories", nameJP: "かわいいアクセサリー", priceEstimate: 1000, category: "fashion", tip: "Colorful Harajuku style", tipTH: "เครื่องประดับสีสดใส สไตล์ Harajuku", unsplashQuery: "harajuku+kawaii+accessories" },
        { name: "Don Quijote Shibuya", nameJP: "ドン・キホーテ渋谷", priceEstimate: 2000, category: "other", tip: "Everything under one roof", tipTH: "ทุกอย่างในที่เดียว", unsplashQuery: "don+quijote+tokyo+store" },
      ],
    },
  ],
  4: [
    {
      locationName: "Mt. Fuji Area",
      locationNameJP: "富士山",
      items: [
        { name: "Fuji Souvenir", nameJP: "富士山お土産", priceEstimate: 500, category: "souvenir", tip: "Fuji-shaped cookies, magnets", tipTH: "คุกกี้รูปฟูจิ แม่เหล็ก", unsplashQuery: "mount+fuji+souvenir" },
        { name: "Hakone Onsen Egg", nameJP: "箱根温泉卵", priceEstimate: 500, category: "food", tip: "Black eggs — adds 7 years to life!", tipTH: "ไข่ดำบ่อภูเขาไฟ ว่าเพิ่มอายุ 7 ปี!", unsplashQuery: "hakone+black+egg+onsen" },
        { name: "Fuji Sake", nameJP: "富士の日本酒", priceEstimate: 1500, category: "food", tip: "Brewed with Fuji spring water", tipTH: "สาเกจากน้ำพุฟูจิ", unsplashQuery: "japanese+sake+bottle" },
      ],
    },
  ],
  5: [
    {
      locationName: "Shimokitazawa",
      locationNameJP: "下北沢",
      items: [
        { name: "Vintage Clothing", nameJP: "ヴィンテージ古着", priceEstimate: 2000, category: "fashion", tip: "Best thrift shops in Tokyo", tipTH: "ร้าน vintage ที่ดีที่สุดในโตเกียว", unsplashQuery: "vintage+clothing+tokyo+shop" },
        { name: "Japanese Coffee Beans", nameJP: "日本のコーヒー豆", priceEstimate: 1000, category: "food", tip: "Premium roasted beans", tipTH: "เมล็ดคั่วพรีเมียม", unsplashQuery: "japanese+coffee+beans" },
        { name: "Drip Coffee Bags", nameJP: "ドリップバッグ", priceEstimate: 500, category: "food", tip: "Single-serve, easy to bring home", tipTH: "แบบซองเดียวชงง่าย", unsplashQuery: "japanese+drip+coffee+bags" },
      ],
    },
  ],
  6: [
    {
      locationName: "Narita Airport Duty Free",
      locationNameJP: "成田空港免税店",
      items: [
        { name: "Tokyo Banana", nameJP: "東京ばな奈", priceEstimate: 800, category: "food", tip: "Buy last minute — freshest", tipTH: "ซื้อสุดท้าย batches ใหม่สุด", unsplashQuery: "tokyo+banana+cake" },
        { name: "Japanese Whiskey", nameJP: "日本ウイスキー", priceEstimate: 3000, category: "food", tip: "Yamazaki, Hakushu — duty-free", tipTH: "Yamazaki, Hakushu — duty-free", unsplashQuery: "japanese+whiskey+yamazaki" },
        { name: "Royce Chocolate", nameJP: "ロイズチョコレート", priceEstimate: 1500, category: "food", tip: "Hokkaido famous, wasabi flavor", tipTH: "ช็อกโกแลต Hokkaido รสวาซาบิ", unsplashQuery: "japanese+chocolate+premium" },
        { name: "Shiroi Koibito", nameJP: "白い恋人", priceEstimate: 1000, category: "food", tip: "Iconic Hokkaido cookies", tipTH: "คุกกี้ Hokkaido iconic", unsplashQuery: "shiroi+koibito+cookie" },
        { name: "Japanese Snacks Box", nameJP: "日本のお菓子詰め合わせ", priceEstimate: 2000, category: "food", tip: "Pocky, KitKat, Jagariko", tipTH: "กล่องขนมรวม Pocky KitKat", unsplashQuery: "japanese+snacks+assorted+box" },
      ],
    },
  ],
};
