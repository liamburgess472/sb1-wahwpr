import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RecipeForm } from "./RecipeForm";
import { RecipeList } from "./RecipeList";
import { RecipeImportDialog } from "./RecipeImportDialog";
import { useAuth } from "@/contexts/AuthContext";

export function RecipeManager() {
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Recipes</h2>
        <div className="flex gap-3">
          <Button onClick={() => setShowImport(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Import from URL
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Recipe
          </Button>
        </div>
      </div>

      <RecipeList />
      
      <RecipeForm 
        open={showForm} 
        onOpenChange={setShowForm}
      />

      <RecipeImportDialog
        open={showImport}
        onOpenChange={setShowImport}
        influencerId="sarah-green" // Default influencer, you might want to make this selectable
      />
    </div>
  );
}