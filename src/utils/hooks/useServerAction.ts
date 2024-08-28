import { useEffect, useRef, useState, useTransition } from "react";

export function useServerAction(action: any, onFinished = (result: any) => {}) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<any>(null);
  const [finished, setFinished] = useState(false);
  const resolver = useRef<Function | null>(null);
  const rejecter = useRef<Function | null>(null);
  const onFinishedRef = useRef<Function | null>(null);
  onFinishedRef.current = onFinished;
  const mounted = useRef(true);

  useEffect(() => {
    if (!mounted.current) {
      return;
    }
    mounted.current = true;
    if (onFinishedRef.current) onFinishedRef.current?.(result);
    if (result?.error) {
      rejecter.current?.(result.error);
    } else {
      resolver?.current?.(result);
    }
  }, [result, finished]);

  const runAction = (...args: Parameters<typeof action>) => {
    startTransition(async () => {
      try {
        const data = await action(...args);

        setResult({ data });
      } catch (error) {
        setResult({ error });
      } finally {
        setFinished((prev) => !prev);
      }
    });

    return new Promise((resolve, reject) => {
      resolver.current = resolve;
      rejecter.current = reject;
    });
  };

  return [runAction, isPending] as const;
}
