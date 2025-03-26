import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import ProductList from "@/components/page/sample/product/product-list";
import InstanceSearch from "@/components/page/management/instance-search";

const pageHeader: IPageHeader = {
  title: "자원관리",
};

const InstanceListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <InstanceSearch />
      <ProductList />
    </>
  );
};

InstanceListPage.getLayout = getDefaultLayout;
InstanceListPage.pageHeader = pageHeader;

export default InstanceListPage;
