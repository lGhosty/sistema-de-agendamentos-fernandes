import { beforeEach, expect, test, describe } from "vitest";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { CreateAppointmentUseCase } from "./create-appointment";
import { PastDateSchedulingError } from "./errors/past-date-scheduling-error";
import { DateAlreadyBookedError } from "./errors/date-already-booked-error";

describe("CreateAppointmentUseCase", () => {
  let inMemoryAppointmentsRepository: InMemoryAppointmentsRepository;
  let createAppointentUseCase: CreateAppointmentUseCase;

  beforeEach(() => {
    inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository();
    createAppointentUseCase = new CreateAppointmentUseCase(inMemoryAppointmentsRepository);
  });

  test("Deve ser possível realizar um agendamento", () => {
    const result = createAppointentUseCase.execute({
      client: "Augusto César",
      date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24), 
      employee: "Maria José",
      service: "Corte de Cabelo",
    });

    expect(result.appointment).toBeDefined();
    expect(result.appointment.id).toBeTruthy();
  });

  test("Não deve ser possível agendar em data passada", () => {
    expect(() =>
      createAppointentUseCase.execute({
        client: "Augusto César",
        date: new Date(2020, 7, 20),
        employee: "Maria José",
        service: "Corte de Cabelo",
      })
    ).toThrow(PastDateSchedulingError);
  });

  test("Não deve ser possível criar um agendamento em uma data já ocupada", () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);

    createAppointentUseCase.execute({
      client: "Cliente 1",
      date,
      employee: "Func A",
      service: "Serv",
    });

    expect(() =>
      createAppointentUseCase.execute({
        client: "Cliente 2",
        date,
        employee: "Func A",
        service: "Serv 2",
      })
    ).toThrow(DateAlreadyBookedError);

    const res = createAppointentUseCase.execute({
      client: "Cliente 3",
      date,
      employee: "Func B",
      service: "Serv 3",
    });
    expect(res.appointment).toBeDefined();
  });
});
