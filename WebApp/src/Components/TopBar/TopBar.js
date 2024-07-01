import React from "react";
import "./TopBar.css";
import { useHistory } from "react-router-dom";
import { Avatar, Badge, Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import TextTranslation from "../TextTranslation/TextTranslation";
 
const TopBar = () => {
  let history = useHistory();
 
  const logout = () => {
    localStorage.removeItem("userData");
    window.location.reload();
  };
 
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div
          onClick={() => {
            history.push("/profile");
          }}
        >
          Trang cá nhân
        </div>
      </Menu.Item>
      <Menu.Item key="1">
        <div
          onClick={() => {
            history.push("/system");
          }}
        >
          Cài đặt
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={logout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
 
  return (
    <div id="topbar-wrapper">
      <Dropdown overlay={menu} trigger={["click"]}>
        <span className="avatar-item" id="topbar-avatar">
          <Badge count={1}>
            <Avatar shape="circle" icon={<UserOutlined />} />
          </Badge>
        </span>
      </Dropdown>
    </div>
  );
};
 
export default TopBar;