import BASE_URL from "./api";

export async function askQuestion(
  documentId,
  question,
  token
) {
  const response = await fetch(`${BASE_URL}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      document_id: documentId,
      question,
    }),
  });

  let data = {};

  try {
    data = await response.json();
  } catch (error) {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.detail || "Chat failed");
  }

  return data;
}