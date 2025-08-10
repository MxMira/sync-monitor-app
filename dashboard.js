document.addEventListener("DOMContentLoaded", async () => {
  const cardsContainer = document.getElementById("cards");

  try {
    const snapshot = await db
      .collection("syncLogs")
      .orderBy("timestamp", "desc")
      .limit(50)
      .get();

    const grouped = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      const key = `${data.database}_${data.yearMonth}`;
      grouped[key] = (grouped[key] || 0) + 1;

      const time = data.timestamp.toDate().toLocaleString('ar-EG');
      const card = document.createElement("div");
      card.className = "card";

      if (!data.backupTaken || !data.rebuiltIndex) {
        card.classList.add("red");
      } else if (data.deltaOver7000 && !data.didCompress) {
        card.classList.add("yellow");
      } else {
        card.classList.add("green");
      }

      card.innerHTML = `
        <h3>${data.employee}</h3>
        <p><strong>القاعدة:</strong> ${data.database}</p>
        <p><strong>الوقت:</strong> ${time}</p>
        <p><strong>باك اب:</strong> ${data.backupTaken ? '✅' : '❌'}</p>
        <p><strong>دلتا &gt; 7000:</strong> ${data.deltaOver7000 ? '✅' : '❌'}</p>
        <p><strong>كوبرس:</strong> ${data.didCompress ? '✅' : '❌'}</p>
        <p><strong>ريبلد:</strong> ${data.rebuiltIndex ? '✅' : '❌'}</p>
        <p><strong>عدد السينكات هذا الشهر:</strong> ${grouped[key]}</p>
      `;

      cardsContainer.appendChild(card);
    });
  } catch (err) {
    cardsContainer.innerHTML = `<p class="error">❌ حدث خطأ أثناء تحميل البيانات</p>`;
    console.error(err);
  }
});
