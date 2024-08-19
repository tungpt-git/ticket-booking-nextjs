import { useEffect, useRef, useState, useTransition } from "react";

export function useServerAction(action: any, onFinished = (result: any) => {}) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<any>(null);
  const [finished, setFinished] = useState(false);
  const resolver = useRef<Function | null>(null);

  useEffect(() => {
    if (!finished) return;

    if (onFinished) onFinished?.(result);
    resolver?.current?.(result);
  }, [result, finished]);

  const runAction = (...args: Parameters<typeof action>) => {
    startTransition(async () => {
      const data = await action(...args);

      setResult(data);
      setFinished(true);
    });

    return new Promise((resolve, reject) => {
      resolver.current = resolve;
    });
  };

  return [runAction, isPending] as const;
}
