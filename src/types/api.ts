type Result = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<any>;
  total: number;
};

type ApiResponse = {
  result: Result;
  error: string | null;
};

export type { ApiResponse };
