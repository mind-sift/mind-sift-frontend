"use client";

import { ListContainer } from '@/components/list-container';
import { ListItem } from '@/components/list-item';
import { ToggleListItem } from '@/components/toggle-list-item';
import { Boxes, ShieldCheck, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { MultiSelect } from "@/components/multi-select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isInputPhase, setIsInputPhase] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoryInputs, setCategoryInputs] = useState<Record<string, string>>({});

  const handleInputChange = (category: string, value: string) => {
    setCategoryInputs(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleNext = () => {
    if (currentPage === selectedCategories.length - 1) {
      // Last page - close modal and reset states
      setOpen(false);
      setIsInputPhase(false);
      setCurrentPage(0);
      setSelectedCategories([]);
      setCategoryInputs({});
      console.log('Final inputs:', categoryInputs);
    } else {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPage === 0) {
      setIsInputPhase(false);
      setCurrentPage(0);
    } else {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="w-16"></div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center">
            Mind Sift Dashboard
          </h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-800 max-w-2xl min-h-[300px]">
              <DialogHeader>
                <DialogTitle>
                  {isInputPhase 
                    ? `Configuración categoría - ${selectedCategories[currentPage].charAt(0).toUpperCase() + selectedCategories[currentPage].slice(1)}`
                    : "Configurar categorías"
                  }
                </DialogTitle>
              </DialogHeader>
              
              {!isInputPhase ? (
                <>
                  <Command className="rounded-lg border shadow-md">
                    <div className="bg-white">
                      <MultiSelect 
                        selected={selectedCategories}
                        onRemove={(value: string) => 
                          setSelectedCategories(prev => 
                            prev.filter(item => item !== value)
                          )
                        }
                        placeholder="Buscar categorías..."
                        value={searchValue}
                        onValueChange={setSearchValue}
                      />
                    </div>
                    <CommandEmpty>No se encontraron categorías.</CommandEmpty>
                    <CommandGroup className="bg-white">
                      {[
                        { value: "trabajo", label: "Tareas de trabajo" },
                        { value: "personal", label: "Tareas personales" },
                        { value: "compras", label: "Lista de compras" },
                        { value: "ideas", label: "Ideas & brainstorming" },
                        { value: "objetivos", label: "Objetivos & metas" },
                        { value: "salud", label: "Salud & fitness" }
                      ].map((category) => (
                        <CommandItem
                          key={category.value}
                          onSelect={() => {
                            setSelectedCategories((prev) => {
                              if (prev.includes(category.value)) {
                                return prev.filter((item) => item !== category.value);
                              }
                              return [...prev, category.value];
                            });
                          }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-4 h-4 border rounded flex items-center justify-center">
                            {selectedCategories.includes(category.value) && "✓"}
                          </div>
                          {category.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                  <div className="flex justify-end mt-4">
                    <Button 
                      disabled={selectedCategories.length === 0}
                      onClick={() => {
                        setIsInputPhase(true);
                        setCurrentPage(0);
                      }}
                      variant="default"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Siguiente
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {`Página ${currentPage + 1} de ${selectedCategories.length}`}
                      </label>
                      <Textarea
                        placeholder={`Ingrese descripción para definir la categoría ${selectedCategories[currentPage]}`}
                        value={categoryInputs[selectedCategories[currentPage]] || ""}
                        onChange={(e) => handleInputChange(selectedCategories[currentPage], e.target.value)}
                        className="min-h-[150px]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button 
                      variant="outline"
                      onClick={handleBack}
                    >
                      Volver
                    </Button>
                    <Button 
                      onClick={handleNext}
                      variant="default"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      disabled={!categoryInputs[selectedCategories[currentPage]]?.trim()}
                    >
                      {currentPage === selectedCategories.length - 1 ? 'Confirmar' : 'Continuar'}
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
        
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