# Atividade – Testes de Unidade

Este repositório contém a resolução da atividade de **Verificação e Validação de Sistemas** (15/09/2025).

## Questões Resolvidas

- **Questão 01:** Adicionado teste de unidade no caso de uso `create-appointment` para impedir agendamento em data já ocupada.  
- **Questão 02:** Refatoração de `create-appointment.spec.ts` com `beforeEach` para reaproveitamento de código.  
- **Questão 03:** Implementado `edit-appointment.ts` e `update-appointment.spec.ts` cobrindo os cenários de:
  - não atualizar agendamento inexistente  
  - não atualizar para data já ocupada  
- **Questão 04:** Implementado `list-employee-day-appointments.ts` e seus testes cobrindo:
  - listar apenas agendamentos do funcionário solicitado  
  - listar apenas agendamentos do dia solicitado  
- **Questão 05:** Cobertura de testes acima de 98% (ver pasta `coverage/`).  
- **Questão 06:** Elaborado resumo de princípios de testes e code smells no arquivo [`resumo-testes.md`](./resumo-testes.md).

## Como rodar os testes

```bash
# Instalar dependências
npm install

# Rodar os testes
npm run test

# Rodar com relatório de cobertura
npm run test -- --coverage
