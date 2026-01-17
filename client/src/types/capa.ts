export interface CapaAction {
    id: string;
    deviationId: string;
    type: 'corrective' | 'preventive';
    title: string;
    description: string;
    responsible: string;
    dueDate: string;
    status: 'open' | 'in-progress' | 'completed' | 'verified';
    createdDate: string;
    completedDate?: string;
    effectiveness?: 'effective' | 'partial' | 'ineffective';
}
