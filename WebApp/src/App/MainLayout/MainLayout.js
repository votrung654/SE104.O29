import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout, Menu, Breadcrumb, message } from "antd";
import SConfig from "../../config.json";
import { useHistory } from "react-router-dom";

import "./MainLayout.css";

import { updateClassData } from "../../Redux/index";

import { NavLink } from "react-router-dom";
import MenuStructure from "./MenuStructure";

import { connect } from "react-redux";

import TopBar from "../../Components/TopBar/TopBar";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const MainLayout = (props) => {
  let history = useHistory();

  const [resultMenuStructure, setResultMenuStructure] = useState([]);

  const [
    classes, //setClasses
  ] = useState([]);

  useEffect(() => {
    setResultMenuStructure(renderLAMenuStructure(MenuStructure, false));
  }, [classes]);

  useEffect(() => {
    fetch(
      `${SConfig.SERVER_URL}${SConfig.SERVER_PORT}${SConfig.ClassRoutes.GetAllClass}/${props.yearData.yearid}`
    )
      .then((response) => {
        return response.json();
      })

      .then((classes) => {
        message.success("Loaded class data");
        //setClasses(classes);
        props.updateClassData(classes);

        /*setTimeout(function() {
                    document.body.classList.add("loaded");
                }, 500);*/
      })

      .catch((error) => {});
  }, [props.yearData]);

  const renderLAMenuStructure = (kStruct, isSubMenu, parentMenu) => {
    let kElm = [];

    for (let str of kStruct) {
      if (str.children) {
        kElm.push(renderLAMenuStructure(str.children, true, str));
      } else {
        kElm.push(
          <Menu.Item key={str.key} icon={str.icon}>
            <NavLink to={str.to}>{str.displayName}</NavLink>
          </Menu.Item>
        );
      }
    }
    if (isSubMenu) {
      let classesElm;
      if (parentMenu.key === "classes" && classes) {
        classesElm = classes.map((e) => {
          return (
            <Menu.Item key={e.id}>
              <NavLink to={`/class/${e.name}`}>{e.name}</NavLink>
            </Menu.Item>
          );
        });
      }
      return (
        <SubMenu
          key={parentMenu.key}
          icon={parentMenu.icon}
          title={parentMenu.displayName}
        >
          {kElm}
          {classesElm}
        </SubMenu>
      );
    }
    return kElm;
  };

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const createPathFromIndexOfBreadCrumb = (index) => {
    let path = "/";
    for (let i = 1; i < index + 1; i++) {
      path += history.location.pathname.split("/")[i] + "/";
    }
    return path;
  };

  const breadCrumbItemsMenuTranscript = {
    profile: "Profile",
    schedule: "Schedule",
    inbox: "Inbox",
    sent: "Sent",
    archive: "archive",
    system: "System",
    users: "Users",
    visitation: "Visitation",
    students: "Student Management",
    class: "Classes and Subjects",
    report: "Report",
  };
  const breadCrumbItems = history.location.pathname
    .split("/")
    .map((e, index) => {
      if (e) {
        return (
          <Breadcrumb.Item
            key={`breadCrumb${index}`}
            onClick={() => history.push(createPathFromIndexOfBreadCrumb(index))}
          >
            {breadCrumbItemsMenuTranscript[e] || e}
          </Breadcrumb.Item>
        );
      }
    });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["homepage"]}
          mode="inline"
          style={{
            paddingTop: "64px",
          }}
        >
          {resultMenuStructure}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <TopBar />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item onClick={() => history.push("/")}>
              Homepage
            </Breadcrumb.Item>
            {breadCrumbItems}
          </Breadcrumb>

          <Switch>
            {props.kRoutes}
            <Route>
              <Redirect to={{ pathname: "/" }} />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>T9 Team ©2020 </Footer>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    classData: state.classData,
    yearData: state.yearData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateClassData: (payload) => dispatch(updateClassData(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
