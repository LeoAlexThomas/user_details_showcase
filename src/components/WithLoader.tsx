import ErrorMsg from "@/components/ErrorMsg";
import Loader from "@/components/Loader";
import useSWR, { KeyedMutator } from "swr";

function WithLoader<T>({
  apiUrl,
  children,
  customError,
  placeholder,
}: {
  apiUrl: string;
  children: ({
    data,
    mutate,
  }: {
    data: T;
    mutate: KeyedMutator<T>;
  }) => React.ReactNode;
  customError?: ({ err }: { err: { message: string } }) => React.ReactNode;
  placeholder?: React.ReactNode;
}) {
  const { data, error, mutate } = useSWR<T>(apiUrl);

  const isLoading = !data && !error;

  if (error) {
    return (
      customError?.({ err: error }) ?? (
        <ErrorMsg
          text={error.response?.data?.message ?? "Something went wrong"}
        />
      )
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return placeholder ?? <></>;
  }

  return <>{children({ data, mutate })}</>;
}

export default WithLoader;
