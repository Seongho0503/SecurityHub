import { useDashboard } from "@/client/sample/dashboard";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import InstanceList from "@/components/page/management/instance-list";
import InstanceSearch from "@/components/page/management/instance-search";
import { useAuth } from "@/lib/auth/auth-provider";
import { Divider } from "antd";

const pageHeader: IPageHeader = {
  title: "Welcome",
};

const DashBoardListPage: IDefaultLayoutPage = () => {
  const { session } = useAuth();
  const { data, error } = useDashboard();

  return (
    <>
      <h2 className="title">👋 {session.user.name || "관리자"}님 안녕하세요!</h2>
      <h3 className="title">자원관리</h3>
      <InstanceSearch />
      <InstanceList />
      <Divider />
    </>
  );
};

DashBoardListPage.getLayout = getDefaultLayout;
DashBoardListPage.pageHeader = pageHeader;

export default DashBoardListPage;
