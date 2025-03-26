import { Alert, Button, Dropdown, MenuProps, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";

// EC2 인스턴스 타입 정의
interface IEC2Instance {
  InstanceId: string;
  ImageId: string;
  StateName: string;
  LaunchTime: string;
  KeyName: string;
  OwnerId: string;
}

const InstanceList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [instances, setInstances] = useState<IEC2Instance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchInstances = useCallback(async () => {
    setIsLoading(true);
    try {
      // fromStatic 없이 credentials 직접 전달
      const client = new EC2Client({
        region: "ap-northeast-2",
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
        },
      });

      const command = new DescribeInstancesCommand({});
      const response = await client.send(command);
      const fetchedInstances: IEC2Instance[] = [];

      response.Reservations?.forEach(reservation => {
        const ownerId = reservation.OwnerId || "UnknownOwner";
        reservation.Instances?.forEach(instance => {
          fetchedInstances.push({
            InstanceId: instance.InstanceId || "Unknown",
            ImageId: instance.ImageId || "Unknown",
            StateName: instance.State?.Name || "Unknown",
            LaunchTime: instance.LaunchTime?.toISOString() || "",
            KeyName: instance.KeyName || "Unknown",
            OwnerId: ownerId,
          });
        });
      });

      setInstances(fetchedInstances);
    } catch (err) {
      setError("EC2 인스턴스 데이터를 불러오는 데 실패했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstances();
  }, [fetchInstances]);

  const handleChangePage = useCallback(
    (pageNumber: number) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: pageNumber },
      });
    },
    [router]
  );

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const modifyDropdownItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "statusUpdate",
        label: <a onClick={() => console.log(selectedRowKeys)}>상태수정</a>,
      },
    ],
    [selectedRowKeys]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<IEC2Instance> = [
    {
      key: "action",
      width: 120,
      align: "center",
      render: (_value: unknown, record: IEC2Instance) => (
        <span className="flex justify-center gap-2">
          <Link href={`/ec2/edit/${record.InstanceId}`} className="px-2 py-1 text-sm btn">
            수정
          </Link>
          <Popconfirm
            title="인스턴스를 삭제하시겠습니까?"
            onConfirm={() => alert("삭제")}
            okText="예"
            cancelText="아니오"
          >
            <a className="px-2 py-1 text-sm btn">삭제</a>
          </Popconfirm>
        </span>
      ),
    },
    {
      title: "Instance ID",
      dataIndex: "InstanceId",
      width: 180,
    },
    {
      title: "Owner ID",
      dataIndex: "OwnerId",
      width: 180,
    },
    {
      title: "Image ID",
      dataIndex: "ImageId",
      width: 160,
    },
    {
      title: "Instance State",
      dataIndex: "StateName",
      width: 140,
      align: "center",
    },
    {
      title: "Launch Time",
      dataIndex: "LaunchTime",
      width: 160,
      align: "center",
      render: (value: string) => (
        <div className="text-sm">
          <span className="block">{dayjs(value).format("YYYY/MM/DD")}</span>
          <span className="block">{dayjs(value).format("HH:mm")}</span>
        </div>
      ),
    },
    {
      title: "Key Name",
      dataIndex: "KeyName",
      width: 120,
      align: "center",
    },
  ];

  if (error) {
    return <Alert message={error} type="warning" />;
  }

  return (
    <>
      <DefaultTableBtn className="justify-between">
        <div>
          <Dropdown disabled={!hasSelected} menu={{ items: modifyDropdownItems }} trigger={["click"]}>
            <Button>일괄수정</Button>
          </Dropdown>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `${selectedRowKeys.length}건 선택` : ""}</span>
        </div>

        <div className="flex-item-list">
          <Button className="btn-with-icon" icon={<Download />}>
            엑셀 다운로드
          </Button>
          <Button type="primary" onClick={() => router.push("/ec2/new")}>
            인스턴스 등록
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable<IEC2Instance>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={instances}
        loading={isLoading}
        pagination={{
          current: Number(router.query.page || 1),
          defaultPageSize: 5,
          total: instances.length,
          showSizeChanger: false,
          onChange: handleChangePage,
        }}
        className="mt-3"
        countLabel={instances.length}
      />
    </>
  );
};

export default React.memo(InstanceList);