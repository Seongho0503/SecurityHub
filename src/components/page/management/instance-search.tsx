import { IProductFormValue } from "@/client/sample/product";
import DateRangeField from "@/components/shared/form/control/date-range-field";
import DefaultSearchForm from "@/components/shared/form/ui/default-search-form";
import FieldInline from "@/components/shared/form/ui/field-inline";
import FormSearch from "@/components/shared/form/ui/form-search";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

const statusOptions = [
  { label: "전체", value: "ALL" },
  { label: "EKS", value: "SALE" },
  { label: "VFC_Flow", value: "SOLDOUT" },
  { label: "Lambda", value: "NOTSALE" },
];

const InsatanceSearch = () => {
  const [form] = useForm();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);

  // 검색 실행 함수
  const handleFinish = useCallback(
    (formValue: IProductFormValue) => {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, ...formValue },
        },
        undefined,
        { shallow: true } // 새로고침 없이 쿼리 변경
      );
    },
    [router]
  );

  // URL 변경될 때 검색 요청 실행
  useEffect(() => {
    const fetchSearchResults = async () => {
      const { searchText, searchType, status } = router.query;
      if (!searchText) return; // 검색어 없으면 실행 X

      try {
        const response = await fetch(
          `/api/search?searchText=${searchText}&searchType=${searchType}&status=${status}`
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("검색 중 오류 발생:", error);
      }
    };

    fetchSearchResults();
  }, [router.query]);

  return (
    <DefaultSearchForm form={form} onFinish={handleFinish}>
      <FormSearch>
        <FieldInline>
          <Form.Item label="기간" name="searchDateType" initialValue="created">
            <Select dropdownMatchSelectWidth={false}>
              <Select.Option value="created">등록일자</Select.Option>
              <Select.Option value="updated">수정일자</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="searchDatePeriod">
            <DateRangeField />
          </Form.Item>
        </FieldInline>
        <div>
          <Form.Item name="status" label="서비스타입">
            <Checkbox.Group options={statusOptions} />
          </Form.Item>
        </div>
        <div>
          <FieldInline>
            <Form.Item label="검색조건" name="searchType" initialValue="productName">
              <Select dropdownMatchSelectWidth={false}>
                <Select.Option value="productName">로그명</Select.Option>
                <Select.Option value="brandName">브랜드명</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="searchText" className="grow">
              <Input placeholder="검색어를 입력해주세요" />
            </Form.Item>
          </FieldInline>
        </div>
        <div>
          <Form.Item name="productCode" label="Account ID">
            <Input.TextArea placeholder="복수입력시 쉼표(,) 또는 엔터(Enter)로 구분해주세요" />
          </Form.Item>
        </div>
      </FormSearch>
      <div className="flex justify-center gap-2">
        <Button htmlType="submit" className="btn-with-icon" icon={<Search />}>
          검색
        </Button>
        <Button className="btn-with-icon" onClick={() => form.resetFields()}>
          초기화
        </Button>
      </div>

      {/* 검색 결과 표시 */}
      <div className="mt-4">
  {searchResults.length > 0 ? (
    <ul>
      
    </ul>
  ) : (
    <p>검색 결과가 없습니다.</p>
  )}
</div>

    </DefaultSearchForm>
  );
};

export default React.memo(InsatanceSearch);
