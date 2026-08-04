import {
  createContext,
  useContext,
  useState,
} from "react";

import useAuth from "../hooks/useAuth";

import {
  uploadDocument,
  getDocuments,
  deleteDocument,
} from "../services/document";

const DocumentContext = createContext();

export function DocumentProvider({ children }) {
  const { token } = useAuth();

  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchDocuments() {
    if (!token) return;

    try {
      setLoading(true);

      const docs = await getDocuments(token);

      setDocuments(docs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function upload(file) {
    if (!token) return;

    await uploadDocument(file, token);

    await fetchDocuments();
  }

  async function remove(documentId) {
    if (!token) return;

    await deleteDocument(documentId, token);

    if (
      selectedDocument &&
      selectedDocument.id === documentId
    ) {
      setSelectedDocument(null);
    }

    await fetchDocuments();
  }

  return (
    <DocumentContext.Provider
      value={{
        documents,
        selectedDocument,
        setSelectedDocument,
        fetchDocuments,
        upload,
        remove,
        loading,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument() {
  return useContext(DocumentContext);
}