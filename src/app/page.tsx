"use client";

import { ListContainer } from '@/components/list-container';
import { ListItem } from '@/components/list-item';
import { ToggleListItem } from '@/components/toggle-list-item';
import { Boxes, Plus, AlignLeft } from 'lucide-react';
import { useEffect } from 'react';
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
import { Textarea } from "@/components/ui/textarea";

interface ListItemType {
  id: number
  title: string
  description: string
}

const demoItems: ListItemType[] = [
  { id: 1, title: 'Project Planning', description: 'Define project scope and objectives' },
  { id: 2, title: 'Design Phase', description: 'Create wireframes and mockups' },
  { id: 3, title: 'Development', description: 'Implement core functionality' },
  { id: 4, title: 'Testing', description: 'Quality assurance and bug fixes' },
  { id: 5, title: 'Deployment', description: 'Launch to production environment' },
];

interface CategoryData {
  name: string
  description: string
  active: boolean
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isInputPhase, setIsInputPhase] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoryInputs, setCategoryInputs] = useState<Record<string, {description: string, active: boolean}>>({});

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then((data: CategoryData[]) => {
        setSelectedCategories(data.map(item => item.name));
        
        const inputs = data.reduce<Record<string, {description: string, active: boolean}>>((acc, item) => ({
          ...acc,
          [item.name]: {
            description: item.description,
            active: item.active
          }
        }), {});
        setCategoryInputs(inputs);
      });
  }, []);

  const handleInputChange = (category: string, value: string) => {
    setCategoryInputs(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        description: value
      }
    }));
  };

  const handleNext = async () => {
    if (currentPage === selectedCategories.length - 1) {
      const categories = selectedCategories.map(category => ({
        name: category,
        description: categoryInputs[category]?.description || '',
        active: categoryInputs[category]?.active ?? false
      }));

      await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify(categories)
      });
      
      setOpen(false);
      setIsInputPhase(false);
      setCurrentPage(0);
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
                        value={categoryInputs[selectedCategories[currentPage]]?.description || ""}
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
                      disabled={!categoryInputs[selectedCategories[currentPage]]?.description?.trim()}
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
            title="Mensajes"
            icon={<Boxes className="w-5 h-5 text-indigo-500" />}
          >
            {demoItems.map((item) => (
              <ListItem
                key={item.id}
                title={item.title}
                description={item.description}
              />
            ))}
          </ListContainer>

          <ListContainer
            title="Categorías"
            icon={<AlignLeft className="w-5 h-5 text-emerald-500" />}
          >
            {selectedCategories.map((item) => (
              <ToggleListItem
                key={item}
                title={item}
                description={categoryInputs[item]?.description || ""}
                active={categoryInputs[item]?.active || false}
                onToggle={async (active) => {
                  setCategoryInputs(prev => ({
                    ...prev,
                    [item]: {
                      ...prev[item],
                      active
                    }
                  }));
                  
                  await fetch('/api/categories', {
                    method: 'PUT',
                    body: JSON.stringify({ name: item, active })
                  });
                }}
              />
            ))}
          </ListContainer>
        </div>
      </div>
    </main>
  );
}