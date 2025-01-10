import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f5f5f5;

  > img {
    width: 30vw;
    height: 100vh;
    object-fit: cover;
  }

  > div {
    width: 100%;
    display: flex;
    justify-content: center;

    > form {
      width: 480px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      gap: 16px;

      > h1 {
        align-self: left;
      }
    }
  }
`;
