/* ============================================================
   AYARLAR — README.md'deki adımları tamamladıktan sonra
   aşağıdaki iki değeri kendi bilgilerinle değiştir.
   ============================================================ */

const CONFIG = {
  // Google Apps Script'i "Web Uygulaması" olarak yayınladığında
  // sana verilen URL. README.md → "1. Adım"a bak.
  GAS_URL: "BURAYA_APPS_SCRIPT_WEB_APP_URLINI_YAPISTIR",

  // Apps Script (Code.gs) içindeki SECRET_TOKEN ile birebir aynı olmalı.
  // Sadece mesajları listeleyen (admin) sayfanın Sheet'e erişebilmesi için.
  SECRET_TOKEN: "ilayda28-sirri-degistir",

  // Anı defterini görüntüleme (admin.html) sayfasının şifresi.
  // Bu tamamen istemci tarafı basit bir kilittir, çok gizli bilgi
  // saklamak için güvenilmemeli — sadece meraklıları caydırmak içindir.
  ADMIN_PASSWORD: "sevgilim28",

  // Doğum günü bilgileri (istersen buradan da güncelleyebilirsin,
  // home.html içinde de görürsün).
  EVENT: {
    day: "26",
    month: "Ağustos",
    weekday: "Çarşamba",
    time: "19:30 – 20:00",
    place: "Koç Topluluğu Spor Korusu",
    phone: "0534 760 20 80",
    mapsQuery: "Koç Topluluğu Spor Korusu"
  }
};
