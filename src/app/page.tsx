import { ListContainer } from '@/components/list-container';
import { ListItem } from '@/components/list-item';
import { ToggleListItem } from '@/components/toggle-list-item';
import { Boxes, ShieldCheck } from 'lucide-react';

const items = [
  { id: 1, title: 'Project Planning', description: 'Define project scope and objectives' },
  { id: 2, title: 'Design Phase', description: 'Create wireframes and mockups' },
  { id: 3, title: 'Development', description: 'Implement core functionality' },
  { id: 4, title: 'Testing', description: 'Quality assurance and bug fixes' },
  { id: 5, title: 'Deployment', description: 'Launch to production environment' },
];

const toggleItems = [
  { id: 1, title: 'Email Notifications', description: 'Receive updates via email' },
  { id: 2, title: 'Dark Mode', description: 'Toggle dark theme interface' },
  { id: 3, title: 'Auto-save', description: 'Automatically save changes' },
  { id: 4, title: 'Two-factor Auth', description: 'Enhanced security option' },
  { id: 5, title: 'Public Profile', description: 'Show profile to others' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Mind Sift Dashboard
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <ListContainer
            title="Notificaciones"
            icon={<Boxes className="w-5 h-5 text-indigo-500" />}
          >
            {items.map((item) => (
              <ListItem
                key={item.id}
                title={item.title}
                description={item.description}
              />
            ))}
          </ListContainer>

          <ListContainer
            title="Configuración"
            icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
          >
            {toggleItems.map((item) => (
              <ToggleListItem
                key={item.id}
                title={item.title}
                description={item.description}
              />
            ))}
          </ListContainer>
        </div>
      </div>
    </main>
  );
}