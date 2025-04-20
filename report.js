const list = document.getElementById("weeklyList");

function getRecentIncidents() {
  const data = JSON.parse(localStorage.getItem("incidents") || "[]");
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return data.filter(item => new Date(item.timestamp) >= oneWeekAgo);
}

function displayIncidents() {
  const recent = getRecentIncidents();
  list.innerHTML = "";

  if (recent.length === 0) {
    list.innerHTML = `<li class="empty">No incidents in the last 7 days.</li>`;
    return;
  }

  recent.reverse().forEach(incident => {
    const entry = document.createElement("li");
    entry.innerHTML = `
      <strong>📍 Location:</strong> ${incident.location}<br>
      <strong>🌆 Area:</strong> ${incident.area}<br>
      <strong>🔥 Type:</strong> ${incident.type}<br>
      <strong>🧍 Casualties:</strong> ${incident.casualties}<br>
      <strong>🧯 Equipment:</strong> ${incident.equipment}<br>
      <span style="font-size: 0.85rem; color: gray;">🕒 ${new Date(incident.timestamp).toLocaleString()}</span>
    `;
    list.appendChild(entry);
  });
}

displayIncidents();
