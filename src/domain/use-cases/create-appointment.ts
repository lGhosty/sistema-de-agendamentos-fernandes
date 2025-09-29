import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";
import { DateAlreadyBookedError } from "./errors/date-already-booked-error";
import { PastDateSchedulingError } from "./errors/past-date-scheduling-error";

type CreateAppointmentUseCaseRequest = {
  service: string;
  client: string;
  employee: string;
  date: Date;
};

type CreateAppointmentUseCaseResponse = {
  appointment: Appointment;
};

export class CreateAppointmentUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  execute(request: CreateAppointmentUseCaseRequest): CreateAppointmentUseCaseResponse {
    const now = new Date();
    if (request.date.getTime() <= now.getTime()) {
      throw new PastDateSchedulingError();
    }

    const appointments = this.appointmentsRepository.findMany();
    const occupied = appointments.find((a) => a.date.getTime() === request.date.getTime() && a.employee === request.employee);

    if (occupied) {
      throw new DateAlreadyBookedError();
    }

    const id = String(Date.now()) + String(Math.floor(Math.random()*10000));
    const appointment = new Appointment(id, request.service, request.client, request.employee, request.date);

    this.appointmentsRepository.create(appointment);

    return { appointment };
  }
}
