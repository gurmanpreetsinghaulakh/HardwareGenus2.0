'use client'
import { useState } from 'react';

export const useSelectedCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const updateSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  return [selectedCategory, updateSelectedCategory];
};

