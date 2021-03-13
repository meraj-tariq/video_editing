import { useState, useRef } from "react";

type UnPromisify<T> = T extends Promise<infer U> ? U : T;

type TOnError = (error: any) => void;

type TOnSuccess<T> = (data: T) => void;

type TOnDone = () => void;

function useService<
  F extends (...args: any[]) => Promise<any>,
  T = UnPromisify<ReturnType<F>>
>(service: F) {
  const currentRequestId = useRef<number | null>();
  const currentOnError = useRef<TOnError | null>();
  const currentOnSuccess = useRef<TOnSuccess<T> | null>();
  const currentOnDone = useRef<TOnDone | null>();
  const [data, setData] = useState<T>();
  const [asyncError, setAsyncError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  const onDone = (handler: TOnDone) => {
    currentOnDone.current = handler;
  };

  const onError = (handler: TOnError) => {
    currentOnError.current = handler;

    return { onDone };
  };

  const onSuccess = (handler: TOnSuccess<T>) => {
    currentOnSuccess.current = handler;

    return { onError, onDone };
  };

  const call = (...args: Parameters<F>) => {
    setIsLoading(true);

    const requestId = Date.now();
    currentRequestId.current = requestId;

    service(...args)
      .then((res) => {
        if (requestId !== currentRequestId.current) return;

        setIsLoading(false);
        setData(res);

        currentOnSuccess.current?.(res);
      })
      .catch((error) => {
        if (requestId !== currentRequestId.current) return;

        setIsLoading(false);
        setAsyncError(error);

        currentOnError.current?.(error);
      })
      .finally(() => {
        currentOnDone.current?.();
      });

    return { onError, onSuccess };
  };

  const result = {
    call,
    data,
    setData,
    isLoading,
    error: asyncError,
  };

  return result;
}

export default useService;
