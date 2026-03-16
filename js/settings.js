/**
 * Logic for settings.html: auto settings, history, and manual row selection
 */
document.addEventListener('DOMContentLoaded', () => {
  requireAuth();

  // Auto: spray per lap
  const sprayInput = document.getElementById('spraysPerLap');
  const spraySave = document.getElementById('saveSprays');
  dbOn('/settings/spraysPerLap', (v)=> { sprayInput.value = v ?? 0; });
  spraySave.addEventListener('click', async ()=> {
    await dbSet('/settings/spraysPerLap', Number(sprayInput.value || 0));
  });

  // Manual: choose row
  const rowInput = document.getElementById('rowSelect');
  const sendRowBtn = document.getElementById('sendRow');
  sendRowBtn.addEventListener('click', async ()=> {
    const row = Number(rowInput.value || 1);
    // Force manual mode and set command
    await dbSet('/settings/autoMode', false);
    await dbSet('/commands/manualTargetRow', { row, ts: Date.now() });
    alert('Command sent: go to row ' + row);
  });

  // History aggregation
  // Expect lap entries under /telemetry/laps/<pushId> = {{ts: epochMs, durationSec: n}}
  const tbody = document.getElementById('historyRows');
  const sumHour = document.getElementById('sumHour');
  const sumDay = document.getElementById('sumDay');
  const sumMonth = document.getElementById('sumMonth');

  function formatDate(ms) {
    const d = new Date(ms);
    return d.toISOString().replace('T',' ').substring(0,19);
  }

  dbOn('/telemetry/laps', (obj) => {
    const entries = [];
    if (obj) Object.keys(obj).forEach(k => entries.push(obj[k]));
    entries.sort((a,b)=> b.ts - a.ts);
    // table
    tbody.innerHTML='';
    let h=0,d=0,m=0;
    const now = Date.now();
    const hourAgo = now - 3600*1000;
    const dayAgo = now - 24*3600*1000;
    const monthAgo = now - 30*24*3600*1000;

    for (const e of entries.slice(0,100)) { // show latest 100
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${formatDate(e.ts)}</td>
                      <td>${(e.durationSec??0).toFixed(1)}</td>`;
      tbody.appendChild(tr);
      if (e.ts>=hourAgo) h++;
      if (e.ts>=dayAgo) d++;
      if (e.ts>=monthAgo) m++;
    }
    sumHour.textContent = h;
    sumDay.textContent = d;
    sumMonth.textContent = m;
  });
});