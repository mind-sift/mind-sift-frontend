"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface ToggleListItemProps {
  title: string;
  description: string;
  active: boolean;
  onToggle: (active: boolean) => Promise<void>;
}

export function ToggleListItem({ title, description, active, onToggle }: ToggleListItemProps) {
  const [enabled, setEnabled] = useState(active);
  const [hasTime, setHasTime] = useState(false);
  const [time, setTime] = useState("12:00");

  const handleToggle = async (checked: boolean) => {
    setEnabled(checked);
    if (!checked) {
      setHasTime(false);
    }
    await onToggle(checked);
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{description}</p>
        {enabled && (
          <div className="mt-2 flex items-center gap-2">
            <label className="text-sm text-gray-500 dark:text-gray-400">
              <input
                type="checkbox"
                checked={hasTime}
                onChange={(e) => setHasTime(e.target.checked)}
                className="mr-2"
              />
              Set time
            </label>
            {hasTime && (
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="px-2 py-1 text-sm border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            )}
          </div>
        )}
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={handleToggle}
        className="ml-4"
      />
    </div>
  );
}