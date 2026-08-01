import { useRef } from "react";

function FileUpload({
  fetchDocuments,
  setSelectedDocument,
}) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // ==========================================
    // Allowed File Types
    // ==========================================

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "❌ Only PDF and DOCX files are supported."
      );

      e.target.value = "";
      return;
    }

    // ==========================================
    // Max File Size (20MB)
    // ==========================================

    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert("❌ File size must be less than 20 MB.");

      e.target.value = "";
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ Please login first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // ==========================================
      // Upload Document
      // ==========================================

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

      // ==========================================
      // Upload Failed
      // ==========================================

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
            `📄 Detected Document: ${data.detail.detected_document_type}\n` +
            `🎯 Confidence: ${data.detail.confidence}%\n\n` +
            `📝 Reason:\n${data.detail.reason}`;
        }

        alert(message);

        e.target.value = "";
        return;
      }

      // ==========================================
      // Refresh Document List
      // ==========================================

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

        // Select uploaded document automatically

        const uploadedDoc = docs.find(
          (doc) =>
            doc.id === data.document_id
        );

        if (uploadedDoc) {
          setSelectedDocument(uploadedDoc);
        }

        alert("✅ Legal document uploaded successfully.");
      } else {
        alert(
          "⚠️ Document uploaded successfully, but failed to refresh the document list."
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "❌ Unable to connect to the server."
      );
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />

      <button
        onClick={handleClick}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
      >
        ⚖️ Upload Legal Document
      </button>

      <p className="text-xs text-gray-500 mt-2 text-center">
        Supports legal PDF and DOCX documents such as Employment Contracts,
        NDAs, Rental Agreements, Lease Agreements, Court Orders,
        Legal Notices, Privacy Policies, Terms & Conditions,
        Partnership Agreements and other legal documents.
      </p>
    </div>
  );
}

export default FileUpload;