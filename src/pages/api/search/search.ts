import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

// AWS SDK 설정
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ec2 = new AWS.EC2();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 쿼리 파라미터 가져오기
  const { searchText, searchType, status } = req.query;

  try {
    // EC2 검색 필터 설정
    const params: AWS.EC2.DescribeInstancesRequest = { Filters: [] };

    if (status && status !== "ALL") {
      params.Filters!.push({
        Name: "instance-state-name",
        Values: [status.toString().toLowerCase()],
      });
    }

    // AWS EC2 인스턴스 목록 가져오기
    const data = await ec2.describeInstances(params).promise();
    const instances: AWS.EC2.Instance[] =
      data.Reservations?.flatMap((reservation: AWS.EC2.Reservation) => reservation.Instances || []) || [];

    // 검색 필터 적용
    let filteredInstances = instances;
    if (searchText) {
      filteredInstances = instances.filter((instance: AWS.EC2.Instance) => {
        if (searchType === "instanceId") {
          return instance.InstanceId?.includes(searchText.toString());
        } else if (searchType === "productName") {
          return (
            instance.Tags?.some((tag: AWS.EC2.Tag) => tag.Key === "Name" && tag.Value?.includes(searchText.toString())) ??
            false
          );
        }
        return false;
      });
    }

    // JSON 응답 반환
    res.status(200).json(filteredInstances);
  } catch (error) {
    console.error("AWS EC2 검색 오류:", error);
    res.status(500).json({ error: "검색 중 오류 발생" });
  }
}
