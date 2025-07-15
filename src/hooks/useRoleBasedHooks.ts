import { useState, useEffect } from "react";
import useAuth from "./useAuth.hook";
import type { IRoles } from "@/types/auth.types";

// Generic hook for role-based features
export const useRoleBasedFeature = <T>(
  fetcher: () => Promise<T>,
  requiredRoles: IRoles[],
  dependencies: any[] = []
) => {
  const { canAccess } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canAccess(requiredRoles)) {
      setError("Insufficient permissions");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetcher();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [...dependencies, canAccess]);

  return { data, loading, error, canAccess: canAccess(requiredRoles) };
};

// Generic hook for role-based actions
export const useRoleBasedAction = <T extends any[], R>(
  action: (...args: T) => Promise<R>,
  requiredRoles: IRoles[]
) => {
  const { canAccess } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (...args: T): Promise<R | null> => {
    if (!canAccess(requiredRoles)) {
      setError("Insufficient permissions");
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await action(...args);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    loading,
    error,
    canExecute: canAccess(requiredRoles),
  };
};
