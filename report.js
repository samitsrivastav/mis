const tableBody = document.querySelector("#reportTable tbody");

function getFilteredIncidents(filter) {
  const data = JSON.parse(localStorage.getItem("incidents") || "[]");
  const now = new Date();

  return data.filter(item => {
    const incidentDate = new Date(item.timestamp);
    if (filter === "daily") {
      return incidentDate.toDateString() === now.toDateString();
    }
    if (filter === "weekly") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return incidentDate >= oneWeekAgo;
    }
    if (filter === "monthly") {
      return incidentDate.getMonth() === now.getMonth() && incidentDate.getFullYear() === now.getFullYear();
    }
    if (filter === "yearly") {
      return incidentDate.getFullYear() === now.getFullYear();
    }
    return true;
  });
}

function loadIncidents(filter = "weekly", city = null) {
  const incidents = getFilteredIncidents(filter).reverse();
  tableBody.innerHTML = "";

  const filtered = city ? incidents.filter(i => i.location === city) : incidents;

  if (filtered.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" class="empty">No incidents found.</td></tr>`;
    return;
  }

  filtered.forEach(incident => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="clickable" onclick="loadIncidents('${filter}', '${incident.location}')">${incident.location}</td>
      <td>${incident.area}</td>
      <td>${incident.type}</td>
      <td>${incident.casualties}</td>
      <td>${incident.equipment}</td>
      <td>${incident.incidentTime || '-'}</td>
      <td>${new Date(incident.timestamp).toLocaleDateString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

loadIncidents(); // Load weekly by default
