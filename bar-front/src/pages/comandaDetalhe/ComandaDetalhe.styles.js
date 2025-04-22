import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
  padding: 20px;
  font-family: sans-serif;
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

export const InfoParagraph = styled.p`
  margin-bottom: 10px;
  color: #555;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
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

export const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ItemRow = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column; /* Empilhar informações em telas menores */
  align-items: flex-start;

  > * {
    margin-right: 0;
    margin-bottom: 8px;
  }

  @media (min-width: 768px) {
    flex-direction: row; /* Voltar ao layout de linha em telas maiores */
    justify-content: space-between;
    align-items: center;

    > * {
      margin-right: 10px;
      margin-bottom: 0;

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export const ItemName = styled.span`
  flex-grow: 1;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  width: 100%; /* Ocupar a largura total em telas menores */
  justify-content: space-around; /* Distribuir os botões */

  button {
    padding: 8px 12px;
    margin: 0;
    border: 1px solid #ccc;
    border-radius: 3px;
    cursor: pointer;
    background-color: #eee;
    transition: background-color 0.3s ease;
  }

  span {
    margin: 0 10px;
  }

  @media (min-width: 768px) {
    width: auto;
    justify-content: flex-start;

    button {
      margin: 0 5px;
    }
  }
`;

export const TotalParagraph = styled.p`
  margin-top: 20px;
  font-size: 1.2em;
  color: #333;
  text-align: center;

  strong {
    font-weight: bold;
  }

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const StatusParagraph = styled.p`
  color: #777;
  margin-bottom: 5px;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const DateParagraph = styled.p`
  color: #999;
  font-size: 0.9em;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const ActionButtons = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column; /* Empilhar botões em telas menores */
  gap: 10px;
  align-items: stretch; /* Fazer os botões ocuparem a largura total */

  button {
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-weight: bold;
  }

  button:first-child {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ccc;

    &:hover {
      background-color: #e0e0e0;
    }
  }

  button:last-child {
    background-color: #d9534f;
    color: white;
    border: none;

    &:hover {
      background-color: #c9302c;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row; /* Voltar ao layout de linha em telas maiores */
    gap: 10px;
    align-items: center;
    justify-content: flex-start;

    button {
      flex-grow: 1; /* Fazer os botões crescerem igualmente */
    }

    button:first-child {
      flex-grow: 0; /* Não fazer o botão de voltar crescer */
    }
  }
`;

export const AddItemForm = styled.form`
  margin-top: 30px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fcfcfc;
  display: grid;
  grid-template-columns: 1fr; /* Uma coluna em telas menores */
  gap: 10px;
  align-items: center;

  label {
    font-weight: bold;
  }

  select,
  input[type="number"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 100%; /* Ocupar a largura total em telas menores */
  }

  button[type="button"] {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  @media (min-width: 768px) {
    grid-template-columns: auto auto;
    select,
    input[type="number"] {
      width: auto; /* Voltar ao tamanho automático em telas maiores */
    }
  }
`;
