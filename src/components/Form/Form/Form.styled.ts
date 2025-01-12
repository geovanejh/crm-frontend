import styled from "styled-components";

export const StyledForm = styled.form`
  width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 14px;

  h3 {
    font-size: 16px;
    font-weight: 500;
    > a {
      font-weight: 700;
      color: #775da6;
      margin-left: 4px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  > a {
    color: #775da6;
    font-size: 12px;
    margin-bottom: 12px;
    width: fit-content;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FormContainer = styled.div`
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

    button {
      padding: 14px 16px;
    }
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 14px;
`;
