import BASE_URL from "./api";

export async function uploadDocument(file, token) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/documents/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  let data = {};

  try {
    data = await response.json();
  } catch (error) {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      typeof data.detail === "string"
        ? data.detail
        : data.detail?.message || "Upload failed"
    );
  }

  return data;
}

export async function getDocuments(token) {
  const response = await fetch(`${BASE_URL}/documents/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let data = {};

  try {
    data = await response.json();
  } catch (error) {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch documents");
  }

  return data;
}

export async function deleteDocument(documentId, token) {
  const response = await fetch(
    `${BASE_URL}/documents/${documentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let data = {};

  try {
    data = await response.json();
  } catch (error) {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.detail || "Delete failed");
  }

  return data;
}