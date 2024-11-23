"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface ToggleListItemProps {
  title: string;
  description: string;
}

export function ToggleListItem({ title, description }: ToggleListItemProps) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={setEnabled}
        className="ml-4"
      />
    </div>
  );
}