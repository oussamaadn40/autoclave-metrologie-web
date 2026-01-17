export interface AutoclaveCycle {
  id: string;
  name: string;
  date: string;
  status: 'running' | 'completed' | 'failed' | 'pending';
  phases: CyclePhase[];
  duration: number; // in minutes
  temperature: {
    target: number;
    actual: number;
    unit: '°C' | '°F';
  };
  pressure: {
    target: number;
    actual: number;
    unit: 'bar' | 'psi';
  };
}

export interface CyclePhase {
  name: 'vacuum' | 'heating' | 'sterilization' | 'drying' | 'cooling';
  label: string;
  startTime: string;
  endTime?: string;
  duration: number; // in minutes
  status: 'completed' | 'active' | 'pending' | 'failed';
}

export interface Measurement {
  id: string;
  timestamp: string;
  temperature: number;
  pressure: number;
  cycleId: string;
}

export interface ValidationTest {
  id: string;
  testDate: string;
  testType: 'routine' | 'periodic' | 'qualification';
  operatorName: string;
  autoclaveName: string;
  autoclaveModel: string;
  serialNumber: string;
  status: 'passed' | 'failed' | 'in-progress';
  cycles: AutoclaveCycle[];
  deviations: Deviation[];
  conclusions: string;
  nextTestDate: string;
}

export interface Deviation {
  id: string;
  parameter: 'temperature' | 'pressure' | 'time' | 'other';
  expected: number;
  actual: number;
  difference: number;
  severity: 'minor' | 'major' | 'critical';
  timestamp: string;
}

export interface DashboardStats {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  activeTests: number;
  lastTestDate: string;
  nextTestDate: string;
  complianceRate: number;
}
