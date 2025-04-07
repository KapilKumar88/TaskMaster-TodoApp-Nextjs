import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderPinwheel, Plus, X } from 'lucide-react';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { AddCategoryFormState } from '@/lib/interfaces/server-action.interface';
import { ColorPicker } from '../color-picker';
import { addNewCategoryAction } from '@/server-actions/category.actions';
import { toast } from '../common/sonner';
import { ToastVariation } from '@/lib/enums';
import { useCategoryContext } from '@/contextApis/categories';

type CategoryFormDataType = {
  categoryColor: string;
  categoryName: string;
  categoryColorError?: string;
  categoryNameError?: string;
};

const FormInitialState: CategoryFormDataType = {
  categoryColor: '',
  categoryName: '',
  categoryNameError: '',
  categoryColorError: '',
};

export default function AddCategoryForm({
  closeForm,
}: Readonly<{
  closeForm: () => void;
}>) {
  const { setCategories } = useCategoryContext();
  const [addCategoryState, addCategoryAction, addCategoryPending] =
    useActionState<AddCategoryFormState, FormData>(addNewCategoryAction, {
      errors: {},
      formValues: {
        categoryName: '',
        categoryColor: '',
      },
      message: '',
      success: false,
    });

  const [trackCategoryFormData, setTrackCategoryFormData] =
    useState<CategoryFormDataType>(FormInitialState);

  useEffect(() => {
    if (addCategoryState?.errors) {
      setTrackCategoryFormData((previousState) => {
        return {
          ...previousState,
          categoryNameError:
            Array.isArray(addCategoryState?.errors?.categoryName) &&
            addCategoryState.errors.categoryName?.length > 0
              ? addCategoryState.errors.categoryName[0]
              : undefined,
          categoryColorError:
            Array.isArray(addCategoryState?.errors?.categoryColor) &&
            addCategoryState.errors.categoryColor?.length > 0
              ? addCategoryState.errors.categoryColor[0]
              : undefined,
        };
      });
    }

    if (addCategoryState?.success) {
      toast({
        variation: ToastVariation.SUCCESS,
        message: addCategoryState.message,
      });
      closeForm();
      setTrackCategoryFormData(FormInitialState);
      if (addCategoryState?.formValues) {
        setCategories((previousState) => {
          if (addCategoryState?.formValues?.id) {
            previousState.push({
              name: addCategoryState?.formValues?.categoryName,
              color: addCategoryState?.formValues?.categoryColor,
              id: addCategoryState?.formValues?.id,
            });
          }
          return previousState;
        });
      }
    }
  }, [addCategoryState]);

  return (
    <div className="p-4 border border-white/30 bg-white/30 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
          Add New Category
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          type="button"
          onClick={() => closeForm()}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <div className="space-y-3">
        <div className="space-y-2">
          <Label
            htmlFor="new-category"
            className="text-slate-900 dark:text-white"
          >
            Category Name
          </Label>
          <Input
            id="new-category"
            name="categoryName"
            placeholder="Enter category name"
            className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
            value={trackCategoryFormData.categoryName}
            onChange={(e) => {
              setTrackCategoryFormData((previousState) => {
                return {
                  ...previousState,
                  categoryName: e.target.value,
                  categoryNameError: undefined,
                };
              });
            }}
          />
          {trackCategoryFormData?.categoryNameError && (
            <p className="text-red-500 text-sm">
              {trackCategoryFormData?.categoryNameError}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-slate-900 dark:text-white">
            Category Color
          </Label>
          <ColorPicker
            value={trackCategoryFormData.categoryColor}
            onChange={(color) => {
              setTrackCategoryFormData((previousState) => {
                return {
                  ...previousState,
                  categoryColor: color,
                  categoryColorError: undefined,
                };
              });
            }}
          />
          {trackCategoryFormData?.categoryColorError && (
            <p className="text-red-500 text-sm">
              {trackCategoryFormData?.categoryColorError}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
          disabled={addCategoryPending}
          onClick={() => {
            startTransition(() => {
              const formData = new FormData();
              formData.append(
                'categoryName',
                trackCategoryFormData.categoryName,
              );
              formData.append(
                'categoryColor',
                trackCategoryFormData.categoryColor,
              );
              addCategoryAction(formData);
            });
          }}
        >
          {addCategoryPending && (
            <>
              <LoaderPinwheel className="mr-2 h-8 w-8 animate-spin" />
              Saving...
            </>
          )}
          {!addCategoryPending && (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
