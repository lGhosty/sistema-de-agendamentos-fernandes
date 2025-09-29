import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { EditAppointmentUseCase, AppointmentNotFoundError } from "./edit-appointment";
import { CreateAppointmentUseCase } from "./create-appointment";
import { DateAlreadyBookedError } from "./errors/date-already-booked-error";

describe("EditAppointmentUseCase", () => {
  let inMemoryAppointmentsRepository: InMemoryAppointmentsRepository;
  let createAppointentUseCase: CreateAppointmentUseCase;
  let editAppointmentUseCase: EditAppointmentUseCase;

  beforeEach(() => {
    inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository();
    createAppointentUseCase = new CreateAppointmentUseCase(inMemoryAppointmentsRepository);
    editAppointmentUseCase = new EditAppointmentUseCase(inMemoryAppointmentsRepository);
  });

  test("Não deve ser possível atualizar um agendamento inexistente", () => {
    expect(() =>
      editAppointmentUseCase.execute({
        id: "non-existent-id",
        client: "Novo",
      })
    ).toThrow(AppointmentNotFoundError);
  });

  test("Não deve ser possível atualizar para uma data já ocupada", () => {
    const date1 = new Date();
    date1.setDate(date1.getDate() + 5);
    const date2 = new Date();
    date2.setDate(date2.getDate() + 6);

    const a1 = createAppointentUseCase.execute({
      client: "C1",
      date: date1,
      employee: "Emp",
      service: "S1",
    }).appointment;

    const a2 = createAppointentUseCase.execute({
      client: "C2",
      date: date2,
      employee: "Emp",
      service: "S2",
    }).appointment;

    expect(() =>
      editAppointmentUseCase.execute({
        id: a2.id,
        date: date1,
        employee: "Emp"
      })
    ).toThrow(DateAlreadyBookedError);
  });
});
