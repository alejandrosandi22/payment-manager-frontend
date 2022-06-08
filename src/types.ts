type ClientsType = {
  name: string;
  id: number;
  payment: number;
  date?: Date | string | undefined;
};

type RefetchType = {
  data: ClientsType[];
  loading: boolean;
  refetch: () => void;
};

export type { ClientsType, RefetchType };
