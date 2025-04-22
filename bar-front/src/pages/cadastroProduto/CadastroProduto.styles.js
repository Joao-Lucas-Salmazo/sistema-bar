import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 20px;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

export const FormContainer = styled.div`
  background-color: #fcfcfc;
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 25px;
  text-align: center;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
  }

  input[type="text"],
  input[type="number"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1em;
  }

  .error-message {
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
  }
`;

export const SubmitButton = styled.button`
  background-color: #5cb85c;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: #4cae4c;
  }
`;

export const CancelButton = styled.button`
  background-color: #f0f0f0;
  color: #333;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  font-weight: bold;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
`;
