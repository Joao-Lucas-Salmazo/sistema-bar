import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 20px;
  font-family: sans-serif;
  display: grid;
  justify-content: center;
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.form`
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 100%; /* Ocupar a largura total em telas menores */

  @media (min-width: 768px) {
    max-width: 500px; /* Voltar ao tamanho máximo em telas maiores */
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
  }

  input[type="text"],
  input[type="number"],
  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1em;
    width: 100%; /* Ocupar a largura total em telas menores */

    @media (min-width: 768px) {
      width: auto; /* Voltar ao tamanho automático em telas maiores */
    }
  }
`;

export const ItemsSectionTitle = styled.h3`
  color: #333;
  margin-top: 25px;
  margin-bottom: 15px;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const ItemRow = styled.div`
  display: flex;
  flex-direction: column; /* Empilhar os itens em telas menores */
  gap: 10px;
  margin-bottom: 10px;

  label {
    font-weight: normal;
  }

  select,
  input[type="number"] {
    padding: 8px;
    width: 100%; /* Ocupar a largura total disponível */
    box-sizing: border-box; /* Garante que padding e border não aumentem a largura total */
  }

  button {
    padding: 8px 12px;
    border: 1px solid #d9534f;
    border-radius: 3px;
    background-color: #f0ad4e; /* Cor de aviso para remover */
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #d43f3a;
      border-color: #d43f3a;
    }

    @media (min-width: 768px) {
      width: auto;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row; /* Voltar ao layout de linha em telas maiores */
    align-items: center;
    justify-content: space-between;

    select {
      flex-grow: 2; /* Dar mais espaço para o select do produto */
      margin-right: 10px;
    }

    input[type="number"] {
      width: 80px; /* Definir uma largura fixa para o input de quantidade em telas maiores */
    }
  }
`;

export const AddItemButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
  margin-top: 10px;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }

  @media (min-width: 768px) {
    width: auto;
    text-align: left;
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
  margin-top: 20px;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #4cae4c;
  }

  @media (min-width: 768px) {
    width: auto;
    text-align: left;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;
