function LegalInsights({
  selectedDocument,
  legalSummary,
}) {
  if (!selectedDocument) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <div className="text-center">

          <div className="mb-5 text-5xl">
            📄
          </div>

          <h2 className="text-xl font-bold text-white">
            AI Legal Insights
          </h2>

          <p className="mt-3 text-gray-400">
            Select a document to view
            AI-generated legal insights.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900">

      {/* Header */}

      <div className="border-b border-slate-800 p-5">

        <h2 className="text-xl font-bold text-white">
          📄 AI Legal Insights
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Generated from the uploaded document
        </p>

      </div>

      {/* Content */}

      <div className="flex-1 overflow-y-auto p-6">

        {legalSummary ? (

          <div className="prose prose-invert max-w-none">

            <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-gray-300">
              {legalSummary}
            </pre>

          </div>

        ) : (

          <div className="flex h-full items-center justify-center">

            <p className="text-gray-500">
              No legal insights available.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default LegalInsights;