# İlayda 28 — Doğum Günü Sitesi 🎂

İlayda'nın 28. yaş günü için hazırlanmış küçük bir davetiye sitesi.

- `index.html` → Kapalı zarf, tıklayınca açılan davetiye. "Devam Et" ile ana sayfaya geçer, bir daha bu sayfayı göstermez (tarayıcı hafızasına yazılır).
- `home.html` → Fotoğraflar, tarih/saat/adres, telefon numaran, ve en altta "anı defteri" formu.
- `admin.html` → Sadece senin görebileceğin, gelen mesajları listeleyen sayfa (şifreli).
- `google-apps-script/Code.gs` → Google E-Tablosu'nu (Sheets) veritabanı gibi kullanan backend kodu.

---

## 1. Adım — Google Sheet + Apps Script kurulumu (Anı Defteri için)

Bu, formdan gelen mesajların senin Google Drive'ındaki bir Excel'e (Google E-Tablosu) yazılmasını sağlar.

1. [sheets.google.com](https://sheets.google.com) üzerinde **yeni bir boş e-tablo** oluştur (örn. adı "İlayda 28 - Anı Defteri").
2. Üst menüden **Uzantılar (Extensions) → Apps Script** yolunu aç.
3. Açılan editördeki örnek kodu sil, bunun yerine bu projedeki `google-apps-script/Code.gs` dosyasının tamamını yapıştır.
4. Kod içindeki şu satırı bul:
   ```js
   const SECRET_TOKEN = "ilayda28-sirri-degistir";
   ```
   Dilersen bu değeri kendi seçtiğin bir şeyle değiştir (harf/rakam karışık olsun). **Bu projedeki `js/config.js` dosyasındaki `SECRET_TOKEN` ile birebir aynı olmalı.**
5. Sağ üstteki **Dağıt (Deploy) → Yeni dağıtım (New deployment)** butonuna bas.
   - Tür (Type) olarak **Web uygulaması (Web app)** seç.
   - "Execute as" → **Me (kendi hesabın)**
   - "Who has access" → **Anyone (Herkes)**
   - **Dağıt (Deploy)** de tıkla, Google izin isteyecek, kendi hesabınla onayla.
6. Sana verilen **Web app URL**'sini kopyala (`https://script.google.com/macros/s/.../exec` şeklinde bir adres).

## 2. Adım — Siteyi bu bilgilerle güncelle

`js/config.js` dosyasını aç ve şurayı doldur:

```js
GAS_URL: "BURAYA_APPS_SCRIPT_WEB_APP_URLINI_YAPISTIR",   // 1. Adım'dan kopyaladığın URL
SECRET_TOKEN: "ilayda28-sirri-degistir",                  // Code.gs ile aynı olmalı
ADMIN_PASSWORD: "sevgilim28",                              // admin.html şifresi, istediğin gibi değiştir
```

## 3. Adım — Fotoğrafları ekle

`assets/photos/` klasörüne İlayda'nın fotoğraflarını şu isimlerle koy (ya da HTML'deki dosya adlarını kendi fotoğraf isimlerinle değiştir):

```
assets/photos/ilayda-1.jpg
assets/photos/ilayda-2.jpg
assets/photos/ilayda-3.jpg
assets/photos/ilayda-4.jpg
```

Fotoğraf eklemezsen o alan sadece boş görünür, site bozulmaz.

## 4. Adım — GitHub'a yükle ve GitHub Pages ile yayınla

1. GitHub'da yeni bir repo oluştur (örn. `ilayda-28`).
2. Bu klasördeki tüm dosyaları o repoya yükle (GitHub'ın web arayüzünden "Add file → Upload files" ile sürükle-bırak yapabilirsin, ya da `git` kullanabilirsin).
3. Repo → **Settings → Pages** yolunu aç.
4. "Source" olarak **Deploy from a branch** seç, branch olarak `main`, klasör olarak `/ (root)` seç → **Save**.
5. Birkaç dakika içinde siten şu adreste yayına girer:
   ```
   https://KULLANICI_ADIN.github.io/ilayda-28/
   ```

> Not: GitHub Pages'te ana giriş noktası her zaman `index.html`'dir — bu yüzden proje kökündeki `index.html` otomatik olarak açılır. Davetiyeyi paylaşırken bu adresi (kökü) paylaş.

---

## ⚠️ Önemli güvenlik notu

- GitHub Pages'te **public (herkese açık)** bir repo kullanıyorsan, `js/config.js` içindeki `SECRET_TOKEN` ve `ADMIN_PASSWORD` da teknik olarak görülebilir durumda olur (kaynak kod herkese açık). Bu basit kilit, meraklı ziyaretçileri caydırmak içindir; askeri düzeyde bir gizlilik sağlamaz.
- Gerçekten kimsenin mesajlara erişememesini istiyorsan:
  - Repoyu **private** yap (GitHub Pages'i private repo ile kullanmak için GitHub Pro/Team gerekir), **veya**
  - Anı defteri mesajlarını sadece kendi Google E-Tablonu Drive'dan açarak kontrol et (admin.html'e hiç ihtiyacın kalmaz).
- Telefon numaran ve adres gibi bilgiler site herkese açık olduğu için herkes tarafından görülebilir — bunu bilerek paylaşıyor olman gerekiyor (davetiye linkini sadece davet ettiğin kişilerle paylaşman önerilir).

## Küçük dokunuşlar

- `home.html` içindeki "Onu bu kadar sevilesi yapan şeylerden birkaçı" gibi metinleri kendi cümlelerinle değiştirmen, siteyi çok daha kişisel yapar.
- Zarftaki "İ" harfini (mühür) `css/style.css` içinde `.seal` bölümünden değiştirebilirsin.
- Renkleri değiştirmek istersen `css/style.css` dosyasının en üstündeki `:root` bloğundaki renk kodlarıyla oynayabilirsin.

İyi eğlenceler, iyi ki doğdu İlayda! 🎉
