import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../appointments-repository";

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public appointments: Appointment[] = [];

  create(appointment: Appointment): void {
    this.appointments.push(appointment);
  }

  findMany(): Appointment[] {
    return this.appointments;
  }
}
