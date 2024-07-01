import React, { useState, useEffect } from "react";
import { Descriptions, Badge, Card } from "antd";
import TextTranslation from "../../Components/TextTranslation/TextTranslation";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });
  return (
    <Card loading={isLoading} style={{ width: "70%" }}>
      <Descriptions title="Thông tin người dùng" layout="vertical" bordered column={10}>
        <Descriptions.Item
          label={<TextTranslation textName="ClassInfo-Table-UserID.1" />}
          span={2}
        >
          votrung762
        </Descriptions.Item>
        <Descriptions.Item
          label={<TextTranslation textName="ClassInfo-Table-Name.1" />}
          span={4}
        >
          Võ Đình Trung
        </Descriptions.Item>
        <Descriptions.Item
          label={<TextTranslation textName="ClassInfo-Table-Status.1" />}
          span={4}
        >
          <Badge
            status="processing"
            text={<TextTranslation textName="ClassInfo-Table-Working.1" />}
          />
        </Descriptions.Item>

        <Descriptions.Item
          label={<TextTranslation textName="ClassInfo-Table-Faculty.1" />}
          span={4}
        >
          Khoa học máy tính
        </Descriptions.Item>

        <Descriptions.Item
          label={<TextTranslation textName="ClassInfo-Table-Email.1" />}
          span={4}
        >
          22521571@gm.uit.edu.vn
        </Descriptions.Item>
        <Descriptions.Item
          label={<TextTranslation textName="ClassInfo-Table-NationalID.1" />}
          span={2}
        >
          058204001207
        </Descriptions.Item>

        <Descriptions.Item
          label={<TextTranslation textName="ClassInfo-Table-Address.1" />}
          span={6}
        >
          65 Linh Đông, phường Linh Đông, Thủ Đức
        </Descriptions.Item>
        <Descriptions.Item
          label={<TextTranslation textName="ClassInfo-Table-DateOfBirth.1" />}
          span={2}
        >
          06/05/2004
        </Descriptions.Item>
        <Descriptions.Item
          label={<TextTranslation textName="ClassInfo-Table-Sex.1" />}
          span={2}
        >
          Nam
        </Descriptions.Item>

        <Descriptions.Item
          label={<TextTranslation textName="ClassInfo-Table-Classes.1" />}
        >
          SE104.XXX
          <br />
          IT001.XXX
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Profile;
