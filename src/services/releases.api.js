import api from "./api";

export async function getAllReleases() {
  const res = await api.get("/releases");
  return res.data;
}

export async function getReleaseById(id) {
  const res = await api.get(`/releases/${id}`);
  return res.data;
}

export async function createRelease(newRelease) {
  const res = await api.post("/releases", newRelease);
  return res.data;
}

export async function updateRelease(id, updatedFields) {
  const res = await api.patch(`/releases/${id}`, updatedFields);
  return res.data;
}

export async function deleteRelease(id) {
  const res = await api.delete(`/releases/${id}`);
  return res.data;
}
