import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";

export const productSampleItems = [
  {
    id: 1,
    code: "  026090529058  ",
    brand: "VPC_Flow",
    name: "026090529058_241205_VPC_Flow_Log",
    price: 1550000,
    status: "SALE",
    createdAt: dayjs("2024-12-05T03:27:50+09:00"),
    updatedAt: dayjs("2024-12-05T03:27:50+09:00"),
  },
  {
    id: 2,
    code: "  026090529058 ",
    brand: "EKS",
    name: "026090529058_241205_EKS",
    price: 230000,
    status: "SALE",
    createdAt: dayjs("2024-12-05T10:22:50+09:00"),
    updatedAt: dayjs("2024-12-05T10:22:50+09:00"),
  },
  {
    id: 3,
    code: "  026090529058 ",
    brand: "Lambda",
    name: "026090529058_241205_Lambda",
    price: 1290000,
    status: "SOLDOUT",
    createdAt: dayjs("2024-12-05T12:47:50+09:00"),
    updatedAt: dayjs("2024-12-05T12:47:50+09:00"),
  },
  {
    id: 4,
    code: "  026090529058 ",
    brand: "VPC_Flow",
    name: "026090529058_241206_VPC_Flow_Log",
    price: 47000,
    status: "NOTSALE",
    createdAt: dayjs("2024-12-06T12:37:50+09:00"),
    updatedAt: dayjs("2024-12-06T12:37:50+09:00"),
  },
  {
    id: 5,
    code: "  026090529058 ",
    brand: "EKS",
    name: "026090529058_241206_EKS",
    price: 60000,
    status: "SALE",
    createdAt: dayjs("2024-12-06T01:02:50+09:00"), 
    updatedAt: dayjs("2024-12-06T01:02:50+09:00"),
  },
  {
    id: 6,
    code: "  026090529058 ",
    brand: "Lambda",
    name: "026090529058_241206_Lambda",
    price: 25000,
    status: "SALE",
    createdAt: dayjs("2024-12-06T11:52:50+09:00"),
    updatedAt: dayjs("2024-12-06T11:52:50+09:00"),
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = req.query.page ? Number(req.query.page) : 1;

  res.status(200).json({
    code: 0,
    message: "OK",
    data: {
      items: page === 1 ? productSampleItems.slice(0, 5) : [productSampleItems[5]],
      page: {
        currentPage: page,
        pageSize: 5,
        totalPage: 1,
        totalCount: productSampleItems.length,
      },
    },
  });
}
