import React from "react";
import { FieldValues } from "react-hook-form";
import { SearchBarProps } from "./SearchBar.type";
import { Input } from "../../Atom/Input";
import { Form } from "../../Atom/Form/Index";
import { searchBarSchema } from "@/common/validation/searchBar.yup";
import { Button } from "../../Atom/Button";
import module from "./SearchBar.module.css";
import classNames from "classnames";

const SearchBar = <T extends FieldValues>({ onSubmit }: SearchBarProps<T>) => {
  return (
    <Form onSubmit={onSubmit} schema={searchBarSchema}>
      <div className={classNames(module.searchBar_wrapper)}>
        <Input
          label="search"
          name="search"
          id="search"
          placeholder="태그를 입력해주세요."
        />
        <Button label="검색" variant="primary" size="medium" />
      </div>
    </Form>
  );
};

export default SearchBar;
