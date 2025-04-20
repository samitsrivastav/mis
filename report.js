const tableBody = document.querySelector("#weeklyTable tbody");

function getRecentIncidents() {
  const data = JSON.parse(localStorage.getItem("incidents") || "[]");
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return data.filter(item => new Date(item.timestamp) >= oneWeekAgo);
}

function displayIncidents() {
  const recent = getRecentIncidents();
  tableBody.innerHTML = "";

  if (recent.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" class="empty">No incidents in the last 7 days.</td></tr>`;
    return;
  }

  recent.reverse().forEach(incident => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${incident.location}</td>
      <td>${incident.area}</td>
      <td>${incident.type}</td>
      <td>${incident.casualties}</td>
      <td>${incident.equipment}</td>
      <td>${new Date(incident.timestamp).toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

displayIncidents();
