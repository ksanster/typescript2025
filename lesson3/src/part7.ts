// #### Пересечение типов
{
    type Employee = {
        id: number;
        department: string;
    }

    type Manager = {
        teamSize: number;
        role: string;
    }

    type TeamLead = Employee & Manager;

    const lead: TeamLead = {
        id: 42,
        department: 'minigames',
        teamSize: 10,
        role: 'lazy bird'
    }
}
