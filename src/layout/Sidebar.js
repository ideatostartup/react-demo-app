import React from "react";

import { Divider, Icon } from '../ui';


const defualtStyle = {
  menuList: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: 20,
    alignItems: "center"
  },
  appName: {
    fontFamily: ".AppleSystemUIFont",
    fontSize: "16px",
    color: "#FFFFFF",
    margin: 5
  },
  logout: {
    fontFamily: ".AppleSystemUIFont",
    fontSize: "16px",
    color: "rgba(42,56,66,0.65)",
    cursor: "pointer"
  },
  userName: {
    fontFamily: ".SFNSDisplay",
    fontSize: "20px",
    color: "#FFFFFF",
    margin: 5
  },
}

const Sidebar = ({ logout, style, user }) =>  {
  return (
    <div style={style}>
      <div style={defualtStyle.menuList}>
        <Icon src="images/icon.png" />
        <span style={defualtStyle.appName}>The Idea Pool</span>
        {user ? 
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Divider style={{margin: 30}} />
            <Icon 
              src={user.avatar_url} 
              style={{
                borderRadius: '50%',
                height: 64,
                width: 64
              }}  
            />
            <span style={defualtStyle.userName}>{user.name}</span>
            <span style={defualtStyle.logout} onClick={logout}>
              Log out
            </span>  
          </div>        
        : null}
      </div>
    </div>
  );
}


export default Sidebar;