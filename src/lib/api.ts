import { toast } from "sonner";

export const catchErrors = (error: unknown) => {
  toast.error("Une erreur s'est produite");
  console.error(error);
};
