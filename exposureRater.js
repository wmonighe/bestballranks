const uploader   = document.querySelector('.uploader');
const csvInput   = document.getElementById('csvInput');
const browseBtn  = document.getElementById('browseBtn');
const grid       = document.querySelector('.teams-grid');

browseBtn.onclick = () => csvInput.click();
uploader.ondragover = e => { e.preventDefault(); uploader.classList.add('drag'); };
uploader.ondragleave = () => uploader.classList.remove('drag');
uploader.ondrop = e => {
  e.preventDefault(); uploader.classList.remove('drag');
  handleFiles(e.dataTransfer.files);
};
csvInput.onchange  = () => handleFiles(csvInput.files);

async function handleFiles(fileList){
  const file = fileList[0];
  if(!file) return;
  const formData = new FormData(); formData.append('file', file);
  const res = await fetch('/api/exposure-rate',{ method:'POST', body:formData });
  if(!res.ok){ return showError('Upload failed'); }
  const teams = await res.json();
  renderTeams(teams);
}

function renderTeams(teams){
  grid.innerHTML = '';
  teams.forEach(team=>{
    const card = document.createElement('article');
    card.className = 'team-card';
    card.innerHTML = `
      <h2>${team.name} – <span class="badge-rating r${Math.floor(team.rating)}">${team.rating.toFixed(2)}</span></h2>
      ${buildTable(team.roster)}
    `;
    grid.appendChild(card);
  });
  document.querySelector('[data-state="empty"]').hidden = true;
  grid.hidden = false;
}

function buildTable(rows){
  const head = `<thead><tr>${Object.keys(rows[0]).map(k=>`<th>${k}</th>`).join('')}</tr></thead>`;
  const body = `<tbody>${rows.map(r=>`<tr>${Object.values(r).map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody>`;
  return `<table>${head}${body}</table>`;
}

function showError(msg){
  // TODO insert alert component
}

export { renderTeams };
