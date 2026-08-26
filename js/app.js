/* ============================================================
   İlayda'nın 28. Yaş Günü — ortak site mantığı
   ============================================================ */

const VISITED_KEY = "ilayda28_davet_gorundu";

/* ---------- 1) index.html: davetiye zarfı ---------- */

function initInvitePage() {
  const envelope = document.querySelector(".envelope");
  const wrap = document.querySelector(".envelope-wrap");
  const continueBtn = document.querySelector("#continueBtn");
  if (!envelope) return;

  // Eğer daha önce daveti gördüyse direkt ana sayfaya at.
  if (localStorage.getItem(VISITED_KEY) === "1") {
    window.location.replace("home.html");
    return;
  }

  envelope.addEventListener("click", () => {
    if (envelope.classList.contains("open")) return;
    envelope.classList.add("open");
    wrap.classList.add("revealed");
  });

  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      envelope.click();
    }
  });

  continueBtn?.addEventListener("click", () => {
    localStorage.setItem(VISITED_KEY, "1");
    window.location.href = "home.html";
  });

  // Ateş böcekleri animasyonu için rastgele konumlar üret.
  const field = document.querySelector(".fireflies");
  if (field) {
    for (let i = 0; i < 14; i++) {
      const dot = document.createElement("span");
      dot.className = "firefly";
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = 40 + Math.random() * 55 + "%";
      dot.style.animationDelay = (Math.random() * 6).toFixed(2) + "s";
      dot.style.animationDuration = (5 + Math.random() * 4).toFixed(2) + "s";
      field.appendChild(dot);
    }
  }
}

/* ---------- 2) home.html: eğer davet hiç görülmediyse önce ona yönlendir ---------- */

function guardHomePage() {
  const isHome = document.body.dataset.page === "home";
  if (!isHome) return;
  if (localStorage.getItem(VISITED_KEY) !== "1") {
    // Direkt linkle gelmiş olabilir; yine de nazikçe davetiyeye yolla.
    window.location.replace("index.html");
  }
}

/* ---------- 3) Anı defteri formu (home.html altı) ---------- */

function initGuestbookForm() {
  const form = document.querySelector("#guestbookForm");
  if (!form) return;
  const status = document.querySelector("#formStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const message = form.message.value.trim();
    if (!name || !message) return;

    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;
    status.textContent = "Gönderiliyor…";

    try {
      if (!CONFIG.GAS_URL || CONFIG.GAS_URL.includes("BURAYA_")) {
        throw new Error("no-backend");
      }

      // Apps Script'e preflight'a takılmadan, text/plain body ile POST.
      await fetch(CONFIG.GAS_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ name, message })
      });

      status.textContent = "Teşekkürler! Mesajın kaydedildi 💛";
      form.reset();
    } catch (err) {
      status.textContent =
        "Bağlantı henüz kurulmadı gibi görünüyor (config.js'e Apps Script " +
        "URL'ini eklemeyi unutma). Mesajını yine de aklında tut, iletirim!";
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* ---------- 4) admin.html: şifre + listeleme ---------- */

function initAdminPage() {
  const lock = document.querySelector("#lockScreen");
  const shell = document.querySelector("#adminShell");
  if (!lock || !shell) return;

  const form = document.querySelector("#lockForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = document.querySelector("#lockInput").value;
    if (value === CONFIG.ADMIN_PASSWORD) {
      lock.style.display = "none";
      shell.style.display = "block";
      loadEntries();
    } else {
      document.querySelector("#lockError").textContent = "Şifre yanlış, tekrar dene.";
    }
  });
}

async function loadEntries() {
  const tbody = document.querySelector("#entriesBody");
  const loading = document.querySelector("#adminLoading");
  const empty = document.querySelector("#adminEmpty");
  const table = document.querySelector(".admin-table-wrap");

  if (!CONFIG.GAS_URL || CONFIG.GAS_URL.includes("BURAYA_")) {
    loading.textContent =
      "Henüz bir Google Apps Script bağlantısı tanımlanmamış. " +
      "README.md içindeki kurulum adımlarını tamamla ve js/config.js dosyasına " +
      "GAS_URL değerini ekle.";
    return;
  }

  try {
    const url = `${CONFIG.GAS_URL}?token=${encodeURIComponent(CONFIG.SECRET_TOKEN)}`;
    const res = await fetch(url);
    const data = await res.json();

    loading.style.display = "none";

    if (!data.length) {
      empty.style.display = "block";
      return;
    }

    table.style.display = "block";
    data
      .slice()
      .reverse()
      .forEach((row) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${escapeHtml(row.timestamp || "")}</td>
          <td>${escapeHtml(row.name || "")}</td>
          <td>${escapeHtml(row.message || "")}</td>
        `;
        tbody.appendChild(tr);
      });
  } catch (err) {
    loading.textContent =
      "Mesajlar yüklenemedi. Apps Script dağıtımının 'Anyone' erişimine " +
      "açık olduğundan ve URL'in doğru olduğundan emin ol.";
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- init ---------- */

document.addEventListener("DOMContentLoaded", () => {
  initInvitePage();
  guardHomePage();
  initGuestbookForm();
  initAdminPage();
});
