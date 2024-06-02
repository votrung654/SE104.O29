import styled from "styled-components";

const DatabaseWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  padding-right: 5px;
  padding-bottom: 5px;
  
  .page-container {  
    height: 100%;
    display: flex;
    flex-flow: column;
    overflow: hidden auto;
    
    .st-form {
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      align-items: flex-start;
      height: 100%;
      margin-top: 5px;
      
      .db-selector {
        width: 170px;
      }
      
      th {
        padding: 3px 0px 3px 15px;
        text-align: left;
      }
      
      .st-label {
        min-width: 120px;
        font-weight: 500;
      }
      
      .st-input {
        max-width: 200px;
      }
       
      .st-description {
        font-weight: normal;
        font-size: 12px;
      }
    }
  }
  
  .st-controller {
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding-right: 20px;
  }
`;

export default DatabaseWrapper;