import React from "react";
import { SearchBarProps } from "./SearchBar.type";
import Input from "../../Atoms/Inputs";
import Form from "../../Atoms/Form/Index";
import Button from "../../Atoms/Button";
import { searchBarSchema } from "@/common/validation/searchBar.yup";
import module from "./SearchBar.module.css";
import classNames from "classnames";
import useSearchBar from "@/hooks/custom/useSearchBar";

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const { setUseFormReturnMethod } = useSearchBar();
  return (
    <Form
      onSubmit={onSubmit}
      schema={searchBarSchema}
      mode="onSubmit"
      setUseFormReturnMethod={setUseFormReturnMethod}
    >
      <div className={classNames(module.searchBar_wrapper)}>
        <Input
          label="search"
          name="search"
          id="search"
          placeholder="태그를 입력해주세요."
        />
        <div className={classNames("p-[1px]")}>
          <Button label="검색" variant="primary" size="medium" />
        </div>
      </div>
    </Form>
  );
};

export default SearchBar;
