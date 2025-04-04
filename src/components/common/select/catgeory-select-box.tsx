import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { capitalizeFirstLetters } from '@/lib/utils';
import { PlusCircleIcon } from 'lucide-react';

export default function CategorySelectBox({
  categories,
  errorMsg,
}: Readonly<{
  categories: { id: number; name: string }[];
  defaultValue?: number;
  value?: number;
  errorMsg?: string;
}>) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Label htmlFor="category" className="text-slate-900 dark:text-white">
          Category <span className="text-red-500">*</span>
        </Label>
        <Button
          variant="ghost"
          size="icon"
          // onClick={onClose}
          className="h-6 w-6"
        >
          <PlusCircleIcon className="h-4 w-4" />
        </Button>
      </div>
      <Select
      // defaultValue={state.formValues?.categoryId}
      // value={formData?.categoryId}
      // onValueChange={(value) => {
      //   // setFormData((previousState) => {
      //   //   return {
      //   //     ...previousState,
      //   //     categoryId: value,
      //   //   };
      //   // });
      //   // handleInputChange('categoryId');
      // }}
      >
        <SelectTrigger
          id="category"
          name="categoryId"
          className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
        >
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
          {categories?.map((category) => (
            <SelectItem
              key={`category-${category.id}`}
              value={`${category.id}`}
            >
              {capitalizeFirstLetters(category.name)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </>
  );
}
