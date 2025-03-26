import aws4 from 'aws4';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // AWS Credentials (환경 변수에서 로드)
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    return res.status(500).json({ message: 'AWS credentials are not set' });
  }

  // AWS API 요청 구성
  const options = {
    host: 'ec2.ap-northeast-2.amazonaws.com',
    path: '/?Action=DescribeInstances&Version=2016-11-15',
    service: 'ec2',
    region: 'ap-northeast-2',
  };

  // 요청 서명 생성
  aws4.sign(options, { accessKeyId, secretAccessKey });

  try {
    // AWS API 호출
    const response = await fetch(`https://${options.host}${options.path}`, {
      method: 'GET',
      headers: options.headers,
    });

    if (!response.ok) {
      throw new Error(`AWS API error: ${response.statusText}`);
    }

    const data = await response.text(); // XML 응답 처리
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
