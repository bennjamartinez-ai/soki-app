import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getStoreSettings,
  updateStoreSetting,
} from "../services/storeSettings";

const StoreSettingsContext =
  createContext();

export function StoreSettingsProvider({
  children,
}) {
  const [settings, setSettings] =
    useState({});

  const [draft, setDraft] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  async function reloadSettings() {
    try {
      const data =
        await getStoreSettings();

      setSettings(data);
      setDraft(data);
    } finally {
      setLoading(false);
    }
  }

  function updateDraft(key, value) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function saveChanges() {
    setSaving(true);

    try {
      const changes = Object.entries(
        draft
      ).filter(
        ([key, value]) =>
          settings[key] !== value
      );

      for (const [key, value] of changes) {
        await updateStoreSetting(
          key,
          value
        );
      }

      setSettings(draft);

    } finally {
      setSaving(false);
    }
  }

  function discardChanges() {
    setDraft(settings);
  }

  const hasChanges =
    JSON.stringify(settings) !==
    JSON.stringify(draft);

  useEffect(() => {
    reloadSettings();
  }, []);

  return (
    <StoreSettingsContext.Provider
      value={{
        loading,
        saving,

        settings: draft,

        hasChanges,

        updateDraft,

        saveChanges,

        discardChanges,

        reloadSettings,
      }}
    >
      {children}
    </StoreSettingsContext.Provider>
  );
}

export function useStoreSettings() {
  return useContext(
    StoreSettingsContext
  );
}