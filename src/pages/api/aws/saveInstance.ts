import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { EC2Client, DescribeInstancesCommand, Instance, Reservation } from "@aws-sdk/client-ec2";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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

    // ✅ `instances` 배열의 타입 명시
    const instances: {
      instanceId: string;
      imageId: string;
      stateName: string;
      launchTime: Date;
      keyName: string;
      ownerId: string;
    }[] = [];

    response.Reservations?.forEach((reservation: Reservation) => {
      reservation.Instances?.forEach((instance: Instance) => {
        instances.push({
          instanceId: instance.InstanceId || "Unknown",
          imageId: instance.ImageId || "Unknown",
          stateName: instance.State?.Name || "Unknown",
          launchTime: instance.LaunchTime ? new Date(instance.LaunchTime) : new Date(),
          keyName: instance.KeyName || "Unknown",
          ownerId: reservation.OwnerId || "UnknownOwner",
        });
      });
    });

    // DB 저장
    await prisma.eC2Instance.createMany({
      data: instances,
      skipDuplicates: true, // 중복 저장 방지
    });

    return res.status(200).json({ message: "EC2 인스턴스 저장 완료", count: instances.length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "EC2 인스턴스 저장 실패" });
  }
}
