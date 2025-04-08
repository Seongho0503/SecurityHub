import { NextApiRequest, NextApiResponse } from "next";
import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import cron from "node-cron";

//  lib/db.js를 통해 DB 커넥션 가져오기
const db = require("../../lib/db");

const fetchAndStoreEC2Instances = async () => {
  const client = new EC2Client({
    region: "ap-northeast-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });

  try {
    const command = new DescribeInstancesCommand({});
    const response = await client.send(command);

    //  MySQL에 삽입할 데이터 구성
    const instances: any[] = [];

    response.Reservations?.forEach((reservation) => {
      reservation.Instances?.forEach((instance) => {
        instances.push([
          instance.InstanceId || "Unknown",
          instance.ImageId || "Unknown",
          instance.State?.Name || "Unknown",
          instance.LaunchTime ? new Date(instance.LaunchTime) : new Date(),
          instance.KeyName || "Unknown",
          reservation.OwnerId || "UnknownOwner",
        ]);
      });
    });

    if (instances.length === 0) {
      console.log("저장할 EC2 인스턴스가 없습니다.");
      return;
    }

    //  MySQL insert 쿼리
    const sql = `
      INSERT INTO ec2_instance (instanceId, imageId, stateName, launchTime, keyName, ownerId)
      VALUES ?
    `;

    //  db.query로 저장
    db.query(sql, [instances], (err: any, result: any) => {
      if (err) {
        console.error("EC2 인스턴스 저장 실패:", err);
      } else {
        console.log(`[${new Date().toISOString()}] EC2 인스턴스 ${instances.length}건 저장 완료`);
      }
    });

  } catch (error) {
    console.error("EC2 인스턴스 저장 중 예외 발생:", error);
  }
};

// 2주마다 실행 (0 0 */14 * *)
cron.schedule("0 0 */14 * *", async () => {
  console.log("EC2 인스턴스 저장 작업 시작...");
  await fetchAndStoreEC2Instances();
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ message: "EC2 인스턴스 자동 저장 스케줄러 실행 중" });
}
