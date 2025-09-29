import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { CreateAppointmentUseCase } from "./create-appointment";
import { ListEmployeeDayAppointmentsUseCase } from "./list-employee-day-appointments";

describe("ListEmployeeDayAppointmentsUseCase", () => {
  let inMemoryAppointmentsRepository: InMemoryAppointmentsRepository;
  let createAppointentUseCase: CreateAppointmentUseCase;
  let listUseCase: ListEmployeeDayAppointmentsUseCase;

  beforeEach(() => {
    inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository();
    createAppointentUseCase = new CreateAppointmentUseCase(inMemoryAppointmentsRepository);
    listUseCase = new ListEmployeeDayAppointmentsUseCase(inMemoryAppointmentsRepository);
  });

  test("A lista deve conter apenas agendamentos do funcionário solicitado", () => {
    const date = new Date();
    date.setDate(date.getDate() + 10);
    const sameDay = new Date(date.getTime());

    createAppointentUseCase.execute({ client: "C1", date, employee: "EmpA", service: "S" });
    createAppointentUseCase.execute({ client: "C2", date: sameDay, employee: "EmpB", service: "S" });

    const results = listUseCase.execute({
      employee: "EmpA",
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    });

    expect(results.length).toBe(1);
    expect(results[0].employee).toBe("EmpA");
  });

  test("A lista deve conter apenas agendamentos do dia solicitado", () => {
    const date = new Date();
    date.setDate(date.getDate() + 12);
    const otherDay = new Date(date.getTime());
    otherDay.setDate(otherDay.getDate() + 1);

    createAppointentUseCase.execute({ client: "C1", date, employee: "EmpA", service: "S" });
    createAppointentUseCase.execute({ client: "C2", date: otherDay, employee: "EmpA", service: "S" });

    const results = listUseCase.execute({
      employee: "EmpA",
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    });

    expect(results.length).toBe(1);
    expect(results[0].date.getDate()).toBe(date.getDate());
  });
});
