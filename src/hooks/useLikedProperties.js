import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'dk_liked_properties';

const readFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeToStorage = (ids) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
};

export const useLikedProperties = () => {
  const [likedIds, setLikedIds] = useState(() => readFromStorage());

  // Keep state in sync if another tab changes storage
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setLikedIds(readFromStorage());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const isLiked = useCallback((id) => likedIds.includes(String(id)), [likedIds]);

  const toggleLike = useCallback((id) => {
    const strId = String(id);
    setLikedIds((prev) => {
      const next = prev.includes(strId)
        ? prev.filter((x) => x !== strId)
        : [...prev, strId];
      writeToStorage(next);
      return next;
    });
  }, []);

  return { likedIds, isLiked, toggleLike };
};
