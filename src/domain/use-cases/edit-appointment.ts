import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";
import { DateAlreadyBookedError } from "./errors/date-already-booked-error";

type EditAppointmentRequest = {
  id: string;
  service?: string;
  client?: string;
  employee?: string;
  date?: Date;
};

type EditAppointmentResponse = {
  appointment: Appointment;
};

export class AppointmentNotFoundError extends Error {}

export class EditAppointmentUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  execute(request: EditAppointmentRequest): EditAppointmentResponse {
    const appointments = this.appointmentsRepository.findMany();
    const appointment = appointments.find((a) => a.id === request.id);

    if (!appointment) {
      throw new AppointmentNotFoundError();
    }

    const newDate = request.date ?? appointment.date;
    const newEmployee = request.employee ?? appointment.employee;

    
    const conflict = appointments.find(
      (a) => a.id !== appointment.id && a.employee === newEmployee && a.date.getTime() === newDate.getTime()
    );

    if (conflict) {
      throw new DateAlreadyBookedError();
    }

    appointment.service = request.service ?? appointment.service;
    appointment.client = request.client ?? appointment.client;
    appointment.employee = newEmployee;
    appointment.date = newDate;

    return { appointment };
  }
}
