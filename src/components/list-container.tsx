interface ListContainerProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}

export function ListContainer({ children, title, icon }: ListContainerProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        {icon}
        <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      <div className="max-h-[65vh] overflow-y-auto space-y-4">{children}</div>
    </div>
  );
}