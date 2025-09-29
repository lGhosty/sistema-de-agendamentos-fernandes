import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";

type ListRequest = {
  employee: string;
  day: number;
  month: number;
  year: number;
};

export class ListEmployeeDayAppointmentsUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  execute(request: ListRequest): Appointment[] {
    const appointments = this.appointmentsRepository.findMany();

    return appointments.filter((a) => {
      const d = a.date;
      return (
        a.employee === request.employee &&
        d.getDate() === request.day &&
        d.getMonth() === request.month &&
        d.getFullYear() === request.year
      );
    });
  }
}
