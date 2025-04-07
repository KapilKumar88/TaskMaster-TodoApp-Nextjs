'use client';
import {
  createContext,
  Dispatch,
  JSX,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

type Category = {
  id: number;
  name: string;
  color: string;
};

export type CategoriesContextType = {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
};

export const CategoryContext = createContext<CategoriesContextType | null>(
  null,
);

export const CategoryContextProvider = ({
  categoriesList,
  children,
}: {
  children: React.ReactNode;
  categoriesList: Category[];
}): JSX.Element => {
  const [categories, setCategories] = useState<Array<Category>>(categoriesList);

  const value = useMemo(
    () => ({
      categories,
      setCategories,
    }),
    [categories, setCategories],
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = (): CategoriesContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      'useCategoryContext must be used within an CategoryContextProvider',
    );
  }
  return context;
};
