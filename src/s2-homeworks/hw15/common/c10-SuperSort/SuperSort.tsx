import React from "react";
import { SortParamType } from "s2-homeworks/hw15/HW15";

// добавить в проект иконки и импортировать
const downIcon = "[\\/]";
const upIcon = "[/\\]";
const noneIcon = "[--]";

export type SuperSortPropsType = {
  id?: string;
  sort: SortParamType;
  value: string;
  onChange: (newSort: SortParamType) => void;
};

export const pureChange = (
  sort: SortParamType,
  down: SortParamType,
  up: SortParamType
): SortParamType => {
  // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
  if (sort !== up && sort !== down) return down;
  if (sort === "") return down;
  if (sort.includes("1")) return up;
  return ""; // исправить
};

const SuperSort: React.FC<SuperSortPropsType> = ({
  sort,
  value,
  onChange,
  id = "hw15",
}) => {
  const up = ("0" + value) as SortParamType;
  const down = ("1" + value) as SortParamType;

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up));
  };

  const icon = sort === down ? downIcon : sort === up ? upIcon : noneIcon;

  return (
    <span id={id + "-sort-" + value} onClick={onChangeCallback}>
      {/*сделать иконку*/}
      {/*<img*/}
      {/*    id={id + '-icon-' + sort}*/}
      {/*    src={icon}*/}
      {/*/>*/}
      {icon} {/*а это убрать*/}
    </span>
  );
};

export default SuperSort;
