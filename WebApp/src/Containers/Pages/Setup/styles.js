import styled from "styled-components";
import bgImage from "../../../Assets/img/bg.png"

const SetupPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10vh;
  height: 100vh;
  background-image: url("${bgImage}");
  background-size: cover;
  
  .setup-container {
      width: 850px;
      height: 460px;   
      display: flex;   
      border-radius: 16px;
      box-shadow: 2px 2px 10px #3d457a;
      background: none;
      
      .left-side {
        background: #677EBE;
        min-width: 230px;
        border-radius: 16px 0 0 16px;
        padding: 0px 15px;
        display: flex;
        flex-flow: column;
        position: relative;
        
        .header {
          height: 75px;
          min-height: 75px;
        }
        
        .content {
          height: 100%;
          color: white;
          z-index: 10;
          display: flex;
          justify-content: center;
          padding-left: 10px;
          
          .ant-steps-item-description {
            color: rgba(255, 255, 255, 0.65);
          }
          
          .ant-steps-item-title {          
            color: rgba(255, 255, 255, 0.85);
          }
          
          .ant-steps-item-process {
            .ant-steps-item-description {
              color: rgba(255, 255, 255, 0.85);            
            }
            
            .ant-steps-item-title {
              color: rgba(255, 255, 255, 1);            
            }
            
            .ant-steps-item-icon {
              background: #5BDEC6;
              border-color: #5BDEC6;            
            }
          }
          
          .ant-steps-item-finish {
            .ant-steps-item-icon {
              border-color: #5BDEC6;          
            }
            
            .ant-steps-icon {
              color: #5abfa7;
            }
            
            .ant-steps-item-tail {
              &::after {
                background: #5BDEC6;
              }
            }
          }
        }
        
        .footer {
          display: flex;
          justify-content: center;
          color: #cadbde;
        }   
          
        .particle {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          
          canvas {
            border-radius: 16px 0 0 16px;
          }
        }
      }
      
      .right-side {
        display: flex;
        flex-flow: column;
        width: 100%;
        height: 100%;
        padding: 5px 5px 5px 10px;
        background: #fff;
        border-radius: 0 16px 16px 0;
        
        .title {
          margin-bottom: 0;
          width: 100%;
          border-bottom: 1px solid #bababa;
          color: #677FBD;
        }
      }
  }
`;

export default SetupPageWrapper;

export const StepWrapper = styled.div`  
  width: 100%;
  height: 100%;
  padding-top: 5px;
  overflow: hidden auto;
`;