import { searchBarSchemaType } from "@/common/validation/searchBar.yup";
import { SubmitHandler } from "react-hook-form";

export interface SearchBarProps {
  onSubmit: SubmitHandler<searchBarSchemaType>;
}
