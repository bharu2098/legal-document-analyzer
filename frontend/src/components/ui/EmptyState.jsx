function EmptyState({
  title,
  description,
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">

      <h2 className="text-2xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-2 text-gray-400">
        {description}
      </p>

    </div>
  );
}

export default EmptyState;