const form = document.getElementById("incidentForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newIncident = {
    location: form.location.value,
    area: form.area.value,
    type: form.type.value,
    casualties: form.casualties.value,
    equipment: form.equipment.value,
    timestamp: new Date().toISOString(),
  };

  const existing = JSON.parse(localStorage.getItem("incidents") || "[]");
  existing.push(newIncident);
  localStorage.setItem("incidents", JSON.stringify(existing));

  alert("Incident recorded!");
  form.reset();
});
