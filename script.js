// script.js

// تأكد إن DOM جاهز
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('syncForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const employee = document.getElementById('employee').value;
    const database = document.getElementById('database').value;
    const backupTaken = document.getElementById('backupTaken').checked;
    const deltaOver7000 = document.getElementById('deltaOver7000').checked;
    const didCompress = document.getElementById('didCompress').checked;
    const rebuiltIndex = document.getElementById('rebuiltIndex').checked;

    const now = new Date();

    const syncData = {
      employee,
      database,
      backupTaken,
      deltaOver7000,
      didCompress,
      rebuiltIndex,
      timestamp: firebase.firestore.Timestamp.fromDate(now),
      yearMonth: `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}`
    };

    try {
      await db.collection('syncLogs').add(syncData);
      alert('✅ تم تسجيل العملية بنجاح');
      form.reset
