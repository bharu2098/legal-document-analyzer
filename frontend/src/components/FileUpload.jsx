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

    // Allow only PDF, DOC and DOCX
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
  "❌ Only legal PDF and DOCX documents are allowed."
);
      e.target.value = "";
      return;
    }

    // Maximum file size (20 MB)
    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert("❌ File size must be less than 20 MB.");
      e.target.value = "";
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://legal-document-analyzer-production-bf96.up.railway.app/documents/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
  alert(
    data.detail ||
      "❌ Upload failed. Please upload a valid legal document."
  );

  e.target.value = "";
  return;
}

      // Refresh document list
      const docsResponse = await fetch(
        "https://legal-document-analyzer-production-bf96.up.railway.app/documents/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const docs = await docsResponse.json();

      if (docsResponse.ok) {
        fetchDocuments();

        // Automatically select uploaded document
        const uploadedDoc = docs.find(
          (doc) => doc.id === data.id
        );

        if (uploadedDoc) {
          setSelectedDocument(uploadedDoc);
        }

        alert("✅ Document uploaded successfully.");
      } else {
        alert("⚠️ Uploaded successfully, but failed to refresh document list.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Unable to contact the server.");
    } finally {
      // Clear input so the same file can be uploaded again
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
  Supports only legal PDF and DOCX documents (Contracts, Agreements, NDAs, Lease Agreements, Court Orders, Legal Notices, etc.)
</p>
    </div>
  );
}

export default FileUpload;