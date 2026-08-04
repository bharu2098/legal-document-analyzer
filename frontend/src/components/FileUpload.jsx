import { useRef, useState } from "react";

function FileUpload({
  fetchDocuments,
  setSelectedDocument,
}) {

  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // ============================================
  // Open File Picker
  // ============================================

  const handleClick = () => {

    if (!uploading) {
      fileInputRef.current.click();
    }

  };

  // ============================================
  // Validate File
  // ============================================

  const validateFile = (file) => {

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {

      alert("❌ Only PDF and DOCX legal documents are supported.");

      return false;

    }

    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {

      alert("❌ Maximum file size is 20 MB.");

      return false;

    }

    return true;

  };

  // ============================================
  // Upload File
  // ============================================

  const uploadFile = async (file, inputElement = null) => {
        if (!validateFile(file)) {

      if (inputElement) {
        inputElement.value = "";
      }

      return;

    }

    const token = localStorage.getItem("token");

    if (!token) {

      alert("❌ Please login first.");

      return;

    }

    const formData = new FormData();

    formData.append("file", file);

    setUploading(true);

    try {

      // ============================================
      // Upload Document
      // ============================================

      const response = await fetch(
        "https://shimmering-sparkle-production-88ac.up.railway.app/documents/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      // ============================================
      // Upload Failed
      // ============================================

      if (!response.ok) {

        let message =
          "❌ Upload failed. Please upload a valid legal document.";

        if (typeof data.detail === "string") {

          message = data.detail;

        }

        else if (
          typeof data.detail === "object" &&
          data.detail !== null
        ) {

          message =
            `❌ ${data.detail.message}\n\n` +
            `📄 Detected Document : ${data.detail.detected_document_type}\n` +
            `🎯 Confidence : ${data.detail.confidence}%\n\n` +
            `📝 Reason:\n${data.detail.reason}`;

        }

        alert(message);

        if (inputElement) {
          inputElement.value = "";
        }

        return;

      }

      // ============================================
      // Refresh Documents
      // ============================================

      const docsResponse = await fetch(
        "https://shimmering-sparkle-production-88ac.up.railway.app/documents/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const docs = await docsResponse.json();

      if (docsResponse.ok) {

        fetchDocuments();

        const uploadedDoc = docs.find(
          (doc) => doc.id === data.document_id
        );

        if (uploadedDoc) {
          setSelectedDocument(uploadedDoc);
        }

        alert("✅ Legal document uploaded successfully.");

      }

      else {

        alert(
          "⚠️ Document uploaded successfully, but failed to refresh the document list."
        );

      }

    }

    catch (error) {

      console.error(error);

      alert("❌ Unable to connect to the server.");

    }

    finally {

      setUploading(false);

      if (inputElement) {
        inputElement.value = "";
      }

    }

  };

  // ============================================
  // File Input Change
  // ============================================

  const handleFileChange = async (e) => {
        const file = e.target.files[0];

    if (!file) return;

    uploadFile(file, e.target);

  };

  // ============================================
  // Drag & Drop
  // ============================================

  const handleDrop = (e) => {

    e.preventDefault();

    setDragActive(false);

    const file = e.dataTransfer.files[0];

    if (!file) return;

    uploadFile(file);

  };

  const handleDragOver = (e) => {

    e.preventDefault();

    setDragActive(true);

  };

  const handleDragLeave = () => {

    setDragActive(false);

  };

  // ============================================
  // UI
  // ============================================

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={handleClick}
        disabled={uploading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:bg-slate-300"
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </button>
    </div>
  );

}

export default FileUpload;