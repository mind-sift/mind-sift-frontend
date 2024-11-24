interface ListItemProps {
  title: string;
  app: string; 
  description: string;
  dismissable?: boolean;
  reason?: string;
  confidence?: number;
}

export function ListItem({ title, app, description, dismissable, reason, confidence }: ListItemProps) {
  return (
    <div className={`p-4 rounded-lg transition-colors ${
      dismissable
        ? "bg-red-50 hover:bg-red-100 dark:bg-red-700/50 dark:hover:bg-red-600"
        : "bg-green-50 hover:bg-green-100 dark:bg-green-700/50 dark:hover:bg-green-600"
    }`}>
      <div className="mb-4 flex flex-row justify-between align-center">
        <h3 className="font-medium text-gray-1000">{title}</h3>
        <h3 className="font-medium text-gray-900">{app}</h3>
      </div>
      <p className="text-sm text-gray-600 my-2">{description}</p>
      <p className="text-xs text-gray-500">Confianza: {(confidence as number * 100).toFixed(0)}%</p>
      <p className="text-xs text-gray-500">Razón: {reason}</p>
    </div>
  );
}