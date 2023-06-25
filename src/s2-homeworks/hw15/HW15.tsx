import React, { useEffect, useState } from "react";
import s2 from "../../s1-main/App.module.css";
import s from "./HW15.module.css";
import axios from "axios";
import SuperPagination from "./common/c9-SuperPagination/SuperPagination";
import { useSearchParams } from "react-router-dom";
import SuperSort from "./common/c10-SuperSort/SuperSort";

/*
 * 1 - дописать SuperPagination
 * 2 - дописать SuperSort
 * 3 - проверить pureChange тестами
 * 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
 * 4 - сделать стили в соответствии с дизайном
 * 5 - добавить HW15 в HW5/pages/JuniorPlus
 * */

type TechType = {
  id: number;
  tech: string;
  developer: string;
};

type ParamsType = {
  sort: SortParamType;
  page: number;
  count: number;
};

export type SortParamType =
  | `0${keyof TechType}`
  | `1${keyof TechType}`
  | string;

const getTechs = (params: Partial<ParamsType>) => {
  return axios
    .get<{ techs: TechType[]; totalCount: number }>(
      "https://samurai.it-incubator.io/api/3.0/homework/test3",
      { params }
    )
    .catch((e) => {
      alert(e.response?.data?.errorText || e.message);
    });
};

const HW15 = () => {
  const [sort, setSort] = useState<SortParamType>("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(4);
  const [idLoading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(100);
  const [searchParams, setSearchParams] = useSearchParams();
  const [techs, setTechs] = useState<TechType[]>([]);

  const sendQuery = (params: Partial<ParamsType>) => {
    setLoading(true);
    getTechs(params)
      .then((res) => {
        // делает студент
        // сохранить пришедшие данные
        res?.data?.techs && setTechs(res?.data?.techs);
        res?.data?.totalCount && setTotalCount(res?.data?.totalCount);
        //
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onChangePagination = (newPage: number, newCount: number) => {
    // делает студент
    setPage(newPage);
    setCount(newCount);
    sendQuery({ sort, page: newPage, count: newCount });
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set("page", `${newPage}`);
      newParams.set("count", `${newCount}`);
      return newParams;
    });
    //
  };

  const onChangeSort = (newSort: SortParamType) => {
    // делает студент
    setSort(newSort);
    setPage(1); // при сортировке сбрасывать на 1 страницу
    sendQuery({ page: 1, sort: newSort, count });
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newSort ? newParams.set("sort", `${newSort}`) : newParams.delete("sort");
      return newParams;
    });
    //
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    console.log("useEffect", params);
    sendQuery({
      page: params?.page ? +params.page : 1,
      count: params?.count ? +params.count : 4,
    });
    setPage(+params.page || 1);
    setCount(+params.count || 4);
  }, []);

  const mappedTechs = techs.map((t) => (
    <div key={t.id} className={s.row}>
      <div id={"hw15-tech-" + t.id} className={s.tech}>
        {t.tech}
      </div>

      <div id={"hw15-developer-" + t.id} className={s.developer}>
        {t.developer}
      </div>
    </div>
  ));

  return (
    <div id={"hw15"}>
      <div className={s2.hwTitle}>Homework #15</div>

      <div className={s2.hw}>
        {idLoading && (
          <div id={"hw15-loading"} className={s.loading}>
            Loading...
          </div>
        )}

        <SuperPagination
          page={page}
          itemsCountForPage={count}
          totalCount={totalCount}
          onChange={onChangePagination}
        />

        <div className={s.rowHeader}>
          <div className={s.techHeader}>
            tech
            <SuperSort sort={sort} value={"tech"} onChange={onChangeSort} />
          </div>

          <div className={s.developerHeader}>
            developer
            <SuperSort
              sort={sort}
              value={"developer"}
              onChange={onChangeSort}
            />
          </div>
        </div>

        {mappedTechs}
      </div>
    </div>
  );
};

export default HW15;
